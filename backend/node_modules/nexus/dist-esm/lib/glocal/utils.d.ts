/**
 * Handoff execution from a global to local version of a package.
 *
 * If the given global module path is not a real node package (defined as being
 * unable to locate its package.json file) then an error will be thrown.
 */
export declare function globalToLocalModule(input: {
    localPackageDir: string;
    globalPackageFilename: string;
}): void;
//# sourceMappingURL=utils.d.ts.map