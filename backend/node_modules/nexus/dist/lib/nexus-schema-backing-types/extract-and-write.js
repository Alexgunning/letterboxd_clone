"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateBackingTypesArtifacts = void 0;
const extract_1 = require("./extract");
const find_1 = require("./find");
const write_1 = require("./write");
async function generateBackingTypesArtifacts(filePattern, opts) {
    const backingTypesFiles = await find_1.find(filePattern, { cwd: opts === null || opts === void 0 ? void 0 : opts.extractCwd });
    const backingTypes = await extract_1.extract(backingTypesFiles);
    // Write in background
    await write_1.write(backingTypes, { cwd: opts === null || opts === void 0 ? void 0 : opts.writeCwd });
    return backingTypes;
}
exports.generateBackingTypesArtifacts = generateBackingTypesArtifacts;
//# sourceMappingURL=extract-and-write.js.map