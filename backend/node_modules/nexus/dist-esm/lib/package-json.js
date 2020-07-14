import { isLeft, left, right, toError, tryCatch } from 'fp-ts/lib/Either';
import * as FS from 'fs-jetpack';
import { isEmpty, isPlainObject, isString } from 'lodash';
import parseJson from 'parse-json';
import * as Path from 'path';
import { isRootPath } from './fs';
import { exceptionType } from './utils';
const malformedPackageJson = exceptionType('MalformedPackageJson', (c) => `package.json at ${c.path} was malformed\n\n${c.reason}`);
/**
 * Find the package.json file path. Looks recursively upward to disk root.
 * Starts looking in CWD If no package.json found along search, returns null.
 * If packge.json fonud but fails to be parsed or fails validation than an error is returned.
 */
export function findRecurisvelyUpwardSync(opts) {
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
        if (isRootPath(currentDir)) {
            break;
        }
        currentDir = Path.join(currentDir, '..');
    }
    return found;
}
/**
 * Parse package.json contents.
 */
export function parse(contents, path) {
    const errRawData = tryCatch(() => parseJson(contents, path), (e) => malformedPackageJson({ path, reason: toError(e).message }));
    if (isLeft(errRawData))
        return errRawData;
    const rawData = errRawData.right;
    if (!isPlainObject(rawData))
        return left(malformedPackageJson({ path, reason: 'Package.json data is not an object' }));
    if (!isString(rawData.name))
        return left(malformedPackageJson({ path, reason: 'Package.json name field is not a string' }));
    if (isEmpty(rawData.name))
        return left(malformedPackageJson({ path, reason: 'Package.json name field is empty' }));
    if (!isString(rawData.version))
        return left(malformedPackageJson({ path, reason: 'Package.json version field is not a string' }));
    if (isEmpty(rawData.version))
        return left(malformedPackageJson({ path, reason: 'Package.json version field is empty' }));
    return right(rawData);
}
//# sourceMappingURL=package-json.js.map