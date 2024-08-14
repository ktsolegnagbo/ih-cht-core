"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDatasource = exports.Qualifier = exports.Place = exports.Person = exports.getRemoteDataContext = exports.getLocalDataContext = void 0;
/**
 * CHT datasource.
 *
 * This module provides a simple API for interacting with CHT data. To get started, obtain a {@link DataContext}. Then
 * use the context to perform data operations. There are two different usage modes available for performing the same
 * operations.
 * @example Get Data Context:
 * import { getRemoteDataContext, getLocalDataContext } from '@medic/cht-datasource';
 *
 * const dataContext = isOnlineOnly
 *   ? getRemoteDataContext(...)
 *   : getLocalDataContext(...);
 * @example Declarative usage mode:
 * import { Person, Qualifier } from '@medic/cht-datasource';
 *
 * const getPerson = Person.v1.get(dataContext);
 * // Or
 * const getPerson = dataContext.bind(Person.v1.get);
 *
 * const myUuid = 'my-uuid';
 * const myPerson = await getPerson(Qualifier.byUuid(uuid));
 * @example Imperative usage mode:
 * import { getDatasource } from '@medic/cht-datasource';
 *
 * const datasource = getDatasource(dataContext);
 * const myUuid = 'my-uuid';
 * const myPerson = await datasource.v1.person.getByUuid(myUuid);
 */
const auth_1 = require("./auth");
const data_context_1 = require("./libs/data-context");
const Person = __importStar(require("./person"));
const Place = __importStar(require("./place"));
const Qualifier = __importStar(require("./qualifier"));
var local_1 = require("./local");
Object.defineProperty(exports, "getLocalDataContext", { enumerable: true, get: function () { return local_1.getLocalDataContext; } });
var remote_1 = require("./remote");
Object.defineProperty(exports, "getRemoteDataContext", { enumerable: true, get: function () { return remote_1.getRemoteDataContext; } });
exports.Person = __importStar(require("./person"));
exports.Place = __importStar(require("./place"));
exports.Qualifier = __importStar(require("./qualifier"));
/**
 * Returns the source for CHT data.
 * @param ctx the current data context
 * @returns the CHT datasource API
 * @throws Error if the provided context is invalid
 */
const getDatasource = (ctx) => {
    (0, data_context_1.assertDataContext)(ctx);
    return {
        v1: {
            hasPermissions: auth_1.hasPermissions,
            hasAnyPermission: auth_1.hasAnyPermission,
            place: {
                /**
                 * Returns a place by its UUID.
                 * @param uuid the UUID of the place to retrieve
                 * @returns the place or `null` if no place is found for the UUID
                 * @throws Error if no UUID is provided
                 */
                getByUuid: (uuid) => ctx.bind(Place.v1.get)(Qualifier.byUuid(uuid)),
                /**
                 * Returns a place by its UUID along with the place's parent lineage.
                 * @param uuid the UUID of the place to retrieve
                 * @returns the place or `null` if no place is found for the UUID
                 * @throws Error if no UUID is provided
                 */
                getByUuidWithLineage: (uuid) => ctx.bind(Place.v1.getWithLineage)(Qualifier.byUuid(uuid)),
            },
            person: {
                /**
                 * Returns a person by their UUID.
                 * @param uuid the UUID of the person to retrieve
                 * @returns the person or `null` if no person is found for the UUID
                 * @throws Error if no UUID is provided
                 */
                getByUuid: (uuid) => ctx.bind(Person.v1.get)(Qualifier.byUuid(uuid)),
                /**
                 * Returns a person by their UUID along with the person's parent lineage.
                 * @param uuid the UUID of the person to retrieve
                 * @returns the person or `null` if no person is found for the UUID
                 * @throws Error if no UUID is provided
                 */
                getByUuidWithLineage: (uuid) => ctx.bind(Person.v1.getWithLineage)(Qualifier.byUuid(uuid)),
            }
        }
    };
};
exports.getDatasource = getDatasource;
//# sourceMappingURL=index.js.map