"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const qualifier_1 = require("./qualifier");
const data_context_1 = require("./libs/data-context");
const Remote = __importStar(require("./remote"));
const Local = __importStar(require("./local"));
/** */
var v1;
(function (v1) {
    const assertPersonQualifier = (qualifier) => {
        if (!(0, qualifier_1.isUuidQualifier)(qualifier)) {
            throw new Error(`Invalid identifier [${JSON.stringify(qualifier)}].`);
        }
    };
    const getPerson = (localFn, remoteFn) => (context) => {
        (0, data_context_1.assertDataContext)(context);
        const fn = (0, data_context_1.adapt)(context, localFn, remoteFn);
        return async (qualifier) => {
            assertPersonQualifier(qualifier);
            return fn(qualifier);
        };
    };
    /**
     * Returns a person for the given qualifier.
     * @param context the current data context
     * @returns the person or `null` if no person is found for the qualifier
     * @throws Error if the provided context or qualifier is invalid
     */
    v1.get = getPerson(Local.Person.v1.get, Remote.Person.v1.get);
    /**
     * Returns a person for the given qualifier with the person's parent lineage.
     * @param context the current data context
     * @returns the person or `null` if no person is found for the qualifier
     * @throws Error if the provided context or qualifier is invalid
     */
    v1.getWithLineage = getPerson(Local.Person.v1.getWithLineage, Remote.Person.v1.getWithLineage);
})(v1 || (exports.v1 = v1 = {}));
//# sourceMappingURL=person.js.map