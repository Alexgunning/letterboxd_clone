export class Version {
    static new() {
        return new Version();
    }
    constructor() { }
    async parse(argv) {
        const packageJson = require('../../../package.json');
        return `${packageJson.name}@${packageJson.version}`;
    }
}
//# sourceMappingURL=version.js.map