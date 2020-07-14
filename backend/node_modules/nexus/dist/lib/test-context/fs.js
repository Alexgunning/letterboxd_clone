"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fs = void 0;
const tslib_1 = require("tslib");
const FS = tslib_1.__importStar(require("fs-jetpack"));
const slash_1 = tslib_1.__importDefault(require("slash"));
const compose_create_1 = require("./compose-create");
/**
 * - Creates a temporary directory
 * - Adds `fs` to `context`, an fs-jetpack instance with its cwd set to the tmpdir
 */
exports.fs = () => compose_create_1.createContributor((ctx) => {
    const fs = FS.cwd(ctx.tmpDir);
    function path(...relativePath) {
        return slash_1.default(fs.path(...relativePath));
    }
    return {
        fs,
        path,
    };
});
//# sourceMappingURL=fs.js.map