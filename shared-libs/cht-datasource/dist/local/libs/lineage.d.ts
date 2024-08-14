/// <reference types="pouchdb-find" />
/// <reference types="pouchdb-core" />
/// <reference types="pouchdb-adapter-cordova-sqlite" />
/// <reference types="pouchdb-adapter-fruitdown" />
/// <reference types="pouchdb-adapter-http" />
/// <reference types="pouchdb-adapter-idb" />
/// <reference types="pouchdb-adapter-leveldb" />
/// <reference types="pouchdb-adapter-localstorage" />
/// <reference types="pouchdb-adapter-memory" />
/// <reference types="pouchdb-adapter-websql" />
/// <reference types="pouchdb-mapreduce" />
/// <reference types="pouchdb-replication" />
/// <reference types="pouchdb-node" />
import { Contact } from '../../libs/contact';
import { NonEmptyArray, Nullable } from '../../libs/core';
import { Doc } from '../../libs/doc';
/**
 * Returns the identified document along with the parent documents recorded for its lineage. The returned array is
 * sorted such that the identified document is the first element and the parent documents are in order of lineage.
 * @internal
 */
export declare const getLineageDocsById: (medicDb: PouchDB.Database<Doc>) => (id: string) => Promise<Nullable<Doc>[]>;
/** @internal */
export declare const getPrimaryContactIds: (places: NonEmptyArray<Nullable<Doc>>) => string[];
/** @internal */
export declare const hydratePrimaryContact: (contacts: Doc[]) => (place: Nullable<Doc>) => Nullable<Doc>;
/** @internal */
export declare const hydrateLineage: (contact: Contact, lineage: Nullable<Doc>[]) => Contact;
//# sourceMappingURL=lineage.d.ts.map