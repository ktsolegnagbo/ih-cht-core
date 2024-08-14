"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUuidQualifier = exports.byUuid = void 0;
const core_1 = require("./libs/core");
/**
 * Builds a qualifier that identifies an entity by its UUID.
 * @param uuid the UUID of the entity
 * @returns the qualifier
 * @throws Error if the UUID is invalid
 */
const byUuid = (uuid) => {
    if (!(0, core_1.isString)(uuid) || uuid.length === 0) {
        throw new Error(`Invalid UUID [${JSON.stringify(uuid)}].`);
    }
    return { uuid };
};
exports.byUuid = byUuid;
/**
 * Returns `true` if the given qualifier is a {@link UuidQualifier}, otherwise `false`.
 * @param identifier the identifier to check
 * @returns `true` if the given identifier is a {@link UuidQualifier}, otherwise
 * `false`
 */
const isUuidQualifier = (identifier) => {
    return (0, core_1.isRecord)(identifier) && (0, core_1.hasField)(identifier, { name: 'uuid', type: 'string' });
};
exports.isUuidQualifier = isUuidQualifier;
//# sourceMappingURL=qualifier.js.map