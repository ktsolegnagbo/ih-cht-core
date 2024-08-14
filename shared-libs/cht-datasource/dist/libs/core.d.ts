import { DataContext } from './data-context';
/**
 * A value that could be `null`.
 */
export type Nullable<T> = T | null;
/** @internal */
export declare const isNotNull: <T>(value: T | null) => value is T;
/**
 * An array that is guaranteed to have at least one element.
 */
export type NonEmptyArray<T> = [T, ...T[]];
/** @internal */
export declare const isNonEmptyArray: <T>(value: T[]) => value is NonEmptyArray<T>;
/** @internal */
export declare const getLastElement: <T>(array: NonEmptyArray<T>) => T;
type DataValue = DataPrimitive | DataArray | DataObject;
type DataPrimitive = string | number | boolean | Date | null | undefined;
interface DataArray extends Readonly<DataValue[]> {
}
/** @internal */
export interface DataObject extends Readonly<Record<string, DataValue>> {
}
/** @internal */
export declare const isDataObject: (value: unknown) => value is DataObject;
/**
 * Ideally, this function should only be used at the edge of this library (when returning potentially cross-referenced
 * data objects) to avoid unintended consequences if any of the objects are edited in-place. This function should not
 * be used for logic internal to this library since all data objects are marked as immutable.
 * This could be replaced by [structuredClone](https://developer.mozilla.org/en-US/docs/Web/API/structuredClone)
 * in CHT 5.x, or earlier if using a polyfill or a similar implementation like `_.cloneDeep()`.
 * @internal
 */
export declare const deepCopy: <T extends DataPrimitive | DataArray | DataObject>(value: T) => T;
/** @internal */
export declare const isString: (value: unknown) => value is string;
/** @internal */
export declare const isRecord: (value: unknown) => value is Record<string, unknown>;
/** @internal */
export declare const hasField: (value: Record<string, unknown>, field: {
    name: string;
    type: string;
}) => boolean;
/** @internal */
export declare const hasFields: (value: Record<string, unknown>, fields: NonEmptyArray<{
    name: string;
    type: string;
}>) => boolean;
/** @internal */
export interface Identifiable extends DataObject {
    readonly _id: string;
}
/** @internal */
export declare const isIdentifiable: (value: unknown) => value is Identifiable;
/** @internal */
export declare const findById: <T extends Identifiable>(values: T[], id: string) => Nullable<T>;
/** @internal */
export declare abstract class AbstractDataContext implements DataContext {
    readonly bind: <T>(fn: (ctx: DataContext) => T) => T;
}
export {};
//# sourceMappingURL=core.d.ts.map