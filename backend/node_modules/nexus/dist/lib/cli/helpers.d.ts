import Arg from 'arg';
/**
 * format
 */
export declare function format(input?: string): string;
/**
 * Wrap arg to return an error instead of throwing
 */
export declare function arg<T extends Arg.Spec>(argv: string[], spec: T): Arg.Result<T> | Error;
/**
 * Check if result is an error
 */
export declare function isError(result: any): result is Error;
export declare function generateHelpForCommandIndex(commandName: string, subCommands: {
    name: string;
    description: string;
}[]): string;
export declare function generateHelpForCommand(commandName: string, description: string, options: {
    name: string;
    alias?: string;
    description: string;
}[]): string;
//# sourceMappingURL=helpers.d.ts.map