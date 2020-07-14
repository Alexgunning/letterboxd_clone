"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = exports.loadEnvironmentFromConfig = exports.printStaticEnvSetters = exports.loadAndProcessConfig = exports.processConfig = exports.loadConfig = exports.readConfig = exports.DATABASE_URL_ENV_NAME = void 0;
const tslib_1 = require("tslib");
const common_tags_1 = require("common-tags");
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const fs = tslib_1.__importStar(require("fs-jetpack"));
const Path = tslib_1.__importStar(require("path"));
const typescript_1 = require("typescript");
const nexus_logger_1 = require("../lib/nexus-logger");
const process_1 = require("../lib/process");
const tsc_1 = require("../lib/tsc");
const log = nexus_logger_1.rootLogger.child('config');
exports.DATABASE_URL_ENV_NAME = 'NEXUS_DATABASE_URL';
function tryReadConfig(configPath) {
    const { unregister } = registerTsExt();
    try {
        const config = require(configPath);
        unregister();
        return config;
    }
    catch (e) {
        log.trace('could not load nexus config file', {
            configPath,
            reason: e,
        });
        return null;
    }
}
// TODO: make sure it's properly exported
function validateConfig(config) {
    if (!config) {
        return null;
    }
    if (!config.default) {
        process_1.fatal('Your config in `nexus.config.ts` needs to be default exported. `export default createConfig({ ... })`');
    }
    return config.default;
}
function readConfig() {
    const config = tryReadConfig(fs.path('nexus.config.ts'));
    const validatedConfig = validateConfig(config);
    if (!validateConfig(config)) {
        return null;
    }
    return validatedConfig;
}
exports.readConfig = readConfig;
function loadConfig(inputStage) {
    const config = readConfig();
    const stage = normalizeStage(inputStage);
    if (!config) {
        return null;
    }
    const env = loadEnvironment(config.environments, stage);
    return {
        environment: env,
        environment_mapping: config.environment_mapping,
    };
}
exports.loadConfig = loadConfig;
function processConfig(loadedConfig, stage) {
    processEnvFromConfig(loadedConfig, stage);
    processEnvMappingFromConfig(loadedConfig);
}
exports.processConfig = processConfig;
/**
 * Take stage from args passed to cli, or from node_env, or fallback to development if none were set
 */
function normalizeStage(inputStage) {
    var _a;
    return (_a = inputStage !== null && inputStage !== void 0 ? inputStage : process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development';
}
function processEnvFromConfig(loadedConfig, inputStage) {
    const stage = normalizeStage(inputStage);
    const loadedEnv = loadedConfig.environment;
    if (!loadedEnv) {
        log.trace('No environment to load from config with', { NODE_ENV: stage });
        return;
    }
    for (const envName in loadedEnv) {
        if (!process.env[envName]) {
            log.trace('setting env var', { envName, envValue: loadedEnv[envName] });
            process.env[envName] = loadedEnv[envName];
        }
        else {
            log.trace('env var is not loaded from config as its already set to value', {
                envName,
                envValue: process.env[envName],
            });
        }
    }
}
function loadEnvironment(environments, stage) {
    if (!environments || !environments[stage]) {
        return undefined;
    }
    const envToLoad = environments[stage];
    const secretLoader = createSecretLoader(stage);
    return typeof envToLoad === 'function' ? envToLoad(secretLoader) : envToLoad;
}
function processEnvMappingFromConfig(loadedConfig) {
    for (const sourceEnvName in loadedConfig.environment_mapping) {
        const targetEnvName = loadedConfig.environment_mapping[sourceEnvName];
        if (!targetEnvName) {
            continue;
        }
        if (targetEnvName) {
            log.trace('env var not mapped because target is already set', {
                sourceEnvName,
                targetEnvName,
                targetEnvValue: loadedConfig.environment_mapping[targetEnvName],
            });
            return;
        }
        if (!process.env[sourceEnvName]) {
            log.trace('could not map env var source to target beause source not set', {
                sourceEnvName,
                targetEnvName,
            });
            return;
        }
        log.trace('mapped source env var to target', {
            sourceEnvName,
            targetEnvName,
            value: process.env[sourceEnvName],
        });
        process.env[targetEnvName] = process.env[sourceEnvName];
    }
}
/**
 * Register .ts extension only if it wasn't set already
 */
function registerTsExt() {
    if (require.extensions['.ts']) {
        return { unregister: () => { } };
    }
    const originalHandler = require.extensions['.js'];
    require.extensions['.ts'] = (m, filename) => {
        const _compile = m._compile;
        m._compile = function (code, fileName) {
            const transpiledModule = tsc_1.transpileModule(code, {
                target: typescript_1.ScriptTarget.ES5,
            });
            return _compile.call(this, transpiledModule, fileName);
        };
        return originalHandler(m, filename);
    };
    return {
        unregister: () => {
            delete require.extensions['.ts'];
        },
    };
}
function loadAndProcessConfig(inputStage) {
    const stage = normalizeStage(inputStage);
    const config = loadConfig(stage);
    if (config) {
        processConfig(config, stage);
    }
    return config;
}
exports.loadAndProcessConfig = loadAndProcessConfig;
function printStaticEnvSetter(envName, value) {
    if (!value) {
        return '';
    }
    return common_tags_1.stripIndent `
  if (!process.env.${envName}) {
    process.env.${envName} = "${String(value)}"
  }
  `;
}
function printStaticEnvMapping(source, target) {
    if (!target) {
        return '';
    }
    return common_tags_1.stripIndent `
  if (!process.env.${target}) {
    process.env.${target} = process.env.${source}
  }
  `;
}
function printStaticEnvSetters(config, stage) {
    let output = '';
    const env = config.environment;
    if (env) {
        for (const envName in env) {
            output += printStaticEnvSetter(envName, env[envName]);
        }
    }
    const envMapping = config.environment_mapping;
    if (envMapping) {
        for (const sourceEnvName in envMapping) {
            const targetEnvName = envMapping[sourceEnvName];
            output += printStaticEnvMapping(sourceEnvName, targetEnvName);
        }
    }
    return output;
}
exports.printStaticEnvSetters = printStaticEnvSetters;
function createSecretLoader(stage) {
    const secretsByStageCache = {};
    const loadSecrets = () => {
        const result = secretsByStageCache[stage] ? secretsByStageCache[stage] : tryLoadSecrets(stage);
        if (!result) {
            log.warn(`We could not load your secret(s) for environment \`${stage}\``);
            log.warn(`A file \`${stage}.env\` or .secrets/${stage}.env must exist`);
            return null;
        }
        return result;
    };
    return {
        secret: (secretName) => {
            const loadedSecrets = loadSecrets();
            if (!(loadedSecrets === null || loadedSecrets === void 0 ? void 0 : loadedSecrets.secrets[secretName])) {
                log.warn(`We could not load your secret \`${secretName}\` for environment \`${stage}\``);
                log.warn(`${loadedSecrets === null || loadedSecrets === void 0 ? void 0 : loadedSecrets.file} does not export any secret called \`${secretName}\``);
                return undefined;
            }
            return loadedSecrets.secrets[secretName];
        },
        secrets: (...secretsNames) => {
            const loadedSecrets = loadSecrets();
            if (!loadedSecrets) {
                return undefined;
            }
            if (secretsNames.length === 0) {
                return loadedSecrets.secrets;
            }
            const pickedSecrets = Object.entries(loadedSecrets.secrets).reduce((acc, [secretName, secretValue]) => {
                if (secretsNames.includes(secretName)) {
                    acc[secretName] = secretValue;
                }
                else {
                    log.warn(`We could not load your secret \`${secretName}\` for environment \`${stage}\``);
                    log.warn(`${loadedSecrets === null || loadedSecrets === void 0 ? void 0 : loadedSecrets.file} does not export any secret called \`${secretName}\``);
                }
                return acc;
            }, {});
            return pickedSecrets;
        },
    };
}
function tryLoadSecrets(stage) {
    const secretFileName = `${stage}.env`;
    let secretPath = Path.join('.secrets', secretFileName);
    let secretContent = fs.read(secretPath);
    if (secretContent) {
        return { secrets: dotenv_1.default.parse(secretContent), file: secretPath };
    }
    secretContent = fs.read(secretFileName);
    if (secretContent) {
        return { secrets: dotenv_1.default.parse(secretContent), file: secretFileName };
    }
    return null;
}
function loadEnvironmentFromConfig(inputStage) {
    var _a;
    const config = loadConfig(inputStage);
    if (!config) {
        return null;
    }
    return (_a = config.environment) !== null && _a !== void 0 ? _a : null;
}
exports.loadEnvironmentFromConfig = loadEnvironmentFromConfig;
/**
 * Helper method to configure nexus. **Must be default exported in a `nexus.config.ts` file**
 *
 * @example
 *
 * export default createConfig({
 *   environments: {
 *     development: {
 *       NEXUS_DATABASE_URL: "<database_connection_url>"
 *     }
 *   }
 * })
 */
function createConfig(config) {
    return config;
}
exports.createConfig = createConfig;
//# sourceMappingURL=config.js.map