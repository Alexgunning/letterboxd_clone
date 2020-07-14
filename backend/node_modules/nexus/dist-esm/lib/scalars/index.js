import { DateTimeResolver, JSONObjectResolver } from 'graphql-scalars';
import { GraphQLScalarType } from 'graphql';
export const builtinScalars = {
    DateTime: DateTimeResolver,
    Json: new GraphQLScalarType(Object.assign(Object.assign({}, JSONObjectResolver), { name: 'Json', description: 'The `JSON` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).' })),
};
//# sourceMappingURL=index.js.map