import * as FS from 'fs-jetpack';
import * as Path from 'path';
import { hardWriteFileSync } from '../fs';
import { rootLogger } from '../nexus-logger';
const log = rootLogger.child('backingTypes');
export const DEFAULT_RELATIVE_BACKING_TYPES_TYPEGEN_PATH = Path.join('node_modules', '@types', 'typegen-nexus-backing-types', 'index.d.ts');
export async function write(backingTypes, opts) {
    var _a;
    const typeNames = Object.keys(backingTypes);
    let output = '';
    if (typeNames.length === 0) {
        output = `export type BackingTypes = 'No backing types found. Make sure you have some types exported'\n`;
    }
    else {
        output = `\
 export type BackingTypes =
${typeNames.map((t) => `  | '${t}'`).join('\n')}
`;
    }
    output += `\
declare global {
  export interface NexusBackingTypes {
    types: BackingTypes
  }
}
`;
    const localFS = FS.cwd((_a = opts === null || opts === void 0 ? void 0 : opts.cwd) !== null && _a !== void 0 ? _a : process.cwd());
    const outputPath = localFS.path(DEFAULT_RELATIVE_BACKING_TYPES_TYPEGEN_PATH);
    log.trace('writing backing-types typegen', { outputPath });
    hardWriteFileSync(outputPath, output);
}
//# sourceMappingURL=write.js.map