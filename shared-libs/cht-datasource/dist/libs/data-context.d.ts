import { LocalDataContext } from '../local/libs/data-context';
import { RemoteDataContext } from '../remote/libs/data-context';
/**
 * Context for interacting with the data. This may represent a local data context where data can be accessed even while
 * offline. Or it may represent a remote data context where all data operations are performed against a remote CHT
 * instance.
 */
export interface DataContext {
    /**
     * Executes the provided function with this data context as the argument.
     * @param fn the function to execute
     * @returns the result of the function
     */
    bind: <T>(fn: (ctx: DataContext) => T) => T;
}
/** @internal */
export declare const assertDataContext: (context: unknown) => asserts context is DataContext;
/** @internal */
export declare const adapt: <T>(context: DataContext, local: (c: LocalDataContext) => T, remote: (c: RemoteDataContext) => T) => T;
//# sourceMappingURL=data-context.d.ts.map