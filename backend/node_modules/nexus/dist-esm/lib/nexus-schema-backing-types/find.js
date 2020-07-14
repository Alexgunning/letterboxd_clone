import { findFiles } from '../fs';
import { rootLogger } from '../nexus-logger';
const log = rootLogger.child('backingTypes');
export async function find(pattern, opts) {
    const files = await findFiles(pattern, opts);
    log.trace('backing-types files to extract from', {
        files,
        cwd: opts === null || opts === void 0 ? void 0 : opts.cwd,
    });
    return files;
}
//# sourceMappingURL=find.js.map