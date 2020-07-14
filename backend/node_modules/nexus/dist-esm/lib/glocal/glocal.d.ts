/**
 * Input for `setup`
 */
declare type SetupInput = {
    /**
     * Actual CLI code you want to run.
     */
    run: () => void;
    /**
     * Name of the tool. Used in error messages.
     */
    toolName: string;
    /**
     * Name of the npm package of the tool.
     */
    depName: string;
    /**
     * The module entrypoint being run and to run locally. It is assumed that the
     * local and global CLIs share the exact same package module layout on disk
     * (perfect case: same versions of the package). glocal will import and thus
     * call the local-cli version of this file.
     *
     * Normally, this is just a matter of the caller passing its `__filename`.
     */
    filename: string;
};
/**
 * Handle relationship between global and local versions of a cli.
 *
 * If the local project does not have the tool on disk then fatal message will
 * be logged and process exited.
 */
export declare function setup({ run, toolName, depName, filename }: SetupInput): void;
export {};
//# sourceMappingURL=glocal.d.ts.map