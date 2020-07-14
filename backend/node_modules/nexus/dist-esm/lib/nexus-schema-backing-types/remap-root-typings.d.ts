import * as NexusSchema from '@nexus/schema';
import { BackingTypes } from './types';
/**
 * Remaps the rootTypings stored in the schema to actual filePath & typeName
 * so that @nexus/schema can properly import them in its typegen file
 * eg: 'CustomType1' -> { path: __filename, name: 'CustomType1' }
 */
export declare function remapSchemaWithRootTypings(schema: NexusSchema.core.NexusGraphQLSchema, backingTypes: BackingTypes): NexusSchema.core.NexusGraphQLSchema;
//# sourceMappingURL=remap-root-typings.d.ts.map