"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.compose = exports.createContributor = void 0;
/**
 * Brand a function as a context contributor.
 */
function createContributor(contribCreator) {
    return contribCreator;
}
exports.createContributor = createContributor;
function compose(...ctxs) {
    const state = {};
    beforeEach(async () => {
        for (const ctx of ctxs) {
            Object.assign(state, typeof ctx === 'function' ? await ctx(state) : ctx);
        }
    });
    return state;
}
exports.compose = compose;
exports.create = compose;
//# sourceMappingURL=compose-create.js.map