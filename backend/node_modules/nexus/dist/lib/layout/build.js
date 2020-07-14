"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBuildLayout = exports.DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT = exports.TMP_TS_BUILD_FOLDER_PATH_RELATIVE_TO_PROJECT_ROOT = void 0;
const tslib_1 = require("tslib");
const Path = tslib_1.__importStar(require("path"));
const start_module_1 = require("../../runtime/start/start-module");
/**
 * The temporary ts build folder used when bundling is enabled
 *
 * Note: It **should not** be nested in a sub-folder. This might "corrupt" the relative paths of the bundle build.
 */
exports.TMP_TS_BUILD_FOLDER_PATH_RELATIVE_TO_PROJECT_ROOT = '.tmp_build';
exports.DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT = '.nexus/build';
function getBuildLayout(buildOutput, scanResult, asBundle) {
    const tsOutputDir = getBuildOutputDir(scanResult.projectRoot, buildOutput, scanResult);
    const startModuleInPath = Path.join(scanResult.sourceRoot, start_module_1.START_MODULE_NAME + '.ts');
    const startModuleOutPath = Path.join(tsOutputDir, start_module_1.START_MODULE_NAME + '.js');
    if (!asBundle) {
        return {
            tsOutputDir,
            startModuleInPath,
            startModuleOutPath,
            bundleOutputDir: null,
            startModule: startModuleOutPath,
            root: tsOutputDir,
            sourceRoot: tsOutputDir,
        };
    }
    const tsBuildInfo = getBuildLayout(exports.TMP_TS_BUILD_FOLDER_PATH_RELATIVE_TO_PROJECT_ROOT, scanResult, false);
    const relativeRootDir = Path.relative(scanResult.projectRoot, scanResult.tsConfig.content.options.rootDir);
    const sourceRoot = Path.join(tsOutputDir, relativeRootDir);
    return Object.assign(Object.assign({}, tsBuildInfo), { bundleOutputDir: tsOutputDir, root: tsOutputDir, startModule: Path.join(sourceRoot, start_module_1.START_MODULE_NAME + '.js'), sourceRoot });
}
exports.getBuildLayout = getBuildLayout;
/**
 * Get the absolute build output dir
 * Precedence: User's input > tsconfig.json's outDir > default
 */
function getBuildOutputDir(projectRoot, buildOutput, scanResult) {
    var _a;
    // todo normalize because ts in windows is like "C:/.../.../" instead of "C:\...\..." ... why???
    const outDir = scanResult.tsConfig.content.options.outDir
        ? Path.normalize(scanResult.tsConfig.content.options.outDir)
        : undefined;
    const output = (_a = buildOutput !== null && buildOutput !== void 0 ? buildOutput : outDir) !== null && _a !== void 0 ? _a : exports.DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT;
    if (Path.isAbsolute(output)) {
        return output;
    }
    return Path.join(projectRoot, output);
}
//# sourceMappingURL=build.js.map