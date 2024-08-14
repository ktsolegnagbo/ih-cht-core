"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hydrateLineage = exports.hydratePrimaryContact = exports.getPrimaryContactIds = exports.getLineageDocsById = void 0;
const core_1 = require("../../libs/core");
const doc_1 = require("./doc");
const logger_1 = __importDefault(require("@medic/logger"));
/**
 * Returns the identified document along with the parent documents recorded for its lineage. The returned array is
 * sorted such that the identified document is the first element and the parent documents are in order of lineage.
 * @internal
 */
const getLineageDocsById = (medicDb) => (0, doc_1.queryDocsByKey)(medicDb, 'medic-client/docs_by_id_lineage');
exports.getLineageDocsById = getLineageDocsById;
/** @internal */
const getPrimaryContactIds = (places) => places
    .filter(core_1.isNotNull)
    .map(({ contact }) => contact)
    .filter(core_1.isIdentifiable)
    .map(({ _id }) => _id)
    .filter((_id) => _id.length > 0);
exports.getPrimaryContactIds = getPrimaryContactIds;
/** @internal */
const hydratePrimaryContact = (contacts) => (place) => {
    if (!place || !(0, core_1.isIdentifiable)(place.contact)) {
        return place;
    }
    const contact = (0, core_1.findById)(contacts, place.contact._id);
    if (!contact) {
        logger_1.default.debug(`No contact found with identifier [${place.contact._id}] for the place [${place._id}].`);
        return place;
    }
    return {
        ...place,
        contact
    };
};
exports.hydratePrimaryContact = hydratePrimaryContact;
const getParentUuid = (index, contact) => {
    if (!contact) {
        return null;
    }
    if (index === 0) {
        return contact._id;
    }
    return getParentUuid(index - 1, contact.parent);
};
const mergeLineage = (lineage, parent) => {
    if (!(0, core_1.isNonEmptyArray)(lineage)) {
        return parent;
    }
    const child = (0, core_1.getLastElement)(lineage);
    const mergedChild = {
        ...child,
        parent: parent
    };
    return mergeLineage(lineage.slice(0, -1), mergedChild);
};
/** @internal */
const hydrateLineage = (contact, lineage) => {
    const fullLineage = lineage
        .map((place, index) => {
        if (place) {
            return place;
        }
        const parentId = getParentUuid(index, contact.parent);
        // If no doc was found, just add a placeholder object with the id from the contact
        logger_1.default.debug(`Lineage place with identifier [${parentId ?? ''}] was not found when getting lineage for [${contact._id}].`);
        return { _id: parentId };
    });
    const hierarchy = [contact, ...fullLineage];
    return mergeLineage(hierarchy.slice(0, -1), (0, core_1.getLastElement)(hierarchy));
};
exports.hydrateLineage = hydrateLineage;
//# sourceMappingURL=lineage.js.map