import { Nullable } from '../libs/core';
import { UuidQualifier } from '../qualifier';
import * as Place from '../place';
import { RemoteDataContext } from './libs/data-context';
/** @internal */
export declare namespace v1 {
    /** @internal */
    const get: (remoteContext: RemoteDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Place.v1.Place>>;
    /** @internal */
    const getWithLineage: (remoteContext: RemoteDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Place.v1.PlaceWithLineage>>;
}
//# sourceMappingURL=place.d.ts.map