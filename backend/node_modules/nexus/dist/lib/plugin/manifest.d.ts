import { Either } from 'fp-ts/lib/Either';
import { Manifest, Plugin } from './types';
declare const getManifestException: (ctx: {
    plugin: Plugin;
    reason: string;
    name?: string | undefined;
}) => import("../utils").BaseException<"get_manifest_error", {
    plugin: Plugin;
    reason: string;
    name?: string | undefined;
}>;
export declare type GetManifestError = ReturnType<typeof getManifestException>;
/**
 * Process manifest input into a manifest.
 *
 * @remarks
 *
 * The manifest input is what the plugin author provides. This supplies
 * defaults and fulfills properties to produce normalized manifest data.
 */
export declare function getPluginManifest(plugin: Plugin): Either<GetManifestError, Manifest>;
/**
 * Display erorrs then exit the program.
 */
export declare function showManifestErrorsAndExit(errors: GetManifestError[]): never;
/**
 * Process the given manifest inputs into manifests
 */
export declare function getPluginManifests(plugins: Plugin[]): {
    data: Manifest[];
    errors: import("../utils").BaseException<"get_manifest_error", {
        plugin: Plugin<any>;
        reason: string;
        name?: string | undefined;
    }>[] | null;
};
export {};
//# sourceMappingURL=manifest.d.ts.map