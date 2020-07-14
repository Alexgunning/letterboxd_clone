/**
 * These testing utilities live here so that `nexus-plugin-prisma` can reuse them
 */
import { IPtyForkOptions } from 'node-pty';
import { ConnectableObservable } from 'rxjs';
import { Database } from '../cli/commands/create/app';
import { GraphQLClient } from '../lib/graphql-client';
import { getTmpDir } from './fs';
import { PackageManagerType } from './package-manager';
interface CreateAppOptions {
    /**
     * Sets the NEXUS_PLUGIN_PRISMA_VERSION envar.
     *
     * Only useful if _not_ using NO_DATABASE for `databaseType`.
     *
     * @defualt 'latest'
     */
    prismaPluginVersion?: string;
    packageManagerType: PackageManagerType;
    databaseType: Database | 'NO_DATABASE';
}
interface CreatePluginOptions {
    name: string;
}
export declare type E2EContext = ReturnType<typeof createE2EContext>;
interface Config {
    dir?: string;
    /**
     * The port that the server will listen on and tht graphql client will make
     * requests at.
     */
    serverPort?: number;
    /**
     * The absolute path to a source checkout of Nexus. The Nexus checkout should
     * be built as well.
     *
     * If this is present then the e2e test can run it for app creation instead
     * of npx. Also the created plugin later in the test can be made to use this
     * Nexus instead of the pubished one.
     */
    localNexus: null | {
        path: string;
        createAppWithThis: boolean;
        createPluginWithThis: boolean;
        pluginLinksToThis: boolean;
    };
}
export declare function createE2EContext(config: Config): {
    usingLocalNexus: {
        path: string;
        createAppWithThis: boolean;
        createPluginWithThis: boolean;
        pluginLinksToThis: boolean;
    } | null;
    /**
     * Ignore this if usingLocalNexus is set.
     */
    useNexusVersion: string;
    dir: string;
    config: Config;
    getTmpDir: typeof getTmpDir;
    fs: import("fs-jetpack/types").FSJetpack;
    client: GraphQLClient;
    node(args: string[], opts?: IPtyForkOptions): ConnectableObservable<string>;
    spawn(binPathAndArgs: string[], opts?: IPtyForkOptions): ConnectableObservable<string>;
    nexus(args: string[], opts?: IPtyForkOptions): ConnectableObservable<string>;
    npxNexus(options: {
        nexusVersion: string;
    }, args: string[]): ConnectableObservable<string>;
    npxNexusCreatePlugin(options: CreatePluginOptions & {
        nexusVersion: string;
    }): ConnectableObservable<string>;
    npxNexusCreateApp(options: CreateAppOptions & {
        nexusVersion: string;
    }): ConnectableObservable<string>;
    localNexus: ((args: string[]) => ConnectableObservable<string>) | null;
    localNexusCreateApp: ((options: CreateAppOptions) => ConnectableObservable<string>) | null;
    localNexusCreatePlugin: ((options: CreatePluginOptions) => ConnectableObservable<string>) | null;
};
export declare function spawn(command: string, args: string[], opts: IPtyForkOptions): ConnectableObservable<string>;
export {};
//# sourceMappingURL=e2e-testing.d.ts.map