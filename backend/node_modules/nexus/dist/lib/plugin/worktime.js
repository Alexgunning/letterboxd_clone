"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsedPlugins = void 0;
const tslib_1 = require("tslib");
const Reflection = tslib_1.__importStar(require("../reflection/reflect"));
const Process = tslib_1.__importStar(require("../process"));
const nexus_logger_1 = require("../nexus-logger");
const log = nexus_logger_1.rootLogger.child('plugin');
/**
 * This gets all the plugins in use in the app.
 *
 * @remarks
 *
 * This is useful for the CLI to get worktime plugins. This will run the app in
 * data mode, in this process.
 */
async function getUsedPlugins(layout) {
    try {
        const reflection = await Reflection.reflect(layout, { usedPlugins: true, onMainThread: true });
        if (!reflection.success) {
            throw reflection.error;
        }
        log.trace('got used plugins', { validPlugins: reflection.plugins });
        return reflection.plugins;
    }
    catch (e) {
        Process.fatal('Failed to scan app for used plugins because there is a runtime error in the app', {
            error: e,
        });
    }
}
exports.getUsedPlugins = getUsedPlugins;
//# sourceMappingURL=worktime.js.map