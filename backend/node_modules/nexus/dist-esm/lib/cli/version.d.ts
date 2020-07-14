import { Command } from './types';
export declare class Version implements Command {
    static new(): Version;
    private constructor();
    parse(argv: string[]): Promise<string>;
}
//# sourceMappingURL=version.d.ts.map