import * as Path from 'path';
import { START_MODULE_NAME } from '../../runtime/start/start-module';
/**
 * The temporary ts build folder used when bundling is enabled
 *
 * Note: It **should not** be nested in a sub-folder. This might "corrupt" the relative paths of the bundle build.
 */
export const TMP_TS_BUILD_FOLDER_PATH_RELATIVE_TO_PROJECT_ROOT = '.tmp_build';
export const DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT = '.nexus/build';
export function getBuildLayout(buildOutput, scanResult, asBundle) {
    const tsOutputDir = getBuildOutputDir(scanResult.projectRoot, buildOutput, scanResult);
    const startModuleInPath = Path.join(scanResult.sourceRoot, START_MODULE_NAME + '.ts');
    const startModuleOutPath = Path.join(tsOutputDir, START_MODULE_NAME + '.js');
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
    const tsBuildInfo = getBuildLayout(TMP_TS_BUILD_FOLDER_PATH_RELATIVE_TO_PROJECT_ROOT, scanResult, false);
    const relativeRootDir = Path.relative(scanResult.projectRoot, scanResult.tsConfig.content.options.rootDir);
    const sourceRoot = Path.join(tsOutputDir, relativeRootDir);
    return Object.assign(Object.assign({}, tsBuildInfo), { bundleOutputDir: tsOutputDir, root: tsOutputDir, startModule: Path.join(sourceRoot, START_MODULE_NAME + '.js'), sourceRoot });
}
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
    const output = (_a = buildOutput !== null && buildOutput !== void 0 ? buildOutput : outDir) !== null && _a !== void 0 ? _a : DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT;
    if (Path.isAbsolute(output)) {
        return output;
    }
    return Path.join(projectRoot, output);
}
//# sourceMappingURL=build.js.map