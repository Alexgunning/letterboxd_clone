export declare type TmpDirDeps = {};
export declare type TmpDirContribution = {
    tmpDir: string;
};
export declare const tmpDir: (opts?: {
    prefix: string;
} | undefined) => (ctx: TmpDirDeps) => TmpDirContribution;
//# sourceMappingURL=tmp-dir.d.ts.map