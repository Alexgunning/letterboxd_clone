/**
 * This module exists because chokidar does not support silently adding modules
 * to the watch list. We've started a discussion about adding this feature into
 * core here: https://github.com/paulmillr/chokidar/issues/953
 */
import * as chokidar from 'chokidar';
import { rootLogger } from '../nexus-logger';
const log = rootLogger.child('dev').child('watcher');
const SILENTABLE_EVENTS = ['add', 'addDir'];
function isSilentableEvent(event) {
    return SILENTABLE_EVENTS.includes(event);
}
export function watch(paths, options) {
    log.trace('starting', Object.assign({ paths }, options));
    const watcher = chokidar.watch(paths, options);
    const programmaticallyWatchedFiles = [];
    let watcherPaused = false;
    const wasFileAddedSilently = (event, file) => {
        if (programmaticallyWatchedFiles.includes(file) && isSilentableEvent(event)) {
            log.trace('ignoring file addition because was added silently', {
                file,
            });
            return true;
        }
        log.trace('file watcher event', { event, origin: file });
        return false;
    };
    const originalOnListener = watcher.on.bind(watcher);
    // Use `function` to bind originalOnListener to the right context
    watcher.on = function (event, listener) {
        if (event === 'all') {
            return originalOnListener(event, (eventName, path, stats) => {
                if (watcherPaused) {
                    return;
                }
                if (wasFileAddedSilently(eventName, path) === true) {
                    return;
                }
                listener(eventName, path, stats);
            });
        }
        return originalOnListener(event, (path, stats) => {
            if (watcherPaused) {
                return;
            }
            if (wasFileAddedSilently(event, path) === true) {
                return;
            }
            listener(path, stats);
        });
    };
    watcher.addSilently = (path) => {
        programmaticallyWatchedFiles.push(path);
        watcher.add(path);
    };
    watcher.pause = () => {
        watcherPaused = true;
    };
    watcher.resume = () => {
        watcherPaused = false;
    };
    return watcher;
}
//# sourceMappingURL=chokidar.js.map