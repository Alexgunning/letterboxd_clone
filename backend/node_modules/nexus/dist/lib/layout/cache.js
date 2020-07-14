"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadDataFromParentProcess = exports.saveDataForChildProcess = void 0;
const Either_1 = require("fp-ts/lib/Either");
const nexus_logger_1 = require("../nexus-logger");
const layout_1 = require("./layout");
const ENV_VAR_DATA_NAME = 'NEXUS_LAYOUT';
const log = nexus_logger_1.rootLogger.child('layout');
function saveDataForChildProcess(layout) {
    return {
        [ENV_VAR_DATA_NAME]: JSON.stringify(layout.data),
    };
}
exports.saveDataForChildProcess = saveDataForChildProcess;
/**
 * Load the layout data from a serialized version stored in the environment. If
 * it is not found then a warning will be logged and it will be recalculated.
 * For this reason the function is async however under normal circumstances it
 * should be as-if sync.
 */
async function loadDataFromParentProcess() {
    const savedData = process.env[ENV_VAR_DATA_NAME];
    if (!savedData) {
        log.trace('WARNING an attempt to load saved layout data was made but no serialized data was found in the environment. This may represent a bug. Layout is being re-calculated as a fallback solution. This should result in the same layout data (if not, another probably bug, compounding confusion) but at least adds latentency to user experience.');
        return layout_1.create({}); // todo no build output...
    }
    else {
        // todo guard against corrupted env data
        return Either_1.right(layout_1.createFromData(JSON.parse(savedData)));
    }
}
exports.loadDataFromParentProcess = loadDataFromParentProcess;
//# sourceMappingURL=cache.js.map