"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHelpForCommand = exports.generateHelpForCommandIndex = exports.isError = exports.arg = exports.format = void 0;
const tslib_1 = require("tslib");
const arg_1 = tslib_1.__importDefault(require("arg"));
const chalk_1 = tslib_1.__importDefault(require("chalk"));
const common_tags_1 = require("common-tags");
/**
 * format
 */
function format(input = '') {
    return common_tags_1.stripIndent(input).trimRight() + '\n';
}
exports.format = format;
/**
 * Wrap arg to return an error instead of throwing
 */
function arg(argv, spec) {
    try {
        return arg_1.default(spec, { argv, stopAtPositional: true });
    }
    catch (err) {
        return err;
    }
}
exports.arg = arg;
/**
 * Check if result is an error
 */
function isError(result) {
    return result instanceof Error;
}
exports.isError = isError;
function generateHelpForCommandIndex(commandName, subCommands) {
    const maxSubCommandNameLength = Math.max(...subCommands.map((s) => s.name.length));
    return `
${chalk_1.default.bold('Usage:')}
    
${chalk_1.default.gray('$')} nexus ${commandName} [${subCommands.map((c) => c.name).join('|')}]

${chalk_1.default.bold('Commands:')}

${subCommands.map((c) => `  ${c.name.padEnd(maxSubCommandNameLength)}  ${c.description}`).join('\n')}
  `;
}
exports.generateHelpForCommandIndex = generateHelpForCommandIndex;
function generateHelpForCommand(commandName, description, options) {
    const optionsWithHelp = [...options, { name: 'help', alias: 'h', description: 'Prompt this helper' }];
    return `
${description}

${chalk_1.default.bold('Usage:')}
    
${chalk_1.default.gray('$')} nexus ${commandName} [options]

${chalk_1.default.bold('Options:')}

${optionsWithHelp.map((c) => `  --${c.name}${c.alias ? `, -${c.alias}` : ''}   ${c.description}`).join('\n')}
  `;
}
exports.generateHelpForCommand = generateHelpForCommand;
//# sourceMappingURL=helpers.js.map