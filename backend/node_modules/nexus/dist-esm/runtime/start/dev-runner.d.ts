import * as Layout from '../../lib/layout';
import type { PrivateApp } from '../app';
import { StartModuleOptions } from './start-module';
export interface DevRunner {
    /**
     * Start the application. Will throw an error if the eval'd code throws
     */
    start: () => Promise<void>;
    /**
     * Stop the application
     */
    stop: () => Promise<void>;
    /**
     * Port on which the application was run
     */
    port: number;
}
export declare function createDevAppRunner(layout: Layout.Layout, appSingleton: PrivateApp, opts?: {
    catchUnhandledErrors?: StartModuleOptions['catchUnhandledErrors'];
}): DevRunner;
//# sourceMappingURL=dev-runner.d.ts.map