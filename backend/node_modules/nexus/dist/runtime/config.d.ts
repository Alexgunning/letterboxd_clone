import { LiteralUnion } from 'type-fest';
declare type StageNames = LiteralUnion<'development' | 'production', string>;
export interface Config {
    environments: {
        development?: EnvironmentWithSecretLoader;
        production?: EnvironmentWithSecretLoader;
        [x: string]: EnvironmentWithSecretLoader | undefined;
    };
    environment_mapping?: Record<string, string>;
}
export interface LoadedConfig {
    environment?: Environment;
    environment_mapping?: Record<string, string>;
}
declare type EnvironmentWithSecretLoader = ((load: SecretLoader) => Environment | undefined) | Environment | undefined;
interface Environment {
    NEXUS_DATABASE_URL?: string;
    [env_key: string]: string | undefined;
}
export declare const DATABASE_URL_ENV_NAME = "NEXUS_DATABASE_URL";
export declare function readConfig(): Config | null;
export declare function loadConfig(inputStage: StageNames | undefined): LoadedConfig | null;
export declare function processConfig(loadedConfig: LoadedConfig, stage: StageNames | undefined): void;
export declare function loadAndProcessConfig(inputStage: StageNames | undefined): LoadedConfig | null;
export declare function printStaticEnvSetters(config: LoadedConfig, stage: StageNames): string;
declare type SecretLoader = {
    secret: (secretName: string) => string | undefined;
    secrets: (...secretNames: string[]) => Environment | undefined;
};
export declare function loadEnvironmentFromConfig(inputStage: string | undefined): Environment | null;
/**
 * Helper method to configure nexus. **Must be default exported in a `nexus.config.ts` file**
 *
 * @example
 *
 * export default createConfig({
 *   environments: {
 *     development: {
 *       NEXUS_DATABASE_URL: "<database_connection_url>"
 *     }
 *   }
 * })
 */
export declare function createConfig(config: Config): Config;
export {};
//# sourceMappingURL=config.d.ts.map