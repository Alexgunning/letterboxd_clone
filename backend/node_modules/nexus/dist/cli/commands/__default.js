"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.__Default = void 0;
const tslib_1 = require("tslib");
const common_tags_1 = require("common-tags");
const fs = tslib_1.__importStar(require("fs-jetpack"));
const Layout = tslib_1.__importStar(require("../../lib/layout"));
const nexus_logger_1 = require("../../lib/nexus-logger");
const utils_1 = require("../../lib/utils");
const app_1 = require("./create/app");
const dev_1 = require("./dev");
const log = nexus_logger_1.rootLogger.child('cli').child('entrypoint');
class __Default {
    async parse() {
        log.trace('start');
        const projectType = await Layout.scanProjectType({ cwd: process.cwd() });
        switch (projectType.type) {
            case 'new':
                log.trace('detected CWD is empty and not within an existing nexus project, delegating to create sub-command', {
                    cwd: process.cwd(),
                });
                await app_1.run({
                    projectName: utils_1.CWDProjectNameOrGenerate(),
                });
                break;
            case 'NEXUS_project':
                log.trace('detected CWD is within a nexus project, delegating to dev mode', {
                    cwd: process.cwd(),
                });
                await new dev_1.Dev().parse([]);
                break;
            case 'node_project':
                log.trace('detected CWD is within a node but not nexus project, aborting', {
                    cwd: process.cwd(),
                });
                console.log("Looks like you are inside a node but not nexus project. Please either add nexus to this project's dependencies and re-run this command or navigate to a new empty folder that does not have a package.json file present in an ancestor directory.");
                break;
            case 'unknown':
                log.trace('detected CWD is not empty nor a nexus project, aborting');
                // We can get the user on the happy path by asking them for a project
                // name and then changing into that directory.
                const projectName = utils_1.generateProjectName();
                log.info(`creating project directory where all subsequent work will occur`, {
                    cwd: process.cwd(),
                    projectName: projectName,
                });
                await fs.dirAsync(projectName);
                process.chdir(fs.path(projectName));
                await app_1.run({
                    projectName: projectName,
                });
                // It is not possible in POSIX for a process to change its parent
                // environment. Detail:
                // https://stackoverflow.com/questions/19803748/change-working-directory-in-my-current-shell-context-when-running-node-script
                // For this reason, users coming through this code path will find
                // themselves with a project that their current shell is not within. Its
                // very likely they will not notice this. Let them know now explicitly:
                console.log();
                console.log(common_tags_1.stripIndent `
          NOTE
          ----

          Your new nexus project was created in ${projectName}. Only you can navigate into it:
          
            cd ./${projectName}
        `);
                console.log(); // space after codeblock
                break;
            case 'malformed_package_json':
                // todo test this case
                const e = projectType.error;
                log.fatal(`Failed to establish a project type. A package.json was found at ${e.context.path}. But, there was an error whlie trying to read it.`, { reason: e.context.reason });
                break;
            default:
                utils_1.casesHandled(projectType);
        }
    }
}
exports.__Default = __Default;
//# sourceMappingURL=__default.js.map