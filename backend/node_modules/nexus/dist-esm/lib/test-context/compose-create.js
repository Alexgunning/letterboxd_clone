/**
 * Brand a function as a context contributor.
 */
export function createContributor(contribCreator) {
    return contribCreator;
}
export function compose(...ctxs) {
    const state = {};
    beforeEach(async () => {
        for (const ctx of ctxs) {
            Object.assign(state, typeof ctx === 'function' ? await ctx(state) : ctx);
        }
    });
    return state;
}
export { compose as create };
//# sourceMappingURL=compose-create.js.map