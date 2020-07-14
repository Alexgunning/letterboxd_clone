import * as Layout from '../../lib/layout';
interface BuildSettings {
    target?: string;
    output?: string;
    stage?: string;
    entrypoint?: string;
    asBundle: boolean;
    cwd?: string;
}
export declare function buildNexusApp(settings: BuildSettings): Promise<void>;
/**
 * Output to disk in the build the start module that will be used to boot the
 * nexus app.
 */
export declare function writeStartModule({ startModule, layout, }: {
    startModule: string;
    layout: Layout.Layout;
}): Promise<void>;
export {};
//# sourceMappingURL=build.d.ts.map