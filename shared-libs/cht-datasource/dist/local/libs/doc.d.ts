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
import { Nullable } from '../../libs/core';
import { Doc } from '../../libs/doc';
/** @internal */
export declare const getDocById: (db: PouchDB.Database<Doc>) => (uuid: string) => Promise<Nullable<Doc>>;
/** @internal */
export declare const getDocsByIds: (db: PouchDB.Database<Doc>) => (uuids: string[]) => Promise<Doc[]>;
/** @internal */
export declare const queryDocsByKey: (db: PouchDB.Database<Doc>, view: string) => (key: string) => Promise<Nullable<Doc>[]>;
//# sourceMappingURL=doc.d.ts.map