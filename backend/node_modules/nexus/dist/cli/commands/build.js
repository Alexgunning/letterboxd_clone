"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Build = void 0;
const common_tags_1 = require("common-tags");
const build_1 = require("../../lib/build");
const deploy_target_1 = require("../../lib/build/deploy-target");
const cli_1 = require("../../lib/cli");
const nexus_logger_1 = require("../../lib/nexus-logger");
const log = nexus_logger_1.rootLogger.child('cli').child('build');
const BUILD_ARGS = {
    '--output': String,
    '-o': '--output',
    '--deployment': String,
    '-d': '--deployment',
    '--stage': String,
    '--entrypoint': String,
    '-e': '--entrypoint',
    '--no-bundle': Boolean,
    '--help': Boolean,
    '-h': '--help',
};
class Build {
    async parse(argv) {
        var _a;
        const args = cli_1.arg(argv, BUILD_ARGS);
        if (cli_1.isError(args)) {
            log.error((_a = args.stack) !== null && _a !== void 0 ? _a : args.message);
            return this.help();
        }
        if (args['--help']) {
            return this.help();
        }
        await build_1.buildNexusApp({
            target: args['--deployment'],
            output: args['--output'],
            stage: args['--stage'],
            entrypoint: args['--entrypoint'],
            asBundle: args['--no-bundle'] !== true,
        });
    }
    help() {
        return common_tags_1.stripIndent `
      Usage: nexus build [flags]

      Build a production-ready nexus server

      Flags:
        -o,     --output    Relative path to output directory
        -e, --entrypoint    Custom entrypoint to your app (default: app.ts)
        -d, --deployment    Enable custom build for some deployment platforms (${deploy_target_1.formattedSupportedDeployTargets})
             --no-bundle    Do not output build as a bundle
        -h,       --help    Show this help message
    `;
    }
}
exports.Build = Build;
//# sourceMappingURL=build.js.map