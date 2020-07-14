import { Plugin } from './types';
import * as Layout from '../layout';
/**
 * This gets all the plugins in use in the app.
 *
 * @remarks
 *
 * This is useful for the CLI to get worktime plugins. This will run the app in
 * data mode, in this process.
 */
export declare function getUsedPlugins(layout: Layout.Layout): Promise<Plugin[]>;
//# sourceMappingURL=worktime.d.ts.map