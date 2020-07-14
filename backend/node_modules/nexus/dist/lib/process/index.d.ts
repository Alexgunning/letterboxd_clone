/// <reference types="node" />
import { SpawnSyncOptions } from 'child_process';
/**
 * Log a meaningful semantic error message sans stack track and then crash
 * the program with exit code 1. Parameters are a passthrough to `console.error`.
 */
export declare function fatal(errOrMsg: string | Error, context?: Record<string, unknown>): never;
export declare type SuccessfulRunResult = {
    command: string;
    stderr: null | string;
    stdout: null | string;
    signal: null | string;
    exitCode: null | number;
    error: null | Error;
};
export declare type RunOptions = Omit<SpawnSyncOptions, 'encoding'> & {
    envAdditions?: Record<string, string | undefined>;
    require?: boolean;
};
export declare function runSync(commandRaw: string, options?: RunOptions): SuccessfulRunResult;
export declare function run(commandRaw: string, options?: RunOptions): Promise<SuccessfulRunResult>;
export declare const createRunner: (cwd: string) => typeof runSync;
export declare function clearConsole(): void;
//# sourceMappingURL=index.d.ts.map