import * as Lo from 'lodash';
import prompts from 'prompts';
import { rootLogger } from '../nexus-logger';
import * as Process from '../process';
import { isReflectionStage } from '../reflection/stage';
const log = rootLogger.child('plugin');
export function createBaseLens(pluginName) {
    return {
        log: log.child(Lo.camelCase(pluginName)),
        run: Process.run,
        runSync: Process.runSync,
        prompt: prompts,
    };
}
export function createRuntimeLens(pluginName, scalars) {
    return Object.assign(Object.assign({}, createBaseLens(pluginName)), { shouldGenerateArtifacts: isReflectionStage('typegen'), scalars });
}
export function createWorktimeLens(layout, pluginName) {
    return Object.assign(Object.assign({}, createBaseLens(pluginName)), { layout: layout, packageManager: layout.packageManager, hooks: {
            create: {},
            dev: {
                addToWatcherSettings: {},
            },
            build: {},
            generate: {},
        } });
}
//# sourceMappingURL=lens.js.map