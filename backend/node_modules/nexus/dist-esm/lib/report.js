/**
 * This module is for reporting issues about Nexus. It extracts diagnostics
 * about the proejct and environment and can format them for a GitHub issue.
 */
import { isLeft } from 'fp-ts/lib/Either';
import os from 'os';
import * as PluginRuntime from './plugin';
import * as PluginWorktime from './plugin/worktime';
/**
 * Extract diagnostics about the Nexus project.
 */
export async function getNexusReport(errLayout) {
    var _a, _b, _c, _d;
    if (isLeft(errLayout)) {
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
/**
 * Generic report data about user system, not particular to Nexus.
 */
export function getBaseReport() {
    return {
        node: process.version,
        os: {
            platform: os.platform(),
            release: os.release(),
        },
    };
}
//# sourceMappingURL=report.js.map