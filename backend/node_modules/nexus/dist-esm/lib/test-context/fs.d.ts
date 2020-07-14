import { FSJetpack } from 'fs-jetpack/types';
export declare type FsDeps = {
    tmpDir: string;
};
export declare type FsContribution = {
    fs: FSJetpack;
    /**
     * Turn given relative path into absolute one.
     *
     * Relative to the curerntly setup tmpDir.
     *
     * Path is normalized to posix meaning e.g. `C:\a\b\c` becomes `C:/a/b/c`.
     */
    path(...relativePath: string[]): string;
};
/**
 * - Creates a temporary directory
 * - Adds `fs` to `context`, an fs-jetpack instance with its cwd set to the tmpdir
 */
export declare const fs: () => (ctx: FsDeps) => FsContribution;
//# sourceMappingURL=fs.d.ts.map