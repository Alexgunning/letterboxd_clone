import { EOL } from 'os';
import { arg, isError } from '../../lib/cli';
import { create } from '../../lib/layout';
import { rootLogger } from '../../lib/nexus-logger';
import { fatal } from '../../lib/process';
import { getNexusReport } from '../../lib/report';
const log = rootLogger.child('cli').child('build');
const flags = {
    '--json': Boolean,
};
export class Report {
    async parse(argv) {
        var _a;
        const args = arg(argv, flags);
        if (isError(args)) {
            log.error((_a = args.stack) !== null && _a !== void 0 ? _a : args.message);
            fatal('');
        }
        const layout = await create();
        const report = await getNexusReport(layout);
        if (args['--json']) {
            console.log(JSON.stringify(report));
            return;
        }
        // todo copy-paste this to user clipboard
        console.log('```json' + EOL + JSON.stringify(report, null, 2) + EOL + '```');
    }
}
//# sourceMappingURL=report.js.map