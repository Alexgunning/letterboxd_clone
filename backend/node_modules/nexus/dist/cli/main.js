#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv = tslib_1.__importStar(require("dotenv"));
const util_1 = require("util");
const cli_1 = require("../lib/cli");
const ExitSystem = tslib_1.__importStar(require("../lib/exit-system"));
const Glocal = tslib_1.__importStar(require("../lib/glocal"));
const Commands = tslib_1.__importStar(require("./commands"));
Glocal.setup({
    toolName: 'Nexus',
    depName: 'nexus',
    filename: __filename,
    run() {
        dotenv.config();
        ExitSystem.install();
        process.on('uncaughtException', (e) => {
            console.error(e);
            ExitSystem.exit(1);
        });
        process.on('unhandledRejection', (e) => {
            console.error(e);
            ExitSystem.exit(1);
        });
        const cli = new cli_1.CLI({
            dev: new Commands.Dev(),
            build: new Commands.Build(),
            report: new Commands.Report(),
            create: {
                app: new Commands.Create.App(),
                plugin: new Commands.Create.Plugin(),
                __default: 'app',
            },
            __default: new Commands.__Default(),
        });
        cli
            .parse(process.argv.slice(2))
            .then((result) => {
            if (result instanceof cli_1.HelpError) {
                console.error(result.message);
                return 1;
            }
            else if (util_1.isError(result)) {
                console.error(result);
                return 1;
            }
            else {
                if (result !== undefined) {
                    console.log(result);
                }
                return 0;
            }
        })
            .then((exitCode) => {
            ExitSystem.exit(exitCode);
        });
    },
});
//# sourceMappingURL=main.js.map