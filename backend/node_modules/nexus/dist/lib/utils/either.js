"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rightOrFatal = exports.leftOrThrow = exports.rightOrThrow = exports.getRight = exports.getLeft = void 0;
const Either_1 = require("fp-ts/lib/Either");
const util_1 = require("util");
const process_1 = require("../process");
/**
 * Extract the left value from an Either.
 */
function getLeft(e) {
    if (Either_1.isLeft(e))
        return e.left;
    return undefined;
}
exports.getLeft = getLeft;
/**
 * Extract the right value from an Either.
 */
function getRight(e) {
    if (Either_1.isRight(e))
        return e.right;
    return undefined;
}
exports.getRight = getRight;
/**
 * Extract the right value from an Either or throw.
 */
function rightOrThrow(x) {
    if (Either_1.isLeft(x))
        throw x.left;
    return x.right;
}
exports.rightOrThrow = rightOrThrow;
/**
 * Extract the left value from an Either or throw.
 */
function leftOrThrow(x) {
    if (Either_1.isLeft(x))
        return x.left;
    throw new Error(`Unexpected Either.right:\n${util_1.inspect(x.right)}`);
}
exports.leftOrThrow = leftOrThrow;
/**
 * Extract the right value from an Either or throw.
 */
function rightOrFatal(x) {
    if (Either_1.isLeft(x))
        process_1.fatal(x.left);
    return x.right;
}
exports.rightOrFatal = rightOrFatal;
//# sourceMappingURL=either.js.map