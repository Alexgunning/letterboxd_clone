import * as nodecp from 'child_process';
declare const TTY_LINKER_ENABLED_ENV_VAR = "TTY_LINKER_ENABLED";
export declare type TTYLinker = ReturnType<typeof create>;
interface ChildInstallOptions {
    /**
     * By default install only does anything if `process.env.TTY_LINKER_ENABLED` is truthy.
     * Use this to always install.
     */
    force: boolean;
}
export declare function create(): {
    parent: {
        serialize(): {
            TTY_COLUMNS: string;
            TTY_ROWS: string;
            TTY_LINKER_ENABLED: string;
        };
        forward(cp: nodecp.ChildProcess): void;
        unforward(uncp: nodecp.ChildProcess): void;
    };
    child: {
        install(opts?: ChildInstallOptions): void;
    };
};
export {};
//# sourceMappingURL=tty-linker.d.ts.map