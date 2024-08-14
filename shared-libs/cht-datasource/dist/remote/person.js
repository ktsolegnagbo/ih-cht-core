"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const data_context_1 = require("./libs/data-context");
/** @internal */
var v1;
(function (v1) {
    const getPerson = (remoteContext) => (0, data_context_1.getResource)(remoteContext, 'api/v1/person');
    /** @internal */
    v1.get = (remoteContext) => (identifier) => getPerson(remoteContext)(identifier.uuid);
    /** @internal */
    v1.getWithLineage = (remoteContext) => (identifier) => getPerson(remoteContext)(identifier.uuid, { with_lineage: 'true' });
})(v1 || (exports.v1 = v1 = {}));
//# sourceMappingURL=person.js.map