"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
// client
exports.client = createClient();
function createClient() {
    return {
        senders: {
            moduleImported(data) {
                const msg = {
                    type: 'module_imported',
                    data,
                };
                process.send(msg);
            },
            error(data) {
                const msg = {
                    type: 'error',
                    data,
                };
                process.send(msg);
            },
            /**
             * Send a signal that lets dev-mode master know that server is booted and thus
             * ready to receive requests.
             */
            serverListening() {
                const msg = {
                    type: 'app_server_listening',
                    data: {},
                };
                process.send(msg);
            },
        },
    };
}
//# sourceMappingURL=ipc.js.map