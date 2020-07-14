"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSchemaSettingsManager = exports.changeSettings = void 0;
const tslib_1 = require("tslib");
const Lo = tslib_1.__importStar(require("lodash"));
const connectionPluginConfigManagedByNexus = {
    nexusSchemaImportId: 'nexus/components/schema',
    /**
     * The name of the relay connection field builder. This is not configurable by users.
     */
    nexusFieldName: 'connection',
};
/**
 * Mutate the settings data with new settings input.
 */
function changeSettings(state, newSettings) {
    if (newSettings.nullable !== undefined) {
        Lo.merge(state.nullable, newSettings.nullable);
    }
    if (newSettings.generateGraphQLSDLFile !== undefined) {
        state.generateGraphQLSDLFile = newSettings.generateGraphQLSDLFile;
    }
    if (newSettings.rootTypingsGlobPattern !== undefined) {
        state.rootTypingsGlobPattern = newSettings.rootTypingsGlobPattern;
    }
    if (newSettings.authorization !== undefined) {
        state.authorization = newSettings.authorization;
    }
    if (newSettings.connections !== undefined) {
        Object.keys(newSettings.connections)
            // must already have the defaults
            .filter((key) => state.connections[key] === undefined)
            .forEach((key) => {
            state.connections[key] = Lo.merge(state.connections[key], connectionPluginConfigManagedByNexus);
        });
        Lo.merge(state.connections, newSettings.connections);
    }
}
exports.changeSettings = changeSettings;
function defaultAuthorizationErrorFormatter(config) {
    return config.error;
}
/**
 * Get the default settings.
 */
function defaultSettings() {
    const data = {
        nullable: {
            inputs: true,
            outputs: true,
        },
        generateGraphQLSDLFile: 'api.graphql',
        rootTypingsGlobPattern: './**/*.ts',
        connections: {
            // there is another level of defaults that will be applied by Nexus Schema Relay Connections plugin
            default: Object.assign({}, connectionPluginConfigManagedByNexus),
        },
        authorization: {
            formatError: defaultAuthorizationErrorFormatter,
        },
    };
    return data;
}
/**
 * Create a schema settings manager.
 */
function createSchemaSettingsManager() {
    const data = defaultSettings();
    function change(newSettings) {
        return changeSettings(data, newSettings);
    }
    function reset() {
        for (const k of Object.keys(data)) {
            delete data[k];
        }
        Object.assign(data, defaultSettings());
    }
    return {
        change,
        reset,
        data,
    };
}
exports.createSchemaSettingsManager = createSchemaSettingsManager;
//# sourceMappingURL=settings.js.map