import { Either } from 'fp-ts/lib/Either';
import * as ts from 'typescript';
export declare const NEXUS_TS_LSP_IMPORT_ID = "nexus/typescript-language-service";
export declare function readOrScaffoldTsconfig(input: {
    projectRoot: string;
    overrides?: {
        outRoot?: string;
    };
}): Promise<Either<Error, {
    content: ts.ParsedCommandLine;
    path: string;
}>>;
/**
 * Create tsconfig source contents, optimized for Nexus
 */
export declare function tsconfigTemplate(input: {
    sourceRootRelative: string;
    outRootRelative: string;
}): string;
//# sourceMappingURL=tsconfig.d.ts.map