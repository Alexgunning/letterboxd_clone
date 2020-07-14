"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.findRecurisvelyUpwardSync = void 0;
const tslib_1 = require("tslib");
const Either_1 = require("fp-ts/lib/Either");
const FS = tslib_1.__importStar(require("fs-jetpack"));
const lodash_1 = require("lodash");
const parse_json_1 = tslib_1.__importDefault(require("parse-json"));
const Path = tslib_1.__importStar(require("path"));
const fs_1 = require("./fs");
const utils_1 = require("./utils");
const malformedPackageJson = utils_1.exceptionType('MalformedPackageJson', (c) => `package.json at ${c.path} was malformed\n\n${c.reason}`);
/**
 * Find the package.json file path. Looks recursively upward to disk root.
 * Starts looking in CWD If no package.json found along search, returns null.
 * If packge.json fonud but fails to be parsed or fails validation than an error is returned.
 */
function findRecurisvelyUpwardSync(opts) {
    let found = null;
    let currentDir = opts.cwd;
    const localFS = FS.cwd(currentDir);
    while (true) {
        const filePath = Path.join(currentDir, 'package.json');
        const rawContents = localFS.read(filePath);
        if (rawContents) {
            const content = parse(rawContents, filePath);
            found = { dir: currentDir, path: filePath, content };
            break;
        }
        if (fs_1.isRootPath(currentDir)) {
            break;
        }
        currentDir = Path.join(currentDir, '..');
    }
    return found;
}
exports.findRecurisvelyUpwardSync = findRecurisvelyUpwardSync;
/**
 * Parse package.json contents.
 */
function parse(contents, path) {
    const errRawData = Either_1.tryCatch(() => parse_json_1.default(contents, path), (e) => malformedPackageJson({ path, reason: Either_1.toError(e).message }));
    if (Either_1.isLeft(errRawData))
        return errRawData;
    const rawData = errRawData.right;
    if (!lodash_1.isPlainObject(rawData))
        return Either_1.left(malformedPackageJson({ path, reason: 'Package.json data is not an object' }));
    if (!lodash_1.isString(rawData.name))
        return Either_1.left(malformedPackageJson({ path, reason: 'Package.json name field is not a string' }));
    if (lodash_1.isEmpty(rawData.name))
        return Either_1.left(malformedPackageJson({ path, reason: 'Package.json name field is empty' }));
    if (!lodash_1.isString(rawData.version))
        return Either_1.left(malformedPackageJson({ path, reason: 'Package.json version field is not a string' }));
    if (lodash_1.isEmpty(rawData.version))
        return Either_1.left(malformedPackageJson({ path, reason: 'Package.json version field is empty' }));
    return Either_1.right(rawData);
}
exports.parse = parse;
//# sourceMappingURL=package-json.js.map