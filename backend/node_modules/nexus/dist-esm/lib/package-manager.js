/**
 * This module deals with abstractions around if the user's project is npm or
 * yarn based. Sometimes messages need to be written with one of these tools in
 * mind, or spawns must be executed using one of these tools. The one to use is
 * typically a reflection of what the user has chosen in their project. This
 * module provides utilities for working in code with the package managers in an
 * agnostic way.
 */
import * as fs from 'fs-jetpack';
import * as Path from 'path';
import * as proc from './process';
const YARN_LOCK_FILE_NAME = 'yarn.lock';
const NPM_LOCK_FILE_NAME = 'package-lock.json';
/**
 * Detect if the project is yarn or npm based. Detection is based on useragent,
 * if present, then the lockfile present. If nothing is found, npm is assumed.
 */
export async function detectProjectPackageManager(opts) {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent) {
        // example: 'yarn/1.22.4 npm/? node/v13.11.0 darwin x64'
        const manager = userAgent.match(/(yarn|npm)(?=\/\d+\.?)+/);
        if (manager && (manager[0] === 'yarn' || manager[0] === 'npm')) {
            return manager[0];
        }
    }
    const packageManagerFound = await Promise.race([
        fs
            .existsAsync(Path.join(opts.projectRoot, YARN_LOCK_FILE_NAME))
            .then((result) => (result === 'file' ? 'yarn' : null)),
        fs
            .existsAsync(Path.join(opts.projectRoot, NPM_LOCK_FILE_NAME))
            .then((result) => (result === 'file' ? 'npm' : null)),
    ]);
    return packageManagerFound === null ? 'npm' : packageManagerFound;
}
/**
 * Render the running of the given command as coming from the local bin.
 */
export function renderRunBin(pmt, commandString) {
    return pmt === 'npm' ? `npx ${commandString}` : `yarn -s ${commandString}`;
}
/**
 * Render running of the given script defined in package.json.
 */
export function renderRunScript(pmt, scriptName) {
    return pmt === 'npm' ? `npm run -s ${scriptName}` : `yarn -s ${scriptName}`;
}
/**
 * Run a command from the local project bin.
 */
export function runBin(pmt, commandString, options) {
    const packageManagerRunCommand = renderRunBin(pmt, commandString);
    return proc.run(packageManagerRunCommand, options);
}
/**
 * Run a script defined in the local project package.json.
 */
export function runScript(pmt, scriptName, options) {
    const packageManagerRunScript = renderRunScript(pmt, scriptName);
    return proc.run(packageManagerRunScript, options);
}
/**
 * Run package installation.
 */
export function installDeps(pmt, options) {
    return pmt === 'npm' ? proc.run('npm install', options) : proc.run('yarn install', options);
}
/**
 * Add a package to the project.
 */
export function addDeps(pmt, packages, options) {
    return proc.run(renderAddDeps(pmt, packages, { dev: options === null || options === void 0 ? void 0 : options.dev }), options);
}
/**
 * Add a package to the project.
 */
export function renderAddDeps(pmt, packages, options) {
    var _a;
    const dev = (_a = options === null || options === void 0 ? void 0 : options.dev) !== null && _a !== void 0 ? _a : false;
    return pmt === 'npm'
        ? `npm install ${dev ? '--save-dev ' : ''}${packages.join(' ')}`
        : `yarn add ${dev ? '--dev ' : ''}${packages.join(' ')}`;
}
export function createPackageManager(packageManagerType, opts) {
    return packageManagerType === undefined
        ? detectProjectPackageManager(opts).then(createDo)
        : createDo(packageManagerType);
}
function createDo(pmt) {
    return {
        type: pmt,
        renderRunBin: renderRunBin.bind(null, pmt),
        renderRunScript: renderRunScript.bind(null, pmt),
        renderAddDeps: renderAddDeps.bind(null, pmt),
        runBin: runBin.bind(null, pmt),
        runScript: runScript.bind(null, pmt),
        installDeps: installDeps.bind(null, pmt),
        addDeps: addDeps.bind(null, pmt),
    };
}
//# sourceMappingURL=package-manager.js.map