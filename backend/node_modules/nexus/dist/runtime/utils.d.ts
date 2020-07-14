import { AppState } from './app';
/**
 * For a the given method that would not work if the app is assembled, log a
 * warning if the app is assembled.
 */
export declare function assertAppNotAssembled(appState: AppState, methodName: string, message: string): void;
/**
 * For a given property that would not work if the app is _not_ assembled, log
 * and crash if the app is _not_ assembled.
 */
export declare function assertAppIsAssembledBeforePropAccess(appState: AppState, propName: string, message?: string): void;
/**
 * Guard that a piece of logic can only run post-assembly. If assembly has not
 * yet taken place the process will exit with a useful error messge. If the
 * execution mode is reflection, then this is a noop. That does mean that the
 * caller must be prepared to deal with undefined.
 */
export declare function assembledGuard<F extends () => any>(appState: AppState, propName: string, f: F): undefined | ReturnType<F>;
//# sourceMappingURL=utils.d.ts.map