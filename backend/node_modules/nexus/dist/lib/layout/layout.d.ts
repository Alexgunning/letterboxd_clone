import { Either } from 'fp-ts/lib/Either';
import type { ParsedCommandLine } from 'typescript';
import * as PJ from '../package-json';
import * as PackageManager from '../package-manager';
import { BuildLayout } from './build';
/**
 * The part of layout data resulting from the dynamic file/folder inspection.
 */
export declare type ScanResult = {
    app: {
        exists: true;
        path: string;
    } | {
        exists: false;
        path: null;
    };
    project: {
        name: string;
        isAnonymous: boolean;
    };
    sourceRoot: string;
    projectRoot: string;
    nexusModules: string[];
    tsConfig: {
        content: ParsedCommandLine;
        path: string;
    };
    packageManagerType: PackageManager.PackageManager['type'];
};
/**
 * The combination of manual datums the user can specify about the layout plus
 * the dynamic scan results.
 */
export declare type Data = ScanResult & {
    build: BuildLayout;
    packageJson: null | {
        dir: string;
        path: string;
        content: PJ.ValidPackageJson;
    };
};
/**
 * Layout represents the important edges of the project to support things like
 * scaffolding, build, and dev against the correct paths.
 */
export declare type Layout = Data & {
    /**
     * Property that aliases all the and only the data properties, makes it
     * easy to e.g. serialize just the data.
     */
    data: Data;
    projectRelative(filePath: string): string;
    projectPath(...subPaths: string[]): string;
    /**
     * Like projectPath but treats absolute paths as passthrough.
     */
    projectPathOrAbsolute(...subPaths: string[]): string;
    sourceRelative(filePath: string): string;
    sourcePath(...subPaths: string[]): string;
    update(options: UpdateableLayoutData): void;
    packageManager: PackageManager.PackageManager;
};
interface UpdateableLayoutData {
    nexusModules?: string[];
}
interface Options {
    /**
     * The place to output the build, relative to project root.
     */
    buildOutputDir?: string;
    /**
     * Path to the nexus entrypoint. Can be absolute or relative.
     */
    entrypointPath?: string;
    /**
     * Force the project root directory. Defaults to being detected automatically.
     */
    projectRoot?: string;
    /**
     * Whether the build should be outputted as a bundle
     */
    asBundle?: boolean;
    /**
     * Force the current working directory.
     *
     * @default
     *
     * process.cwd()
     *
     * @remarks
     *
     * Interplay between this and projectRoot option: When the projectRoot is not forced then the cwd is utilized for various logic.
     */
    cwd?: string;
}
/**
 * Perform a layout scan and return results with attached helper functions.
 */
export declare function create(options?: Options): Promise<Either<Error, Layout>>;
/**
 * Create a layout instance with given layout data. Useful for taking in serialized scan
 * data from another process that would be wasteful to re-calculate.
 */
export declare function createFromData(layoutData: Data): Layout;
/**
 * Find the (optional) app module in the user's project.
 */
export declare function findAppModule(opts: {
    projectRoot: string;
}): string | null;
/**
 * Detect whether or not CWD is inside a nexus project. nexus project is
 * defined as there being a package.json in or above CWD with nexus as a
 * direct dependency.
 */
export declare function scanProjectType(opts: {
    cwd: string;
}): Promise<{
    type: 'unknown' | 'new';
} | {
    type: 'malformed_package_json';
    error: PJ.MalformedPackageJsonError;
} | {
    type: 'NEXUS_project' | 'node_project';
    packageJson: {};
    packageJsonLocation: {
        path: string;
        dir: string;
    };
}>;
/**
 * Find the modules in the project that import nexus
 */
export declare function findNexusModules(tsConfig: Data['tsConfig'], maybeAppModule: string | null): string[];
export {};
//# sourceMappingURL=layout.d.ts.map