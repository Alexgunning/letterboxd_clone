"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forbiddenUnionTypeError = void 0;
const utils_1 = require("../utils");
exports.forbiddenUnionTypeError = utils_1.exceptionType('ForbiddenUnionType', () => `Error in schema.addToContext: Top-level union types that are not composed entirely of interfaces, object literals, or type aliases that refers to object literals are not supported.`);
//# sourceMappingURL=errors.js.map