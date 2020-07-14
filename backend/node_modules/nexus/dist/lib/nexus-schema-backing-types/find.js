"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.find = void 0;
const fs_1 = require("../fs");
const nexus_logger_1 = require("../nexus-logger");
const log = nexus_logger_1.rootLogger.child('backingTypes');
async function find(pattern, opts) {
    const files = await fs_1.findFiles(pattern, opts);
    log.trace('backing-types files to extract from', {
        files,
        cwd: opts === null || opts === void 0 ? void 0 : opts.cwd,
    });
    return files;
}
exports.find = find;
//# sourceMappingURL=find.js.map