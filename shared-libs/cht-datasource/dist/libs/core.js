"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractDataContext = exports.findById = exports.isIdentifiable = exports.hasFields = exports.hasField = exports.isRecord = exports.isString = exports.deepCopy = exports.isDataObject = exports.getLastElement = exports.isNonEmptyArray = exports.isNotNull = void 0;
/** @internal */
const isNotNull = (value) => value !== null;
exports.isNotNull = isNotNull;
/** @internal */
const isNonEmptyArray = (value) => !!value.length;
exports.isNonEmptyArray = isNonEmptyArray;
/** @internal */
const getLastElement = (array) => array[array.length - 1];
exports.getLastElement = getLastElement;
const isDataPrimitive = (value) => {
    return value === null
        || value === undefined
        || typeof value === 'string'
        || typeof value === 'number'
        || typeof value === 'boolean'
        || value instanceof Date;
};
const isDataArray = (value) => {
    return Array.isArray(value) && value.every(v => isDataPrimitive(v) || isDataArray(v) || (0, exports.isDataObject)(v));
};
/** @internal */
const isDataObject = (value) => {
    if (!(0, exports.isRecord)(value)) {
        return false;
    }
    return Object
        .values(value)
        .every((v) => isDataPrimitive(v) || isDataArray(v) || (0, exports.isDataObject)(v));
};
exports.isDataObject = isDataObject;
/**
 * Ideally, this function should only be used at the edge of this library (when returning potentially cross-referenced
 * data objects) to avoid unintended consequences if any of the objects are edited in-place. This function should not
 * be used for logic internal to this library since all data objects are marked as immutable.
 * This could be replaced by [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
 * in CHT 5.x, or earlier if using a polyfill or a similar implementation like `_.cloneDeep()`.
 * @internal
 */
const deepCopy = (value) => {
    if (isDataPrimitive(value)) {
        return value;
    }
    if (isDataArray(value)) {
        return value.map(exports.deepCopy);
    }
    return Object.fromEntries(Object
        .entries(value)
        .map(([key, value]) => [key, (0, exports.deepCopy)(value)]));
};
exports.deepCopy = deepCopy;
/** @internal */
const isString = (value) => {
    return typeof value === 'string';
};
exports.isString = isString;
/** @internal */
const isRecord = (value) => {
    return value !== null && typeof value === 'object';
};
exports.isRecord = isRecord;
/** @internal */
const hasField = (value, field) => {
    const valueField = value[field.name];
    return typeof valueField === field.type;
};
exports.hasField = hasField;
/** @internal */
const hasFields = (value, fields) => fields.every(field => (0, exports.hasField)(value, field));
exports.hasFields = hasFields;
/** @internal */
const isIdentifiable = (value) => (0, exports.isRecord)(value)
    && (0, exports.hasField)(value, { name: '_id', type: 'string' });
exports.isIdentifiable = isIdentifiable;
/** @internal */
const findById = (values, id) => values
    .find(v => v._id === id) ?? null;
exports.findById = findById;
/** @internal */
class AbstractDataContext {
    bind = (fn) => fn(this);
}
exports.AbstractDataContext = AbstractDataContext;
//# sourceMappingURL=core.js.map