import * as proc from './process';
import { OmitFirstArg } from './utils';
export declare type PackageManagerType = 'yarn' | 'npm';
/**
 * Detect if the project is yarn or npm based. Detection is based on useragent,
 * if present, then the lockfile present. If nothing is found, npm is assumed.
 */
export declare function detectProjectPackageManager(opts: {
    projectRoot: string;
}): Promise<PackageManagerType>;
/**
 * Render the running of the given command as coming from the local bin.
 */
export declare function renderRunBin(pmt: PackageManagerType, commandString: string): string;
/**
 * Render running of the given script defined in package.json.
 */
export declare function renderRunScript(pmt: PackageManagerType, scriptName: string): string;
/**
 * Run a command from the local project bin.
 */
export declare function runBin(pmt: PackageManagerType, commandString: string, options?: proc.RunOptions): ReturnType<typeof proc.run>;
/**
 * Run a script defined in the local project package.json.
 */
export declare function runScript(pmt: PackageManagerType, scriptName: string, options?: proc.RunOptions): ReturnType<typeof proc.run>;
/**
 * Run package installation.
 */
export declare function installDeps(pmt: PackageManagerType, options?: proc.RunOptions): ReturnType<typeof proc.run>;
export declare type AddDepsOptions = {
    dev?: boolean;
} & proc.RunOptions;
/**
 * Add a package to the project.
 */
export declare function addDeps(pmt: PackageManagerType, packages: string[], options?: AddDepsOptions): ReturnType<typeof proc.run>;
/**
 * Add a package to the project.
 */
export declare function renderAddDeps(pmt: PackageManagerType, packages: string[], options?: {
    dev?: boolean;
}): string;
/**
 * The package manager as a fluent API, all statics partially applied with the
 * package manager type.
 */
export declare type PackageManager = {
    type: PackageManagerType;
    installDeps: OmitFirstArg<typeof installDeps>;
    addDeps: OmitFirstArg<typeof addDeps>;
    runBin: OmitFirstArg<typeof runBin>;
    runScript: OmitFirstArg<typeof runScript>;
    renderRunBin: OmitFirstArg<typeof renderRunBin>;
    renderRunScript: OmitFirstArg<typeof renderRunScript>;
    renderAddDeps: OmitFirstArg<typeof renderAddDeps>;
};
/**
 * Create a fluent package manager module api. This partially applies all
 * statics with the package manager type. Creation is async since it requires
 * running IO to detect the project's package manager.
 */
export declare function createPackageManager<T extends void | PackageManagerType>(packageManagerType: T | void, opts: {
    projectRoot: string;
}): T extends void ? Promise<PackageManager> : PackageManager;
//# sourceMappingURL=package-manager.d.ts.map