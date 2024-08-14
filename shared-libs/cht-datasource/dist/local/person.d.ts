import { Nullable } from '../libs/core';
import { UuidQualifier } from '../qualifier';
import * as Person from '../person';
import { LocalDataContext } from './libs/data-context';
/** @internal */
export declare namespace v1 {
    /** @internal */
    const get: ({ medicDb, settings }: LocalDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Person.v1.Person>>;
    /** @internal */
    const getWithLineage: ({ medicDb, settings }: LocalDataContext) => (identifier: UuidQualifier) => Promise<Nullable<Person.v1.PersonWithLineage>>;
}
//# sourceMappingURL=person.d.ts.map