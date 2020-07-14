import { ModuleRequiredMessage } from './ipc';
interface ChangeableOptions {
    environmentAdditions?: Record<string, string>;
    entrypointScript?: string;
}
interface Options extends ChangeableOptions {
    entrypointScript: string;
    onRunnerImportedModule?: (data: ModuleRequiredMessage['data']) => void;
    onServerListening?: () => Promise<void>;
    onRunnerStdioMessage?: (e: {
        stdio: 'stdout' | 'stderr';
        data: string;
    }) => void;
    /**
     * Host and/or port on which the debugger should listen to
     */
    inspectBrk?: string;
}
export declare class Link {
    private options;
    private ttyLinker;
    private state;
    private stoppedResult;
    private childProcess;
    constructor(options: Options);
    updateOptions(options: ChangeableOptions): void;
    startOrRestart(): Promise<void>;
    stop(): Promise<void>;
    private kill;
    private teardownChildProcess;
    private spawnRunner;
}
export {};
//# sourceMappingURL=link.d.ts.map