/**
 * This module provides a node process exit system wherein any part of the
 * program can reliably hook onto program exit and run some cleanup which will
 * be await upon up to a given grace period.
 */
declare type BeforeExiter = () => Promise<unknown>;
declare global {
    namespace NodeJS {
        interface Process {
            _exitSystem: {
                beforeExiters: BeforeExiter[];
                isExiting: boolean;
                settings: Required<Options>;
            };
            onBeforeExit(cb: BeforeExiter): void;
        }
    }
}
interface Options {
    /**
     * Time limit in milliseconds that registered tearndown functions have to
     * complete their work.
     *
     * @default 2000
     */
    timeLimit?: number;
}
/**
 * Augment the global process object with a `onBeforeExit` registrater function
 * and register exit callbacks on SIGTERM and SIGINT.
 * @param options
 */
export declare function install(options?: Options): void;
/**
 * Begin program exit, calling all regisered before-exit functions before
 * finally doing so. This can only be called once within a process's life.
 * Subsequent calls are a no-op.
 */
export declare function exit(exitCode: number): Promise<void>;
export {};
//# sourceMappingURL=exit-system.d.ts.map