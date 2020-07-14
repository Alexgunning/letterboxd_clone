"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = exports.DEFAULT_RELATIVE_BACKING_TYPES_TYPEGEN_PATH = void 0;
const tslib_1 = require("tslib");
const FS = tslib_1.__importStar(require("fs-jetpack"));
const Path = tslib_1.__importStar(require("path"));
const fs_1 = require("../fs");
const nexus_logger_1 = require("../nexus-logger");
const log = nexus_logger_1.rootLogger.child('backingTypes');
exports.DEFAULT_RELATIVE_BACKING_TYPES_TYPEGEN_PATH = Path.join('node_modules', '@types', 'typegen-nexus-backing-types', 'index.d.ts');
async function write(backingTypes, opts) {
    var _a;
    const typeNames = Object.keys(backingTypes);
    let output = '';
    if (typeNames.length === 0) {
        output = `export type BackingTypes = 'No backing types found. Make sure you have some types exported'\n`;
    }
    else {
        output = `\
 export type BackingTypes =
${typeNames.map((t) => `  | '${t}'`).join('\n')}
`;
    }
    output += `\
declare global {
  export interface NexusBackingTypes {
    types: BackingTypes
  }
}
`;
    const localFS = FS.cwd((_a = opts === null || opts === void 0 ? void 0 : opts.cwd) !== null && _a !== void 0 ? _a : process.cwd());
    const outputPath = localFS.path(exports.DEFAULT_RELATIVE_BACKING_TYPES_TYPEGEN_PATH);
    log.trace('writing backing-types typegen', { outputPath });
    fs_1.hardWriteFileSync(outputPath, output);
}
exports.write = write;
//# sourceMappingURL=write.js.map