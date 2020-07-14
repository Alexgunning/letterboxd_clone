import * as fs from 'fs-jetpack';
import * as Path from 'path';
export function writeFSSpec(cwd, spec) {
    Object.entries(spec).forEach(([fileOrDirName, fileContentOrDir]) => {
        const fileOrDirPath = Path.join(cwd, fileOrDirName);
        if (typeof fileContentOrDir === 'string') {
            fs.write(fileOrDirPath, fileContentOrDir);
        }
        else {
            if (Object.keys(fileContentOrDir).length === 0) {
                fs.dir(fileOrDirPath);
            }
            writeFSSpec(fileOrDirPath, fileContentOrDir);
        }
    });
}
//# sourceMappingURL=testing-utils.js.map