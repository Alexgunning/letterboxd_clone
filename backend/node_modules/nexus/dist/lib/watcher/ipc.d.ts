declare type MessageType = 'module_imported' | 'error' | 'app_server_listening';
declare type MessageStruct<Type extends MessageType, Data extends Record<string, unknown>> = {
    type: Type;
    data: Data;
};
/**
 * This event is sent by the runner when booting up the app.
 *
 * This permits the server to know which files are part of the program. A
 * classic use-case is for the server to watch only files actually part of the
 * program.
 */
export declare type ModuleRequiredMessage = MessageStruct<'module_imported', {
    filePath: string;
}>;
/**
 * This event is sent by the runner when an uncaught error has occured. This
 * error could be from anywhere in the runner process: the user's project code
 * or the runner framework code, etc.
 */
declare type ErrorMessage = MessageStruct<'error', {
    error: string;
    stack: string | undefined;
    /**
     * todo
     */
    willTerminate: boolean;
}>;
export declare type Message = ModuleRequiredMessage | ErrorMessage | AppServerListeningMessage;
declare type AppServerListeningMessage = MessageStruct<'app_server_listening', {}>;
export declare const client: {
    senders: {
        moduleImported(data: ModuleRequiredMessage['data']): void;
        error(data: ErrorMessage['data']): void;
        /**
         * Send a signal that lets dev-mode master know that server is booted and thus
         * ready to receive requests.
         */
        serverListening(): void;
    };
};
export {};
//# sourceMappingURL=ipc.d.ts.map