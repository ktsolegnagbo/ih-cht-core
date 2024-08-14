/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
import { Doc } from '../../libs/doc';
import { AbstractDataContext } from '../../libs/core';
import { DataContext } from '../../libs/data-context';
/**
 * {@link PouchDB.Database}s to be used as the local data source.
 */
export type SourceDatabases = Readonly<{
    medic: PouchDB.Database<Doc>;
}>;
/**
 * Service providing access to the app settings. These settings must be guaranteed to remain current for as long as the
 * service is used. Settings data returned from future calls to service methods should reflect the current state of the
 * system's settings at the time and not just the state of the settings when the service was first created.
 */
export type SettingsService = Readonly<{
    getAll: () => Doc;
}>;
/** @internal */
export declare class LocalDataContext extends AbstractDataContext {
    readonly medicDb: PouchDB.Database<Doc>;
    readonly settings: SettingsService;
    /** @internal */
    constructor(medicDb: PouchDB.Database<Doc>, settings: SettingsService);
}
/** @internal */
export declare const isLocalDataContext: (context: DataContext) => context is LocalDataContext;
/**
 * Returns the data context for accessing data via the provided local sources This functionality is intended for use
 * cases requiring offline functionality. For all other use cases, use {@link getRemoteDataContext}.
 * @param settings service providing access to the app settings
 * @param sourceDatabases the PouchDB databases to use as the local datasource
 * @returns the local data context
 * @throws Error if the provided settings or source databases are invalid
 */
export declare const getLocalDataContext: (settings: SettingsService, sourceDatabases: SourceDatabases) => DataContext;
//# sourceMappingURL=data-context.d.ts.map