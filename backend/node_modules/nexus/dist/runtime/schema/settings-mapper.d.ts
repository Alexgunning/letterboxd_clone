/**
 * This module is concerned with mapping Nexus framework schema component settings to Nexus schema standalone component.
 */
import * as NexusSchema from '@nexus/schema';
import * as Plugin from '../../lib/plugin';
import { SettingsData } from './settings';
declare type NexusSchemaConfig = NexusSchema.core.SchemaConfig;
export declare function mapSettingsAndPluginsToNexusSchemaConfig(frameworkPlugins: Plugin.RuntimeContributions[], settings: SettingsData): NexusSchemaConfig;
export {};
//# sourceMappingURL=settings-mapper.d.ts.map