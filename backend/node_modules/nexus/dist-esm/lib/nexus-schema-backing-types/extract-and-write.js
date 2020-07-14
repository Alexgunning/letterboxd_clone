import { extract } from './extract';
import { find } from './find';
import { write } from './write';
export async function generateBackingTypesArtifacts(filePattern, opts) {
    const backingTypesFiles = await find(filePattern, { cwd: opts === null || opts === void 0 ? void 0 : opts.extractCwd });
    const backingTypes = await extract(backingTypesFiles);
    // Write in background
    await write(backingTypes, { cwd: opts === null || opts === void 0 ? void 0 : opts.writeCwd });
    return backingTypes;
}
//# sourceMappingURL=extract-and-write.js.map