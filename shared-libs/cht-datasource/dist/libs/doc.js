"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDoc = void 0;
const core_1 = require("./core");
/** @internal */
const isDoc = (value) => (0, core_1.isRecord)(value)
    && (0, core_1.isIdentifiable)(value)
    && (0, core_1.hasField)(value, { name: '_rev', type: 'string' });
exports.isDoc = isDoc;
//# sourceMappingURL=doc.js.map