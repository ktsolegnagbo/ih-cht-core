import { DataContext } from './libs/data-context';
import * as Person from './person';
import * as Place from './place';
export { Nullable, NonEmptyArray } from './libs/core';
export { DataContext } from './libs/data-context';
export { getLocalDataContext } from './local';
export { getRemoteDataContext } from './remote';
export * as Person from './person';
export * as Place from './place';
export * as Qualifier from './qualifier';
/**
 * Returns the source for CHT data.
 * @param ctx the current data context
 * @returns the CHT datasource API
 * @throws Error if the provided context is invalid
 */
export declare const getDatasource: (ctx: DataContext) => {
    v1: {
        hasPermissions: (permissions: string | string[], userRoles: string[], chtPermissionsSettings: object) => boolean;
        hasAnyPermission: (permissionsGroupList: string[][], userRoles: string[], chtPermissionsSettings: object) => boolean;
        place: {
            /**
             * Returns a place by its UUID.
             * @param uuid the UUID of the place to retrieve
             * @returns the place or `null` if no place is found for the UUID
             * @throws Error if no UUID is provided
             */
            getByUuid: (uuid: string) => Promise<import("./libs/core").Nullable<Place.v1.Place>>;
            /**
             * Returns a place by its UUID along with the place's parent lineage.
             * @param uuid the UUID of the place to retrieve
             * @returns the place or `null` if no place is found for the UUID
             * @throws Error if no UUID is provided
             */
            getByUuidWithLineage: (uuid: string) => Promise<import("./libs/core").Nullable<Place.v1.PlaceWithLineage>>;
        };
        person: {
            /**
             * Returns a person by their UUID.
             * @param uuid the UUID of the person to retrieve
             * @returns the person or `null` if no person is found for the UUID
             * @throws Error if no UUID is provided
             */
            getByUuid: (uuid: string) => Promise<import("./libs/core").Nullable<Person.v1.Person>>;
            /**
             * Returns a person by their UUID along with the person's parent lineage.
             * @param uuid the UUID of the person to retrieve
             * @returns the person or `null` if no person is found for the UUID
             * @throws Error if no UUID is provided
             */
            getByUuidWithLineage: (uuid: string) => Promise<import("./libs/core").Nullable<Person.v1.PersonWithLineage>>;
        };
    };
};
//# sourceMappingURL=index.d.ts.map