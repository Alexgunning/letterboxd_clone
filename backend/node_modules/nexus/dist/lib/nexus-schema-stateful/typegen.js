"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateArtifacts = void 0;
const tslib_1 = require("tslib");
const NexusSchema = tslib_1.__importStar(require("@nexus/schema"));
const common_tags_1 = require("common-tags");
const Lo = tslib_1.__importStar(require("lodash"));
const Path = tslib_1.__importStar(require("path"));
const Logger = tslib_1.__importStar(require("../nexus-logger"));
const log = Logger.rootLogger.child('schemaTypegen');
async function generateArtifacts(params) {
    const typegenConfig = resolveTypegenConfig(params);
    const typegenMetadata = new NexusSchema.core.TypegenMetadata(typegenConfig);
    await typegenMetadata.generateArtifacts(params.graphqlSchema);
}
exports.generateArtifacts = generateArtifacts;
function resolveTypegenConfig(params) {
    const schemaConfig = params.graphqlSchema.extensions.nexus.config;
    const typegenOutput = params.layout.projectPath('node_modules/@types/typegen-nexus/index.d.ts');
    let schemaOutput;
    if (params.schemaSettings.generateGraphQLSDLFile === false) {
        schemaOutput = false;
    }
    else {
        schemaOutput = params.layout.projectPathOrAbsolute(params.schemaSettings.generateGraphQLSDLFile);
    }
    schemaConfig.outputs = {
        typegen: typegenOutput,
        schema: schemaOutput,
    };
    schemaConfig.shouldGenerateArtifacts = true;
    const schemaConfigWithTypegen = withCustomTypegenConfig(schemaConfig, params.plugins);
    return NexusSchema.core.resolveTypegenConfig(schemaConfigWithTypegen);
}
/**
 * Augment @nexus/schema typegen config with contributions from plugins.
 */
function withCustomTypegenConfig(nexusConfig, plugins) {
    var _a;
    // Integrate plugin typegenAutoConfig contributions
    const typegenAutoConfigFromPlugins = {};
    for (const p of plugins) {
        if ((_a = p.schema) === null || _a === void 0 ? void 0 : _a.typegenAutoConfig) {
            Lo.merge(typegenAutoConfigFromPlugins, p.schema.typegenAutoConfig);
        }
    }
    const typegenAutoConfigObject = Lo.merge({}, typegenAutoConfigFromPlugins, nexusConfig.typegenAutoConfig);
    nexusConfig.typegenAutoConfig = undefined;
    function contextTypeContribSpecToCode(ctxTypeContribSpec) {
        return common_tags_1.stripIndents `
      interface Context {
        ${Object.entries(ctxTypeContribSpec)
            .map(([name, type]) => {
            // Quote key name to handle case of identifier-incompatible key names
            return `'${name}': ${type}`;
        })
            .join('\n')}
      }
    `;
    }
    // Our use-case of multiple context sources seems to require a custom
    // handling of typegenConfig. Opened an issue about maybe making our
    // curreent use-case, fairly basic, integrated into the auto system, here:
    // https://github.com/prisma-labs/nexus/issues/323
    nexusConfig.typegenConfig = async (schema, outputPath) => {
        const configurator = await NexusSchema.core.typegenAutoConfig(typegenAutoConfigObject);
        const config = await configurator(schema, outputPath);
        // Initialize
        config.imports.push('interface Context {}');
        config.imports.push(common_tags_1.stripIndent `
      declare global {
        interface NexusContext extends Context {}
      }
    `);
        config.contextType = 'NexusContext';
        // Integrate plugin context contributions
        for (const p of plugins) {
            if (!p.context)
                continue;
            if (p.context.typeGen.imports) {
                for (const typegenImport of p.context.typeGen.imports) {
                    const relativeImportPath = (Path.isAbsolute(typegenImport.from)
                        ? NexusSchema.core.relativePathTo(typegenImport.from, outputPath)
                        : typegenImport.from).replace(/(\.d)?\.ts/, '');
                    const importStatement = `import * as ${typegenImport.as} from "${relativeImportPath}"`;
                    if (!config.imports.includes(importStatement)) {
                        config.imports.push(importStatement);
                    }
                }
            }
            config.imports.push(contextTypeContribSpecToCode(p.context.typeGen.fields));
        }
        config.imports.push("import * as Logger from 'nexus/components/logger'", contextTypeContribSpecToCode({
            log: 'Logger.Logger',
        }));
        config.nexusSchemaImportId = 'nexus/components/schema';
        log.trace('built up Nexus typegenConfig', { config });
        return config;
    };
    return nexusConfig;
}
//# sourceMappingURL=typegen.js.map