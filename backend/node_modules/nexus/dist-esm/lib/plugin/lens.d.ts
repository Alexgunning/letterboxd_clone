import * as Scalars from '../scalars';
import * as Layout from '../layout';
import { Lens, RuntimeLens, WorktimeLens } from './types';
export declare function createBaseLens(pluginName: string): Lens;
export declare function createRuntimeLens(pluginName: string, scalars: Scalars.Scalars): RuntimeLens;
export declare function createWorktimeLens(layout: Layout.Layout, pluginName: string): WorktimeLens;
//# sourceMappingURL=lens.d.ts.map