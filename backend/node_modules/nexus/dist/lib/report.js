"use strict";
/**
 * This module is for reporting issues about Nexus. It extracts diagnostics
 * about the proejct and environment and can format them for a GitHub issue.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBaseReport = exports.getNexusReport = void 0;
const tslib_1 = require("tslib");
const Either_1 = require("fp-ts/lib/Either");
const os_1 = tslib_1.__importDefault(require("os"));
const PluginRuntime = tslib_1.__importStar(require("./plugin"));
const PluginWorktime = tslib_1.__importStar(require("./plugin/worktime"));
/**
 * Extract diagnostics about the Nexus project.
 */
async function getNexusReport(errLayout) {
    var _a, _b, _c, _d;
    if (Either_1.isLeft(errLayout)) {
        return Object.assign(Object.assign({}, getBaseReport()), { errorsWhileGatheringReport: {
                gettingLayout: errLayout.left,
                gettingPluginManifests: null,
            } });
    }
    const layout = errLayout.right;
    const pj = (_a = layout.packageJson) === null || _a === void 0 ? void 0 : _a.content;
    const deps = (_b = pj === null || pj === void 0 ? void 0 : pj.dependencies) !== null && _b !== void 0 ? _b : {};
    const otherDeps = Object.fromEntries(Object.entries(deps).filter((ent) => {
        return ent[0] !== 'nexus' && !ent[0].startsWith('nexus-plugin');
    }));
    const pluginEntrypoints = await PluginWorktime.getUsedPlugins(layout);
    const gotManifests = PluginRuntime.getPluginManifests(pluginEntrypoints);
    return Object.assign(Object.assign({}, getBaseReport()), { nexus: (_c = deps.nexus) !== null && _c !== void 0 ? _c : 'undefined', plugins: gotManifests.data.map((m) => m.name), otherDependencies: otherDeps, devDependencies: (_d = pj === null || pj === void 0 ? void 0 : pj.devDependencies) !== null && _d !== void 0 ? _d : {}, hasAppModule: layout.data.app.exists, packageManager: layout.packageManagerType, errorsWhileGatheringReport: {
            gettingLayout: null,
            gettingPluginManifests: gotManifests.errors
                ? gotManifests.errors.map((e) => { var _a; return (_a = e.stack) !== null && _a !== void 0 ? _a : e.message; })
                : null,
        } });
}
exports.getNexusReport = getNexusReport;
/**
 * Generic report data about user system, not particular to Nexus.
 */
function getBaseReport() {
    return {
        node: process.version,
        os: {
            platform: os_1.default.platform(),
            release: os_1.default.release(),
        },
    };
}
exports.getBaseReport = getBaseReport;
//# sourceMappingURL=report.js.map