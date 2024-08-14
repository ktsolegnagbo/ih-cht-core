import { Nullable } from '../libs/core';
import { UuidQualifier } from '../qualifier';
import * as Person from '../person';
import { RemoteDataContext } from './libs/data-context';
/** @internal */
export declare namespace v1 {
    /** @internal */
    const get: (remoteContext: RemoteDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Person.v1.Person>>;
    /** @internal */
    const getWithLineage: (remoteContext: RemoteDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Person.v1.PersonWithLineage>>;
}
//# sourceMappingURL=person.d.ts.map