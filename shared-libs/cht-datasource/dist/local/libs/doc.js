"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryDocsByKey = exports.getDocsByIds = exports.getDocById = void 0;
const logger_1 = __importDefault(require("@medic/logger"));
const doc_1 = require("../../libs/doc");
/** @internal */
const getDocById = (db) => async (uuid) => db
    .get(uuid)
    .then(doc => (0, doc_1.isDoc)(doc) ? doc : null)
    .catch((err) => {
    if (err.status === 404) {
        return null;
    }
    logger_1.default.error(`Failed to fetch doc with id [${uuid}]`, err);
    throw err;
});
exports.getDocById = getDocById;
/** @internal */
const getDocsByIds = (db) => async (uuids) => {
    const keys = Array.from(new Set(uuids.filter(uuid => uuid.length)));
    if (!keys.length) {
        return [];
    }
    const response = await db.allDocs({ keys, include_docs: true });
    return response.rows
        .map(({ doc }) => doc)
        .filter((doc) => (0, doc_1.isDoc)(doc));
};
exports.getDocsByIds = getDocsByIds;
/** @internal */
const queryDocsByKey = (db, view) => async (key) => db
    .query(view, {
    startkey: [key],
    endkey: [key, {}],
    include_docs: true
})
    .then(({ rows }) => rows.map(({ doc }) => (0, doc_1.isDoc)(doc) ? doc : null));
exports.queryDocsByKey = queryDocsByKey;
//# sourceMappingURL=doc.js.map