/**
 * This module is for reporting issues about Nexus. It extracts diagnostics
 * about the proejct and environment and can format them for a GitHub issue.
 */
/// <reference types="node" />
import { Either } from 'fp-ts/lib/Either';
import { PackageJson } from 'type-fest';
import { Layout } from './layout';
interface Report {
    node: string;
    os: {
        platform: string;
        release: string;
    };
    nexus?: string;
    plugins?: string[];
    otherDependencies?: PackageJson['dependencies'];
    devDependencies?: PackageJson['devDependencies'];
    hasAppModule?: boolean;
    packageManager?: Layout['packageManagerType'];
    errorsWhileGatheringReport: {
        gettingLayout: null | Error;
        gettingPluginManifests: null | string[];
    };
}
/**
 * Extract diagnostics about the Nexus project.
 */
export declare function getNexusReport(errLayout: Either<Error, Layout>): Promise<Report>;
/**
 * Generic report data about user system, not particular to Nexus.
 */
export declare function getBaseReport(): {
    node: string;
    os: {
        platform: NodeJS.Platform;
        release: string;
    };
};
export {};
//# sourceMappingURL=report.d.ts.map