"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeFSSpec = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-jetpack"));
const Path = tslib_1.__importStar(require("path"));
function writeFSSpec(cwd, spec) {
    Object.entries(spec).forEach(([fileOrDirName, fileContentOrDir]) => {
        const fileOrDirPath = Path.join(cwd, fileOrDirName);
        if (typeof fileContentOrDir === 'string') {
            fs.write(fileOrDirPath, fileContentOrDir);
        }
        else {
            if (Object.keys(fileContentOrDir).length === 0) {
                fs.dir(fileOrDirPath);
            }
            writeFSSpec(fileOrDirPath, fileContentOrDir);
        }
    });
}
exports.writeFSSpec = writeFSSpec;
//# sourceMappingURL=testing-utils.js.map