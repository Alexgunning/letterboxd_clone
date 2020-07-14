import { Command, CommandsLayout } from './types';
/**
 * CLI command
 */
export declare class CLI implements Command {
    private readonly cmds;
    constructor(cmds: CommandsLayout);
    parse(argv: string[]): Promise<any>;
    private help;
    private static help;
}
//# sourceMappingURL=cli.d.ts.map