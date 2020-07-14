import { cloneDeep } from 'lodash';
import { assertAppNotAssembled } from '../utils';
/**
 * Create an app settings component.
 *
 * @remarks
 *
 * The app settings component centralizes settings management of all other
 * components. Therefore it depends on the other components. It requires their
 * settings managers.
 */
export function create(appState, { schemaSettings, serverSettings, log, }) {
    const api = {
        change(newSettings) {
            assertAppNotAssembled(appState, 'app.settings.change', 'Your change of settings will be ignored.');
            if (newSettings.logger) {
                log.settings(newSettings.logger);
            }
            if (newSettings.schema) {
                schemaSettings.change(newSettings.schema);
            }
            if (newSettings.server) {
                serverSettings.change(newSettings.server);
            }
        },
        current: {
            logger: log.settings,
            schema: schemaSettings.data,
            server: serverSettings.data,
        },
        original: cloneDeep({
            logger: log.settings,
            schema: schemaSettings.data,
            server: serverSettings.data,
        }),
    };
    return {
        public: api,
        private: {
            reset() {
                schemaSettings.reset();
                serverSettings.reset();
                // todo
                // log.settings.reset()
            },
            assemble() {
                return {
                    settings: api.current,
                };
            },
        },
    };
}
//# sourceMappingURL=index.js.map