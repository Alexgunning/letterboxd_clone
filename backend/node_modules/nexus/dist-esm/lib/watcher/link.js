import * as nodecp from 'child_process';
import { rootLogger } from '../nexus-logger';
import * as TTYLinker from '../tty-linker';
const log = rootLogger.child('dev').child('link');
export class Link {
    constructor(options) {
        this.options = options;
        this.ttyLinker = null;
        this.state = 'init';
        this.stoppedResult = null;
        this.childProcess = null;
        if (process.stdout.isTTY) {
            this.ttyLinker = TTYLinker.create();
        }
    }
    updateOptions(options) {
        this.options = Object.assign(Object.assign({}, this.options), options);
    }
    async startOrRestart() {
        log.trace('startOrRestart requested', { state: this.state });
        if (this.childProcess) {
            await this.stop();
        }
        this.spawnRunner();
    }
    async stop() {
        log.trace('stop requested', { state: this.state });
        if (this.state === 'stopped') {
            log.trace('child is already stopped', { state: this.state });
            return;
        }
        if (this.state === 'stopping') {
            log.trace('child is already stopping', { state: this.state });
            return;
        }
        await this.kill();
    }
    async kill() {
        if (this.state === 'stopped') {
            return this.stoppedResult;
        }
        this.state = 'stopping';
        log.trace('killing child', { state: this.state });
        return new Promise((res) => {
            if (!this.childProcess) {
                log.trace('child already killed', { state: this.state });
                return res(null);
            }
            this.childProcess.kill('SIGKILL');
            this.childProcess.once('exit', (code, signal) => {
                log.trace('child killed', { state: this.state, code, signal });
                this.teardownChildProcess();
                res({ code, signal });
            });
        });
    }
    teardownChildProcess() {
        var _a;
        (_a = this.ttyLinker) === null || _a === void 0 ? void 0 : _a.parent.unforward(this.childProcess);
        this.childProcess = null;
        this.state = 'stopped';
    }
    spawnRunner() {
        var _a, _b, _c;
        if (this.state !== 'stopped' && this.state !== 'init') {
            log.trace('cannot start the runner if it is not stopped', { state: this.state });
            return;
        }
        if (this.childProcess) {
            throw new Error('attempt to spawn while previous child process still exists');
        }
        const forkCmd = [];
        if (this.options.inspectBrk) {
            forkCmd.push(`--inspect-brk=${this.options.inspectBrk}`);
        }
        forkCmd.push(require.resolve('./runner'));
        const [firstArg, ...rest] = forkCmd;
        this.childProcess = nodecp.fork(firstArg, rest, {
            cwd: process.cwd(),
            stdio: 'pipe',
            env: Object.assign(Object.assign(Object.assign(Object.assign({}, process.env), this.options.environmentAdditions), ((_b = (_a = this.ttyLinker) === null || _a === void 0 ? void 0 : _a.parent.serialize()) !== null && _b !== void 0 ? _b : {})), { ENTRYPOINT_SCRIPT: this.options.entrypointScript }),
        });
        log.trace('spawn child', { pid: this.childProcess.pid, state: this.state });
        (_c = this.ttyLinker) === null || _c === void 0 ? void 0 : _c.parent.forward(this.childProcess);
        this.childProcess.on('message', (msg) => {
            var _a, _b, _c, _d;
            if (msg.type === 'module_imported') {
                (_b = (_a = this.options).onRunnerImportedModule) === null || _b === void 0 ? void 0 : _b.call(_a, msg.data);
            }
            if (msg.type === 'app_server_listening') {
                (_d = (_c = this.options).onServerListening) === null || _d === void 0 ? void 0 : _d.call(_c);
            }
        });
        this.childProcess.stdout.on('data', (data) => {
            var _a, _b;
            process.stdout.write(data);
            (_b = (_a = this.options).onRunnerStdioMessage) === null || _b === void 0 ? void 0 : _b.call(_a, { stdio: 'stdout', data: data.toString() });
        });
        this.childProcess.stderr.on('data', (data) => {
            var _a, _b;
            process.stderr.write(data);
            (_b = (_a = this.options).onRunnerStdioMessage) === null || _b === void 0 ? void 0 : _b.call(_a, { stdio: 'stderr', data: data.toString() });
        });
        this.childProcess.once('error', (error) => {
            log.warn('runner errored out, respawning', { error });
            this.startOrRestart();
        });
        this.childProcess.once('exit', (code, signal) => {
            log.trace('child killed itself', { state: this.state, code, signal });
            this.teardownChildProcess();
        });
        this.state = 'running';
    }
}
//# sourceMappingURL=link.js.map