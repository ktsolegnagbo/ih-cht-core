"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapt = exports.assertDataContext = void 0;
const core_1 = require("./core");
const data_context_1 = require("../local/libs/data-context");
const data_context_2 = require("../remote/libs/data-context");
const isDataContext = (context) => {
    return (0, core_1.isRecord)(context) && (0, core_1.hasField)(context, { name: 'bind', type: 'function' });
};
/** @internal */
const assertDataContext = (context) => {
    if (!isDataContext(context) || !((0, data_context_1.isLocalDataContext)(context) || (0, data_context_2.isRemoteDataContext)(context))) {
        throw new Error(`Invalid data context [${JSON.stringify(context)}].`);
    }
};
exports.assertDataContext = assertDataContext;
/** @internal */
const adapt = (context, local, remote) => {
    if ((0, data_context_1.isLocalDataContext)(context)) {
        return local(context);
    }
    (0, data_context_2.assertRemoteDataContext)(context);
    return remote(context);
};
exports.adapt = adapt;
//# sourceMappingURL=data-context.js.map