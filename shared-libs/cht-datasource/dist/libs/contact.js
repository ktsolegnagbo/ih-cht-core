"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNormalizedParent = void 0;
const core_1 = require("./core");
/** @internal */
const isNormalizedParent = (value) => {
    return (0, core_1.isDataObject)(value)
        && (0, core_1.isIdentifiable)(value)
        && (!value.parent || (0, exports.isNormalizedParent)(value.parent));
};
exports.isNormalizedParent = isNormalizedParent;
//# sourceMappingURL=contact.js.map