"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
/**
 * CLI command to help accelerate building a nexus plugin. The scaffolding is
 * based on the result that `$ tsdx init` produces.
 */
const common_tags_1 = require("common-tags");
const fs = tslib_1.__importStar(require("fs-jetpack"));
const prompts_1 = tslib_1.__importDefault(require("prompts"));
const nexus_logger_1 = require("../../../lib/nexus-logger");
const proc = tslib_1.__importStar(require("../../../lib/process"));
const utils_1 = require("../../../lib/utils");
const log = nexus_logger_1.rootLogger.child('cli').child('create').child('plugin');
class Plugin {
    async parse() {
        let needsChangeDir = false;
        log.info('Scaffolding a nexus plugin');
        const pluginName = await askUserPluginName();
        const pluginPackageName = 'nexus-plugin-' + pluginName;
        const contents = await fs.listAsync();
        if (contents !== undefined && contents.length > 0) {
            log.info(`Creating directory ${pluginPackageName}...`);
            const projectPath = fs.path(pluginPackageName);
            await fs.dirAsync(projectPath);
            process.chdir(projectPath);
            needsChangeDir = true;
        }
        log.info(`Scaffolding files`);
        await Promise.all([
            fs.writeAsync('README.md', common_tags_1.stripIndent `
          # ${pluginPackageName} <!-- omit in toc -->

          **Contents**

          <!-- START doctoc generated TOC please keep comment here to allow auto update -->
          <!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
          <!-- END doctoc generated TOC please keep comment here to allow auto update -->

          <br>

          ## Installation


          \`\`\`
          npm install ${pluginPackageName}
          \`\`\`

          <br>

          ## Example Usage

          TODO

          <br>

          ## Worktime Contributions

          TODO

          <br>

          ## Runtime Contributions

          TODO

          ## Testtime Contributions

          TODO
        `),
            fs.writeAsync('package.json', {
                name: pluginPackageName,
                version: '0.0.0',
                license: 'MIT',
                main: 'dist/index.js',
                module: `dist/${pluginPackageName}.esm.js`,
                description: 'A Nexus framework plugin',
                files: ['dist'],
                scripts: {
                    dev: 'tsc --watch',
                    'build:doc': 'doctoc README.md --notitle',
                    'build:ts': 'tsc',
                    build: 'yarn -s build:ts && yarn -s build:doc',
                    test: 'jest',
                    'publish:stable': 'dripip stable',
                    'publish:preview': 'dripip preview',
                    'publish:pr': 'dripip pr',
                    prepack: 'yarn -s build',
                },
                prettier: {
                    semi: false,
                    singleQuote: true,
                    trailingComma: 'es5',
                },
                jest: {
                    preset: 'ts-jest',
                    testEnvironment: 'node',
                    watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
                },
            }),
            fs.writeAsync('tsconfig.json', {
                include: ['src', 'types'],
                compilerOptions: {
                    target: 'ES2018',
                    module: 'CommonJS',
                    lib: ['esnext'],
                    importHelpers: true,
                    declaration: true,
                    outDir: 'dist',
                    sourceMap: true,
                    rootDir: 'src',
                    strict: true,
                    noImplicitReturns: true,
                    noFallthroughCasesInSwitch: true,
                    moduleResolution: 'node',
                    esModuleInterop: true,
                },
            }),
            fs.writeAsync('.gitignore', common_tags_1.stripIndent `
          *.log
          .DS_Store
          node_modules
          .rts2_cache_cjs
          .rts2_cache_esm
          .rts2_cache_umd
          .rts2_cache_system
          dist
          .vscode
        `),
            fs.writeAsync('src/worktime.ts', common_tags_1.stripIndent `
          import { WorktimePlugin } from 'nexus/plugin'

          export const plugin: WorktimePlugin = () => project => {
            project.hooks.dev.onStart = async () => {
              project.log.info('dev.onStart hook from ${pluginName}')
            }
            project.hooks.dev.onBeforeWatcherRestart = async () => {
              project.log.info('dev.onBeforeWatcherRestart hook from ${pluginName}')
            }
            project.hooks.dev.onAfterWatcherRestart = async () => {
              project.log.info('dev.onAfterWatcherRestart hook from ${pluginName}')
            }
            project.hooks.dev.onBeforeWatcherStartOrRestart = async () => {
              project.log.info('dev.onBeforeWatcherStartOrRestart hook from ${pluginName}')
            }
            project.hooks.build.onStart = async () => {
              project.log.info('build.onStart hook from ${pluginName}')
            }
          }
        `),
            fs.writeAsync('src/runtime.ts', common_tags_1.stripIndent `
          import { RuntimePlugin } from 'nexus/plugin'

          export const plugin: RuntimePlugin = () => project => {
            return {
              context: {
                create: _req => {
                  return {
                    '${pluginPackageName}': 'hello world!'
                  }
                },
                typeGen: {
                  fields: {
                    '${pluginPackageName}': 'string'
                  }
                }
              }
            }
          }
        `),
        ]);
        // TODO: use `pluginName` instead of hardcoded "plugin"
        fs.writeAsync('src/index.ts', common_tags_1.stripIndent `
      import { PluginEntrypoint } from 'nexus/plugin'

      export const plugin: PluginEntrypoint = () => ({
        packageJsonPath: require.resolve('../package.json'),
        runtime: {
          module: require.resolve('./runtime'),
          export: 'plugin'
        },
        worktime: {
          module: require.resolve('./worktime'),
          export: 'plugin'
        },
      })
    `);
        log.info(`Installing dev dependencies`);
        await proc.run('yarn add --dev ' +
            ['@types/jest', 'nexus', 'jest', 'jest-watch-typeahead', 'ts-jest', 'typescript', 'doctoc'].join(' '));
        log.info(`Initializing git repository...`);
        await utils_1.createGitRepository();
        let message;
        if (needsChangeDir) {
            message = `cd ${pluginPackageName} && yarn dev`;
        }
        else {
            message = `yarn dev`;
        }
        log.info(common_tags_1.stripIndent `
      Done! To get started:

          ${message}
    `);
    }
}
exports.default = Plugin;
/**
 * Promp the user to give the plugin they are about to work on a name.
 */
async function askUserPluginName() {
    // TODO prompt with "nexus-plugin-" text faded gray e.g.
    //
    // > nexus-plugin-|
    //
    //
    // TODO check the npm registry to see if the name is already taken before
    // continuing.
    //
    let pluginName;
    if (process.env.CREATE_PLUGIN_CHOICE_NAME) {
        pluginName = process.env.CREATE_PLUGIN_CHOICE_NAME;
    }
    else {
        const response = await prompts_1.default({
            type: 'text',
            name: 'pluginName',
            message: 'What is the name of your plugin?',
        });
        pluginName = response.pluginName;
    }
    const pluginNameNormalized = pluginName.replace(/^nexus-plugin-(.+)/, '$1');
    return pluginNameNormalized;
}
//# sourceMappingURL=plugin.js.map