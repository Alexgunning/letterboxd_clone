"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDevAppRunner = void 0;
const tslib_1 = require("tslib");
const ts = tslib_1.__importStar(require("typescript"));
const tsc_1 = require("../../lib/tsc");
const start_module_1 = require("./start-module");
function createDevAppRunner(layout, appSingleton, opts) {
    const startModule = start_module_1.createStartModuleContent({
        registerTypeScript: Object.assign(Object.assign({}, layout.tsConfig.content.options), { target: ts.ScriptTarget.ES2015, module: ts.ModuleKind.CommonJS }),
        internalStage: 'dev',
        layout: layout,
        absoluteModuleImports: true,
        runtimePluginManifests: [],
        catchUnhandledErrors: opts === null || opts === void 0 ? void 0 : opts.catchUnhandledErrors,
    });
    const transpiledStartModule = tsc_1.transpileModule(startModule, Object.assign(Object.assign({}, layout.tsConfig.content.options), { target: ts.ScriptTarget.ES2015, module: ts.ModuleKind.CommonJS }));
    return {
        start: () => {
            return eval(transpiledStartModule);
        },
        stop: () => appSingleton.stop(),
        port: appSingleton.settings.current.server.port,
    };
}
exports.createDevAppRunner = createDevAppRunner;
//# sourceMappingURL=dev-runner.js.map