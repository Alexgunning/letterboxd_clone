/**
 * Dev Mode is a module providing functions that support special dev-mode-only
 * features. This module is aware of when dev mode is on or off, and takes the
 * corresponding action. For example process.send IPC communication is available
 * in dev mode but not production builds. This module encapsulates doing the
 * right thing in relation to this.
 *
 * TODO we should have build-time optimizations that strip dev-mode imports so
 * that this entire module can be tree shaken away.
 *
 */
/**
 * Data
 */
export declare const DEV_MODE_ENV_VAR_NAME = "NEXUS_DEV_MODE";
/**
 * Constant for the server ready signal
 */
export declare const SERVER_READY_SIGNAL = "app_server_listening";
/**
 * Send a signal that lets dev-mode master know that server is booted and thus
 * ready to receive requests.
 */
export declare function sendServerReadySignalToDevModeMaster(): void;
/**
 * parse the dev mode environment variable
 */
export declare function isDevMode(): boolean;
//# sourceMappingURL=dev-mode.d.ts.map