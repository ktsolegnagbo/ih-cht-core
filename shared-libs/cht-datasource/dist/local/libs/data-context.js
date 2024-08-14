"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalDataContext = exports.isLocalDataContext = exports.LocalDataContext = void 0;
const core_1 = require("../../libs/core");
/** @internal */
class LocalDataContext extends core_1.AbstractDataContext {
    medicDb;
    settings;
    /** @internal */
    constructor(medicDb, settings) {
        super();
        this.medicDb = medicDb;
        this.settings = settings;
    }
}
exports.LocalDataContext = LocalDataContext;
const assertSettingsService = (settings) => {
    if (!(0, core_1.isRecord)(settings) || !(0, core_1.hasField)(settings, { name: 'getAll', type: 'function' })) {
        throw new Error(`Invalid settings service [${JSON.stringify(settings)}].`);
    }
};
const assertSourceDatabases = (sourceDatabases) => {
    if (!(0, core_1.isRecord)(sourceDatabases) || !(0, core_1.hasField)(sourceDatabases, { name: 'medic', type: 'object' })) {
        throw new Error(`Invalid source databases [${JSON.stringify(sourceDatabases)}].`);
    }
};
/** @internal */
const isLocalDataContext = (context) => {
    return 'settings' in context && 'medicDb' in context;
};
exports.isLocalDataContext = isLocalDataContext;
/**
 * Returns the data context for accessing data via the provided local sources This functionality is intended for use
 * cases requiring offline functionality. For all other use cases, use {@link getRemoteDataContext}.
 * @param settings service providing access to the app settings
 * @param sourceDatabases the PouchDB databases to use as the local datasource
 * @returns the local data context
 * @throws Error if the provided settings or source databases are invalid
 */
const getLocalDataContext = (settings, sourceDatabases) => {
    assertSettingsService(settings);
    assertSourceDatabases(sourceDatabases);
    return new LocalDataContext(sourceDatabases.medic, settings);
};
exports.getLocalDataContext = getLocalDataContext;
//# sourceMappingURL=data-context.js.map