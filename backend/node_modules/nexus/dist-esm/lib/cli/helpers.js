import Arg from 'arg';
import chalk from 'chalk';
import { stripIndent } from 'common-tags';
/**
 * format
 */
export function format(input = '') {
    return stripIndent(input).trimRight() + '\n';
}
/**
 * Wrap arg to return an error instead of throwing
 */
export function arg(argv, spec) {
    try {
        return Arg(spec, { argv, stopAtPositional: true });
    }
    catch (err) {
        return err;
    }
}
/**
 * Check if result is an error
 */
export function isError(result) {
    return result instanceof Error;
}
export function generateHelpForCommandIndex(commandName, subCommands) {
    const maxSubCommandNameLength = Math.max(...subCommands.map((s) => s.name.length));
    return `
${chalk.bold('Usage:')}
    
${chalk.gray('$')} nexus ${commandName} [${subCommands.map((c) => c.name).join('|')}]

${chalk.bold('Commands:')}

${subCommands.map((c) => `  ${c.name.padEnd(maxSubCommandNameLength)}  ${c.description}`).join('\n')}
  `;
}
export function generateHelpForCommand(commandName, description, options) {
    const optionsWithHelp = [...options, { name: 'help', alias: 'h', description: 'Prompt this helper' }];
    return `
${description}

${chalk.bold('Usage:')}
    
${chalk.gray('$')} nexus ${commandName} [options]

${chalk.bold('Options:')}

${optionsWithHelp.map((c) => `  --${c.name}${c.alias ? `, -${c.alias}` : ''}   ${c.description}`).join('\n')}
  `;
}
//# sourceMappingURL=helpers.js.map