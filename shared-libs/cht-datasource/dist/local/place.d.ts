import { Nullable } from '../libs/core';
import { UuidQualifier } from '../qualifier';
import * as Place from '../place';
import { LocalDataContext } from './libs/data-context';
/** @internal */
export declare namespace v1 {
    /** @internal */
    const get: ({ medicDb, settings }: LocalDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Place.v1.Place>>;
    /** @internal */
    const getWithLineage: ({ medicDb, settings }: LocalDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Place.v1.PlaceWithLineage>>;
}
//# sourceMappingURL=place.d.ts.map