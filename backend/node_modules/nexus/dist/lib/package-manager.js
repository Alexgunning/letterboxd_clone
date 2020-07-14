"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPackageManager = exports.renderAddDeps = exports.addDeps = exports.installDeps = exports.runScript = exports.runBin = exports.renderRunScript = exports.renderRunBin = exports.detectProjectPackageManager = void 0;
const tslib_1 = require("tslib");
/**
 * This module deals with abstractions around if the user's project is npm or
 * yarn based. Sometimes messages need to be written with one of these tools in
 * mind, or spawns must be executed using one of these tools. The one to use is
 * typically a reflection of what the user has chosen in their project. This
 * module provides utilities for working in code with the package managers in an
 * agnostic way.
 */
const fs = tslib_1.__importStar(require("fs-jetpack"));
const Path = tslib_1.__importStar(require("path"));
const proc = tslib_1.__importStar(require("./process"));
const YARN_LOCK_FILE_NAME = 'yarn.lock';
const NPM_LOCK_FILE_NAME = 'package-lock.json';
/**
 * Detect if the project is yarn or npm based. Detection is based on useragent,
 * if present, then the lockfile present. If nothing is found, npm is assumed.
 */
async function detectProjectPackageManager(opts) {
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
exports.detectProjectPackageManager = detectProjectPackageManager;
/**
 * Render the running of the given command as coming from the local bin.
 */
function renderRunBin(pmt, commandString) {
    return pmt === 'npm' ? `npx ${commandString}` : `yarn -s ${commandString}`;
}
exports.renderRunBin = renderRunBin;
/**
 * Render running of the given script defined in package.json.
 */
function renderRunScript(pmt, scriptName) {
    return pmt === 'npm' ? `npm run -s ${scriptName}` : `yarn -s ${scriptName}`;
}
exports.renderRunScript = renderRunScript;
/**
 * Run a command from the local project bin.
 */
function runBin(pmt, commandString, options) {
    const packageManagerRunCommand = renderRunBin(pmt, commandString);
    return proc.run(packageManagerRunCommand, options);
}
exports.runBin = runBin;
/**
 * Run a script defined in the local project package.json.
 */
function runScript(pmt, scriptName, options) {
    const packageManagerRunScript = renderRunScript(pmt, scriptName);
    return proc.run(packageManagerRunScript, options);
}
exports.runScript = runScript;
/**
 * Run package installation.
 */
function installDeps(pmt, options) {
    return pmt === 'npm' ? proc.run('npm install', options) : proc.run('yarn install', options);
}
exports.installDeps = installDeps;
/**
 * Add a package to the project.
 */
function addDeps(pmt, packages, options) {
    return proc.run(renderAddDeps(pmt, packages, { dev: options === null || options === void 0 ? void 0 : options.dev }), options);
}
exports.addDeps = addDeps;
/**
 * Add a package to the project.
 */
function renderAddDeps(pmt, packages, options) {
    var _a;
    const dev = (_a = options === null || options === void 0 ? void 0 : options.dev) !== null && _a !== void 0 ? _a : false;
    return pmt === 'npm'
        ? `npm install ${dev ? '--save-dev ' : ''}${packages.join(' ')}`
        : `yarn add ${dev ? '--dev ' : ''}${packages.join(' ')}`;
}
exports.renderAddDeps = renderAddDeps;
function createPackageManager(packageManagerType, opts) {
    return packageManagerType === undefined
        ? detectProjectPackageManager(opts).then(createDo)
        : createDo(packageManagerType);
}
exports.createPackageManager = createPackageManager;
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