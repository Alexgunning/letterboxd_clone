import * as Logger from '@nexus/logger';
import { AppState } from '../app';
import * as Schema from '../schema';
import { SchemaSettingsManager } from '../schema/settings';
import * as Server from '../server';
import { ServerSettingsManager } from '../server/settings';
declare type SettingsInput = {
    logger?: Logger.SettingsInput;
    schema?: Schema.SettingsInput;
    server?: Server.SettingsInput;
};
export declare type SettingsData = Readonly<{
    logger: Logger.SettingsData;
    schema: Schema.SettingsData;
    server: Server.SettingsData;
}>;
/**
 * todo
 */
export declare type Settings = {
    /**
     * todo
     */
    original: SettingsData;
    /**
     * todo
     */
    current: SettingsData;
    /**
     * todo
     */
    change(newSetting: SettingsInput): void;
};
/**
 * Create an app settings component.
 *
 * @remarks
 *
 * The app settings component centralizes settings management of all other
 * components. Therefore it depends on the other components. It requires their
 * settings managers.
 */
export declare function create(appState: AppState, { schemaSettings, serverSettings, log, }: {
    schemaSettings: SchemaSettingsManager;
    serverSettings: ServerSettingsManager;
    log: Logger.RootLogger;
}): {
    public: Settings;
    private: {
        reset(): void;
        assemble(): {
            settings: Readonly<{
                logger: Readonly<{
                    filter: Readonly<{
                        originalInput: string;
                        defaults: import("@nexus/logger/dist/filter").Defaults;
                        patterns: import("@nexus/logger/dist/filter").Parsed[];
                    }>;
                    pretty: Readonly<{
                        enabled: boolean;
                        color: boolean;
                        levelLabel: boolean;
                        timeDiff: boolean;
                    }>; /**
                     * todo
                     */
                    data: {
                        time: boolean;
                        pid: boolean;
                        hostname: boolean;
                    };
                    output: import("@nexus/logger/dist/output").Output;
                }>;
                schema: Schema.SettingsData;
                server: Server.SettingsData;
            }>;
        };
    };
};
export {};
//# sourceMappingURL=index.d.ts.map