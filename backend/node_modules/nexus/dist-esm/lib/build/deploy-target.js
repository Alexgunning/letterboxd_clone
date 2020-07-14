import chalk from 'chalk';
import { stripIndent } from 'common-tags';
import * as fs from 'fs-jetpack';
import * as Path from 'path';
import { DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT } from '../../lib/layout';
import { findFileRecurisvelyUpwardSync } from '../fs';
import { rootLogger } from '../nexus-logger';
import { fatal } from '../process';
import { prettyImportPath } from '../utils';
const log = rootLogger.child('build');
/**
 * If you add a new deploy target, please start by adding a new item to the `SUPPORTED_DEPLOY_TARGETS`
 */
const SUPPORTED_DEPLOY_TARGETS = ['vercel', 'heroku'];
export const formattedSupportedDeployTargets = SUPPORTED_DEPLOY_TARGETS.map((t) => `"${t}"`).join(', ');
/**
 * Take user input of a deploy target, validate it, and parse it into a
 * normalized form.
 */
export function normalizeTarget(inputDeployTarget) {
    if (!inputDeployTarget) {
        return null;
    }
    const deployTarget = inputDeployTarget.toLowerCase();
    if (!SUPPORTED_DEPLOY_TARGETS.includes(deployTarget)) {
        fatal(`--deployment \`${deployTarget}\` is not supported by nexus. Supported deployment targets: ${formattedSupportedDeployTargets}}`);
    }
    return deployTarget;
}
const TARGET_TO_BUILD_OUTPUT = {
    vercel: 'dist',
    heroku: DEFAULT_BUILD_DIR_PATH_RELATIVE_TO_PROJECT_ROOT,
};
export function computeBuildOutputFromTarget(target) {
    if (!target) {
        return null;
    }
    return TARGET_TO_BUILD_OUTPUT[target];
}
const TARGET_VALIDATORS = {
    vercel: validateVercel,
    heroku: validateHeroku,
};
export function validateTarget(target, layout) {
    const validator = TARGET_VALIDATORS[target];
    return validator(layout);
}
/**
 * Validate the user's vercel configuration file.
 */
function validateVercel(layout) {
    var _a, _b, _c;
    const maybeVercelJson = findFileRecurisvelyUpwardSync('vercel.json', { cwd: layout.projectRoot });
    let isValid = true;
    // Make sure there's a vercel.json file
    if (!maybeVercelJson) {
        log.trace('creating vercel.json because none exists yet');
        // todo unused, what was it for?
        const projectName = (_b = (_a = layout.packageJson) === null || _a === void 0 ? void 0 : _a.content.name) !== null && _b !== void 0 ? _b : 'now_rename_me';
        const vercelJsonContent = stripIndent `
      {
        "version": 2,
        "builds": [
          {
            "src": "${layout.build.startModule}",
            "use": "@now/node"
          }
        ],
        "routes": [{ "src": "/.*", "dest": "${layout.build.startModule}" }]
      }
    `;
        const vercelJsonPath = Path.join(layout.projectRoot, 'vercel.json');
        fs.write(vercelJsonPath, vercelJsonContent);
        log.warn(`No \`vercel.json\` file were found. We scaffolded one for you in ${vercelJsonPath}`);
    }
    else {
        const vercelJson = fs.read(maybeVercelJson.path, 'json');
        // Make sure the vercel.json file has the right `builds` values
        if (!vercelJson.builds ||
            !vercelJson.builds.find((build) => Path.join(maybeVercelJson.dir, build.src) === layout.build.startModule && build.use === '@now/node')) {
            log.error(`We could not find a proper builder in your \`vercel.json\` file`);
            log.error(`Found: "builds": ${JSON.stringify(vercelJson.builds)}`);
            log.error(`Expected: "builds": [{ src: "${layout.build.startModule}", use: '@now/node' }, ...]`);
            console.log('\n');
            isValid = false;
        }
        // Make sure the vercel.json file has a `routes` property
        if (!vercelJson.routes) {
            log.error(`We could not find a \`routes\` property in your \`vercel.json\` file.`);
            log.error(`Expected: "routes": [{ "src": "/.*", "dest": "${layout.build.startModule}" }]`);
            console.log('\n');
            isValid = false;
        }
        // Make sure the vercel.json file has the right `routes` values
        if (!((_c = vercelJson.routes) === null || _c === void 0 ? void 0 : _c.find((route) => Path.join(maybeVercelJson.dir, route.dest) === layout.build.startModule))) {
            log.error(`We could not find a route property that redirects to your api in your \`vercel.json\` file.`);
            log.error(`Found: "routes": ${JSON.stringify(vercelJson.routes)}`);
            log.error(`Expected: "routes": [{ src: '/.*', dest: "${layout.build.startModule}" }, ...]`);
            console.log('\n');
            isValid = false;
        }
    }
    return { valid: isValid };
}
function validateHeroku(layout) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    const nodeMajorVersion = Number(process.versions.node.split('.')[0]);
    let isValid = true;
    // Make sure there's a package.json file
    if (!layout.packageJson) {
        log.error('We could not find a `package.json` file.');
        console.log();
        isValid = false;
    }
    else {
        // Make sure there's an engine: { node: <version> } property set
        // TODO: scaffold the `engines` property automatically
        if (!((_a = layout.packageJson.content.engines) === null || _a === void 0 ? void 0 : _a.node)) {
            log.error('An `engines` property is needed in your `package.json` file.');
            log.error(`Please add the following to your \`package.json\` file: "engines": { "node": "${nodeMajorVersion}.x" }`);
            console.log();
            isValid = false;
        }
        const pcfg = layout.packageJson.content;
        // Warn if version used by heroku is different than local one
        if ((_b = pcfg.engines) === null || _b === void 0 ? void 0 : _b.node) {
            const packageJsonNodeVersion = Number(pcfg.engines.node.split('.')[0]);
            if (packageJsonNodeVersion !== nodeMajorVersion) {
                log.warn(`Your local node version is different than the one that will be used by heroku (defined in your \`package.json\` file in the "engines" property).`);
                log.warn(`Local version: ${nodeMajorVersion}. Heroku version: ${packageJsonNodeVersion}`);
                console.log();
            }
        }
        // Make sure there's a build script
        if (!((_c = pcfg.scripts) === null || _c === void 0 ? void 0 : _c.build)) {
            log.error('A `build` script is needed in your `package.json` file.');
            log.error(`Please add the following to your \`package.json\` file: "scripts": { "build": "nexus build -d heroku" }`);
            console.log();
            isValid = false;
        }
        // Make sure the build script is using nexus build
        if (((_d = pcfg.scripts) === null || _d === void 0 ? void 0 : _d.build) && !pcfg.scripts.build.includes('nexus build')) {
            log.error('Please make sure your `build` script in your `package.json` file runs the command `nexus build -d heroku`');
            console.log();
            isValid = false;
        }
        const startModuleRelative = prettyImportPath(layout.projectRelative(layout.build.startModule));
        // Make sure there's a start script
        if (!((_e = pcfg.scripts) === null || _e === void 0 ? void 0 : _e.start)) {
            log.error(`Please add the following to your \`package.json\` file: "scripts": { "start": "node ${startModuleRelative}" }`);
            console.log();
            isValid = false;
        }
        // Make sure the start script starts the built server
        const startPattern = new RegExp(`^.*node +${startModuleRelative.replace('.', '\\.')}(?: +.*)?$`);
        if (!((_g = (_f = pcfg.scripts) === null || _f === void 0 ? void 0 : _f.start) === null || _g === void 0 ? void 0 : _g.match(startPattern))) {
            log.error(`Please make sure your ${chalk.bold(`\`start\``)} script points to your built server`);
            log.error(`Found: ${chalk.red((_j = (_h = pcfg.scripts) === null || _h === void 0 ? void 0 : _h.start) !== null && _j !== void 0 ? _j : '<empty>')}`);
            log.error(`Expected a pattern conforming to ${chalk.yellow(startPattern)}`);
            log.error(`For example: ${chalk.green(`node ${startModuleRelative}`)}`);
            console.log();
            isValid = false;
        }
    }
    return { valid: isValid };
}
const TARGET_TO_POST_BUILD_MESSAGE = {
    vercel: `Please run \`vercel\` or \`vc\` to deploy your nexus server. Your endpoint will be available at http://<id>.now.sh/graphql`,
    heroku: `\
Please run the following commands to deploy to heroku:

$ heroku login
${chalk.gray(`\
Enter your Heroku credentials.
...`)}

$ heroku create
${chalk.gray(`\
Creating arcane-lowlands-8408... done, stack is cedar
http://arcane-lowlands-8408.herokuapp.com/ | git@heroku.com:arcane-lowlands-8408.git'
Git remote heroku added`)}

$ git push heroku master
${chalk.gray(`\
...
-----> Node.js app detected
...
-----> Launching... done
       http://arcane-lowlands-8408.herokuapp.com deployed to Heroku`)}
`,
};
export function logTargetPostBuildMessage(target) {
    log.info(TARGET_TO_POST_BUILD_MESSAGE[target]);
}
//# sourceMappingURL=deploy-target.js.map