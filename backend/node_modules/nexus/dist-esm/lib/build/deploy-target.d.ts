import { Layout } from '../../lib/layout';
/**
 * If you add a new deploy target, please start by adding a new item to the `SUPPORTED_DEPLOY_TARGETS`
 */
declare const SUPPORTED_DEPLOY_TARGETS: readonly ["vercel", "heroku"];
export declare const formattedSupportedDeployTargets: string;
declare type SupportedTargets = typeof SUPPORTED_DEPLOY_TARGETS[number];
/**
 * Take user input of a deploy target, validate it, and parse it into a
 * normalized form.
 */
export declare function normalizeTarget(inputDeployTarget: string | undefined): SupportedTargets | null;
export declare function computeBuildOutputFromTarget(target: SupportedTargets | null): string | null;
declare type ValidatorResult = {
    valid: boolean;
};
export declare function validateTarget(target: SupportedTargets, layout: Layout): ValidatorResult;
export declare function logTargetPostBuildMessage(target: SupportedTargets): void;
export {};
//# sourceMappingURL=deploy-target.d.ts.map