import { exceptionType } from '../utils';
export const forbiddenUnionTypeError = exceptionType('ForbiddenUnionType', () => `Error in schema.addToContext: Top-level union types that are not composed entirely of interfaces, object literals, or type aliases that refers to object literals are not supported.`);
//# sourceMappingURL=errors.js.map