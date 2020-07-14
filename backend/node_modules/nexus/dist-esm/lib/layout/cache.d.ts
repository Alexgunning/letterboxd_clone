import { Either } from 'fp-ts/lib/Either';
import { Layout } from './layout';
export declare function saveDataForChildProcess(layout: Layout): {
    NEXUS_LAYOUT: string;
};
/**
 * Load the layout data from a serialized version stored in the environment. If
 * it is not found then a warning will be logged and it will be recalculated.
 * For this reason the function is async however under normal circumstances it
 * should be as-if sync.
 */
export declare function loadDataFromParentProcess(): Promise<Either<Error, Layout>>;
//# sourceMappingURL=cache.d.ts.map