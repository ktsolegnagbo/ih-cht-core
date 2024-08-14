import { DataContext } from '../../libs/data-context';
import { AbstractDataContext, Nullable } from '../../libs/core';
/** @internal */
export declare class RemoteDataContext extends AbstractDataContext {
    readonly url: string;
    /** @internal */
    constructor(url: string);
}
/** @internal */
export declare const isRemoteDataContext: (context: DataContext) => context is RemoteDataContext;
/** @internal */
export declare const assertRemoteDataContext: (context: DataContext) => asserts context is RemoteDataContext;
/**
 * Returns the data context based on a remote CHT API server. This function should not be used when offline
 * functionality is required.
 * @param url the URL of the remote CHT API server. If not provided, requests will be made relative to the current
 * location.
 * @returns the data context
 */
export declare const getRemoteDataContext: (url?: string) => DataContext;
/** @internal */
export declare const getResource: (context: RemoteDataContext, path: string) => <T>(identifier: string, queryParams?: Record<string, string>) => Promise<Nullable<T>>;
//# sourceMappingURL=data-context.d.ts.map