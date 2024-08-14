import { Doc } from './doc';
import { DataObject, Identifiable } from './core';
/** @internal */
export interface NormalizedParent extends DataObject, Identifiable {
    readonly parent?: NormalizedParent;
}
/** @internal */
export declare const isNormalizedParent: (value: unknown) => value is NormalizedParent;
/** @internal */
export interface Contact extends Doc, NormalizedParent {
    readonly contact_type?: string;
    readonly name?: string;
    readonly reported_date?: Date;
    readonly type: string;
}
//# sourceMappingURL=contact.d.ts.map