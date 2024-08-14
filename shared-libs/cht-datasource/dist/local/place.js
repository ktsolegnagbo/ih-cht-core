"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.v1 = void 0;
const contact_types_utils_1 = __importDefault(require("@medic/contact-types-utils"));
const core_1 = require("../libs/core");
const doc_1 = require("./libs/doc");
const logger_1 = __importDefault(require("@medic/logger"));
const lineage_1 = require("./libs/lineage");
/** @internal */
var v1;
(function (v1) {
    const isPlace = (settings, uuid, doc) => {
        if (!doc) {
            logger_1.default.warn(`No place found for identifier [${uuid}].`);
            return false;
        }
        const hasPlaceType = contact_types_utils_1.default.isPlace(settings.getAll(), doc);
        if (!hasPlaceType) {
            logger_1.default.warn(`Document [${uuid}] is not a valid place.`);
            return false;
        }
        return true;
    };
    /** @internal */
    v1.get = ({ medicDb, settings }) => {
        const getMedicDocById = (0, doc_1.getDocById)(medicDb);
        return async (identifier) => {
            const doc = await getMedicDocById(identifier.uuid);
            const validPlace = isPlace(settings, identifier.uuid, doc);
            return validPlace ? doc : null;
        };
    };
    /** @internal */
    v1.getWithLineage = ({ medicDb, settings }) => {
        const getLineageDocs = (0, lineage_1.getLineageDocsById)(medicDb);
        const getMedicDocsById = (0, doc_1.getDocsByIds)(medicDb);
        return async (identifier) => {
            const [place, ...lineagePlaces] = await getLineageDocs(identifier.uuid);
            if (!isPlace(settings, identifier.uuid, place)) {
                return null;
            }
            // Intentionally not further validating lineage. For passivity, lineage problems should not block retrieval.
            if (!(0, core_1.isNonEmptyArray)(lineagePlaces)) {
                logger_1.default.debug(`No lineage places found for place [${identifier.uuid}].`);
                return place;
            }
            const places = [place, ...lineagePlaces];
            const contactUuids = (0, lineage_1.getPrimaryContactIds)(places);
            const contacts = await getMedicDocsById(contactUuids);
            const [placeWithContact, ...linagePlacesWithContact] = places.map((0, lineage_1.hydratePrimaryContact)(contacts));
            const placeWithLineage = (0, lineage_1.hydrateLineage)(placeWithContact, linagePlacesWithContact);
            return (0, core_1.deepCopy)(placeWithLineage);
        };
    };
})(v1 || (exports.v1 = v1 = {}));
//# sourceMappingURL=place.js.map