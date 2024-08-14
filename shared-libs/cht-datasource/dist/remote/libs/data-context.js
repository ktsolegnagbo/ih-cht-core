"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResource = exports.getRemoteDataContext = exports.assertRemoteDataContext = exports.isRemoteDataContext = exports.RemoteDataContext = void 0;
const logger_1 = __importDefault(require("@medic/logger"));
const core_1 = require("../../libs/core");
/** @internal */
class RemoteDataContext extends core_1.AbstractDataContext {
    url;
    /** @internal */
    constructor(url) {
        super();
        this.url = url;
    }
}
exports.RemoteDataContext = RemoteDataContext;
/** @internal */
const isRemoteDataContext = (context) => 'url' in context;
exports.isRemoteDataContext = isRemoteDataContext;
/** @internal */
const assertRemoteDataContext = (context) => {
    if (!(0, exports.isRemoteDataContext)(context)) {
        throw new Error(`Invalid remote data context [${JSON.stringify(context)}].`);
    }
};
exports.assertRemoteDataContext = assertRemoteDataContext;
/**
 * Returns the data context based on a remote CHT API server. This function should not be used when offline
 * functionality is required.
 * @param url the URL of the remote CHT API server. If not provided, requests will be made relative to the current
 * location.
 * @returns the data context
 */
const getRemoteDataContext = (url = '') => {
    if (!(0, core_1.isString)(url)) {
        throw new Error(`Invalid URL [${JSON.stringify(url)}].`);
    }
    return new RemoteDataContext(url);
};
exports.getRemoteDataContext = getRemoteDataContext;
/** @internal */
const getResource = (context, path) => async (identifier, queryParams) => {
    const params = new URLSearchParams(queryParams).toString();
    try {
        const response = await fetch(`${context.url}/${path}/${identifier}?${params}`);
        if (!response.ok) {
            if (response.status === 404) {
                return null;
            }
            throw new Error(response.statusText);
        }
        return (await response.json());
    }
    catch (error) {
        logger_1.default.error(`Failed to fetch ${identifier} from ${context.url}/${path}`, error);
        throw error;
    }
};
exports.getResource = getResource;
//# sourceMappingURL=data-context.js.map