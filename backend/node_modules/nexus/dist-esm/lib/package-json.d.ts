import { Either } from 'fp-ts/lib/Either';
import * as TypeFest from 'type-fest';
export declare type ValidPackageJson = TypeFest.PackageJson & {
    name: string;
    version: string;
};
declare const malformedPackageJson: (ctx: {
    path: string;
    reason: string;
}) => import("./utils").BaseException<"MalformedPackageJson", {
    path: string;
    reason: string;
}>;
export declare type MalformedPackageJsonError = ReturnType<typeof malformedPackageJson>;
export declare type Result = {
    path: string;
    dir: string;
    content: Either<MalformedPackageJsonError, ValidPackageJson>;
} | null;
/**
 * Find the package.json file path. Looks recursively upward to disk root.
 * Starts looking in CWD If no package.json found along search, returns null.
 * If packge.json fonud but fails to be parsed or fails validation than an error is returned.
 */
export declare function findRecurisvelyUpwardSync(opts: {
    cwd: string;
}): Result;
/**
 * Parse package.json contents.
 */
export declare function parse(contents: string, path: string): Either<import("./utils").BaseException<"MalformedPackageJson", {
    path: string;
    reason: string;
}>, ValidPackageJson>;
export {};
//# sourceMappingURL=package-json.d.ts.map