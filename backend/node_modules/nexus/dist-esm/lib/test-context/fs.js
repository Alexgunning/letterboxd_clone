import * as FS from 'fs-jetpack';
import slash from 'slash';
import { createContributor } from './compose-create';
/**
 * - Creates a temporary directory
 * - Adds `fs` to `context`, an fs-jetpack instance with its cwd set to the tmpdir
 */
export const fs = () => createContributor((ctx) => {
    const fs = FS.cwd(ctx.tmpDir);
    function path(...relativePath) {
        return slash(fs.path(...relativePath));
    }
    return {
        fs,
        path,
    };
});
//# sourceMappingURL=fs.js.map