import * as ts from 'typescript';
import { transpileModule } from '../../lib/tsc';
import { createStartModuleContent } from './start-module';
export function createDevAppRunner(layout, appSingleton, opts) {
    const startModule = createStartModuleContent({
        registerTypeScript: Object.assign(Object.assign({}, layout.tsConfig.content.options), { target: ts.ScriptTarget.ES2015, module: ts.ModuleKind.CommonJS }),
        internalStage: 'dev',
        layout: layout,
        absoluteModuleImports: true,
        runtimePluginManifests: [],
        catchUnhandledErrors: opts === null || opts === void 0 ? void 0 : opts.catchUnhandledErrors,
    });
    const transpiledStartModule = transpileModule(startModule, Object.assign(Object.assign({}, layout.tsConfig.content.options), { target: ts.ScriptTarget.ES2015, module: ts.ModuleKind.CommonJS }));
    return {
        start: () => {
            return eval(transpiledStartModule);
        },
        stop: () => appSingleton.stop(),
        port: appSingleton.settings.current.server.port,
    };
}
//# sourceMappingURL=dev-runner.js.map