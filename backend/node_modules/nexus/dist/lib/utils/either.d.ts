import { Either } from 'fp-ts/lib/Either';
/**
 * Extract the left value from an Either.
 */
export declare function getLeft<A, B>(e: Either<A, B>): A | undefined;
/**
 * Extract the right value from an Either.
 */
export declare function getRight<A, B>(e: Either<A, B>): B | undefined;
/**
 * Extract the right value from an Either or throw.
 */
export declare function rightOrThrow<A extends Error, B>(x: Either<A, B>): B;
/**
 * Extract the left value from an Either or throw.
 */
export declare function leftOrThrow<A, B>(x: Either<A, B>): A;
/**
 * Extract the right value from an Either or throw.
 */
export declare function rightOrFatal<A extends Error, B>(x: Either<A, B>): B;
//# sourceMappingURL=either.d.ts.map