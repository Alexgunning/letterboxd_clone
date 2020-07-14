"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = exports.defaultTSTypeMatcher = void 0;
const tslib_1 = require("tslib");
const fs = tslib_1.__importStar(require("fs-jetpack"));
const nexus_logger_1 = require("../nexus-logger");
const log = nexus_logger_1.rootLogger.child('backingTypes');
exports.defaultTSTypeMatcher = new RegExp(`export\\s+(?:interface|type|class|enum)\\s+(\\w+)`, 'g');
function extract(filePaths) {
    const backingTypes = {};
    for (const filePath of filePaths) {
        if (!filePath) {
            continue;
        }
        const fileContent = fs.read(filePath);
        const typeNames = getMatches(fileContent, exports.defaultTSTypeMatcher, 1);
        typeNames.forEach((typeName) => {
            backingTypes[typeName] = filePath;
        });
    }
    log.trace('extracted backing types from file', { backingTypes });
    return backingTypes;
}
exports.extract = extract;
function getMatches(stringToTest, regex, index) {
    const matches = [];
    let match;
    while ((match = regex.exec(stringToTest))) {
        matches.push(match[index]);
    }
    return matches;
}
//# sourceMappingURL=extract.js.map