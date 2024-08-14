import { DataObject, Identifiable } from './core';
/**
 * A document from the database.
 */
export interface Doc extends DataObject, Identifiable {
    readonly _rev: string;
}
/** @internal */
export declare const isDoc: (value: unknown) => value is Doc;
//# sourceMappingURL=doc.d.ts.map