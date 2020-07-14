import { Command } from '../../../lib/cli';
export default class App implements Command {
    parse(): Promise<void>;
}
interface ConfigInput {
    projectName: string;
}
/**
 * TODO
 */
export declare function run(configInput?: Partial<ConfigInput>): Promise<void>;
/**
 * TODO
 */
export declare function runLocalHandOff(): Promise<void>;
/**
 * TODO
 */
export declare function runBootstrapper(configInput?: Partial<ConfigInput>): Promise<void>;
export declare type Database = 'SQLite' | 'PostgreSQL' | 'MySQL';
export {};
//# sourceMappingURL=app.d.ts.map