/// <reference types="node" />
/**
 * This module exists because chokidar does not support silently adding modules
 * to the watch list. We've started a discussion about adding this feature into
 * core here: https://github.com/paulmillr/chokidar/issues/953
 */
import * as chokidar from 'chokidar';
import * as fs from 'fs';
export declare type ChangeType = 'add' | 'addDir' | 'change' | 'unlink' | 'unlinkDir';
export interface ChangeEvent {
    type: ChangeType;
    file: string;
}
export declare type FileWatcher = chokidar.FSWatcher & {
    /**
     * Adds a file to be watched without triggering the 'add' events
     */
    addSilently(path: string): void;
    pause(): void;
    resume(): void;
};
export declare type FileWatcherEventCallback = (eventName: ChangeType, path: string, stats: fs.Stats | undefined, watcher: {
    restart: (file: string) => void;
    pause: () => void;
    resume: () => void;
}) => void;
declare type FileWatcherOptions = chokidar.WatchOptions;
export declare function watch(paths: string | ReadonlyArray<string>, options?: FileWatcherOptions): FileWatcher;
export {};
//# sourceMappingURL=chokidar.d.ts.map