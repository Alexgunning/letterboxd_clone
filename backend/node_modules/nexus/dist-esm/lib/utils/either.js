import { isLeft, isRight } from 'fp-ts/lib/Either';
import { inspect } from 'util';
import { fatal } from '../process';
/**
 * Extract the left value from an Either.
 */
export function getLeft(e) {
    if (isLeft(e))
        return e.left;
    return undefined;
}
/**
 * Extract the right value from an Either.
 */
export function getRight(e) {
    if (isRight(e))
        return e.right;
    return undefined;
}
/**
 * Extract the right value from an Either or throw.
 */
export function rightOrThrow(x) {
    if (isLeft(x))
        throw x.left;
    return x.right;
}
/**
 * Extract the left value from an Either or throw.
 */
export function leftOrThrow(x) {
    if (isLeft(x))
        return x.left;
    throw new Error(`Unexpected Either.right:\n${inspect(x.right)}`);
}
/**
 * Extract the right value from an Either or throw.
 */
export function rightOrFatal(x) {
    if (isLeft(x))
        fatal(x.left);
    return x.right;
}
//# sourceMappingURL=either.js.map