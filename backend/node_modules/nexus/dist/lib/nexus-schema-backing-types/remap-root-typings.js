"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remapSchemaWithRootTypings = void 0;
const levenstein_1 = require("../levenstein");
const nexus_logger_1 = require("../nexus-logger");
const log = nexus_logger_1.rootLogger.child('backingTypes');
/**
 * Remaps the rootTypings stored in the schema to actual filePath & typeName
 * so that @nexus/schema can properly import them in its typegen file
 * eg: 'CustomType1' -> { path: __filename, name: 'CustomType1' }
 */
function remapSchemaWithRootTypings(schema, backingTypes) {
    Object.entries(schema.extensions.nexus.config.rootTypings).forEach(([typeName, rootType]) => {
        if (typeof rootType === 'string') {
            const filePath = backingTypes[rootType];
            if (!filePath) {
                const suggestions = levenstein_1.suggestionList(rootType, Object.keys(backingTypes));
                log.warn(`We could not find the backing type '${rootType}' used in '${typeName}'`);
                if (suggestions.length > 0) {
                    log.warn(`Did you mean ${suggestions.map((s) => `"${s}"`).join(', ')} ?`);
                }
                return;
            }
            schema.extensions.nexus.config.rootTypings[typeName] = {
                name: rootType,
                path: filePath,
            };
        }
    });
    return schema;
}
exports.remapSchemaWithRootTypings = remapSchemaWithRootTypings;
//# sourceMappingURL=remap-root-typings.js.map