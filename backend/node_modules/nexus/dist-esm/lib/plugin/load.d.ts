import { Either } from 'fp-ts/lib/Either';
import * as Layout from '../layout';
import * as Scalars from '../scalars';
import { Plugin, TesttimeContributions } from './types';
/**
 * Fully import and load the runtime plugins, if any, amongst the given plugins.
 */
export declare function importAndLoadRuntimePlugins(plugins: Plugin[], scalars: Scalars.Scalars): import("./types").RuntimeContributions<any>[];
/**
 * Fully import and load the worktime plugins, if any, amongst the given plugins.
 */
export declare function importAndLoadWorktimePlugins(plugins: Plugin[], layout: Layout.Layout): {
    name: string;
    hooks: import("./types").WorktimeHooks;
}[];
/**
 * Fully import and load the testtime plugins, if any, amongst the given plugins.
 */
export declare function importAndLoadTesttimePlugins(plugins: Plugin[]): Array<Either<Error, TesttimeContributions>>;
/**
 * Return only valid plugins. Invalid plugins will be logged as a warning.
 */
export declare function filterValidPlugins(plugins: Plugin[]): Plugin<any>[];
/**
 * Predicate function, is the given plugin a valid one.
 */
export declare function isValidPlugin(plugin: any): plugin is Plugin;
//# sourceMappingURL=load.d.ts.map