import * as NexusSchema from '@nexus/schema';
import * as Schema from '../../runtime/schema';
import * as Layout from '../layout';
import * as Plugin from '../plugin';
interface GenerateArtifactsParams {
    graphqlSchema: NexusSchema.core.NexusGraphQLSchema;
    schemaSettings: Schema.SettingsData;
    layout: Layout.Layout;
    plugins: Plugin.RuntimeContributions[];
}
export declare function generateArtifacts(params: GenerateArtifactsParams): Promise<void>;
export {};
//# sourceMappingURL=typegen.d.ts.map