/// <reference types="node" />
import { Plugin } from '../plugin';
declare type Entry = {
    source: string | Buffer;
    mode?: number;
} | null;
interface BundleOptions {
    /**
     * Base path against which relative paths should be computed.
     * Should usually be `layout.projectRoot`.
     */
    base: string;
    /**
     * Absolute path of the output bundle directory.
     */
    bundleOutputDir: string;
    /**
     * Absolute path to the transpiled Javascript entrypoint.
     */
    entrypoint: string;
    /**
     * Absolute path of the output typescript directory.
     */
    tsOutputDir: string;
    /**
     * Absolute path of the tsconfig.json rootDir property.
     */
    tsRootDir: string;
    /**
     * List of Nexus plugins.
     */
    plugins: Plugin[];
}
/**
 * Bundle the transpiled output of Typescript into a treeshaked output.
 * The treeshake is done at the module level, not function level.
 * A new node_modules folder will be outputted in `bundleOutputDir` containing only the required packages
 * for the runtime to work.
 */
export declare function bundle(opts: BundleOptions): Promise<void>;
export declare function traceFiles(opts: Pick<BundleOptions, 'base' | 'plugins' | 'entrypoint'>): Promise<{
    files: Map<string, Entry>;
    reasons: import("@zeit/node-file-trace").NodeFileTraceReasons;
}>;
export {};
//# sourceMappingURL=bundle.d.ts.map