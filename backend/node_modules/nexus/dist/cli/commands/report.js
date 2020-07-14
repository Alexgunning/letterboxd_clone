"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const os_1 = require("os");
const cli_1 = require("../../lib/cli");
const layout_1 = require("../../lib/layout");
const nexus_logger_1 = require("../../lib/nexus-logger");
const process_1 = require("../../lib/process");
const report_1 = require("../../lib/report");
const log = nexus_logger_1.rootLogger.child('cli').child('build');
const flags = {
    '--json': Boolean,
};
class Report {
    async parse(argv) {
        var _a;
        const args = cli_1.arg(argv, flags);
        if (cli_1.isError(args)) {
            log.error((_a = args.stack) !== null && _a !== void 0 ? _a : args.message);
            process_1.fatal('');
        }
        const layout = await layout_1.create();
        const report = await report_1.getNexusReport(layout);
        if (args['--json']) {
            console.log(JSON.stringify(report));
            return;
        }
        // todo copy-paste this to user clipboard
        console.log('```json' + os_1.EOL + JSON.stringify(report, null, 2) + os_1.EOL + '```');
    }
}
exports.Report = Report;
//# sourceMappingURL=report.js.map