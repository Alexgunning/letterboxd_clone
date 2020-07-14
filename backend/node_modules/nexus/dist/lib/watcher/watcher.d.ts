import * as Chok from './chokidar';
import { Options } from './types';
export declare type ChangeEvent = PostInitChangeEvent | InitChangeEvent;
export declare type InitChangeEvent = {
    type: 'init';
    file: null;
};
export declare type PostInitChangeEvent = {
    type: Chok.ChangeEvent['type'];
    file: Chok.ChangeEvent['file'];
} | {
    type: 'plugin';
    file: Chok.ChangeEvent['file'];
};
export interface RunnerOptions {
    environmentAdditions?: Record<string, string>;
    entrypointScript?: string;
}
export interface Watcher {
    start: () => Promise<void>;
    stop: () => Promise<void>;
}
/**
 * Entrypoint into the watcher system.
 */
export declare function createWatcher(options: Options): Promise<Watcher>;
//# sourceMappingURL=watcher.d.ts.map