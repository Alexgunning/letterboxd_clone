"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = void 0;
class Version {
    static new() {
        return new Version();
    }
    constructor() { }
    async parse(argv) {
        const packageJson = require('../../../package.json');
        return `${packageJson.name}@${packageJson.version}`;
    }
}
exports.Version = Version;
//# sourceMappingURL=version.js.map