import chalk from 'chalk';
import { stripIndent } from 'common-tags';
import { log } from '../lib/nexus-logger';
import { fatal } from '../lib/process';
import { isReflection } from '../lib/reflection/stage';
/**
 * For a the given method that would not work if the app is assembled, log a
 * warning if the app is assembled.
 */
export function assertAppNotAssembled(appState, methodName, message) {
    if (appState.assembled) {
        // todo make this fatal in prod
        log.warn(stripIndent `
      Cannot call ${chalk.yellow(methodName)}(...) after app.assemble()

      ${message}
    `);
    }
}
/**
 * For a given property that would not work if the app is _not_ assembled, log
 * and crash if the app is _not_ assembled.
 */
export function assertAppIsAssembledBeforePropAccess(appState, propName, message) {
    if (!appState.assembled) {
        let msg = '';
        msg += `Must access ${chalk.yellow(propName)} after app.assemble()`;
        if (message) {
            msg += `\n\n${message}`;
        }
        fatal(msg);
    }
}
/**
 * Guard that a piece of logic can only run post-assembly. If assembly has not
 * yet taken place the process will exit with a useful error messge. If the
 * execution mode is reflection, then this is a noop. That does mean that the
 * caller must be prepared to deal with undefined.
 */
export function assembledGuard(appState, propName, f) {
    if (isReflection())
        return;
    assertAppIsAssembledBeforePropAccess(appState, propName);
    return f();
}
//# sourceMappingURL=utils.js.map