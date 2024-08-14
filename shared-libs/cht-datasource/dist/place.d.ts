import { Contact, NormalizedParent } from './libs/contact';
import * as Person from './person';
import { DataContext } from './libs/data-context';
/** */
export declare namespace v1 {
    /**
     * Immutable data about a place contact.
     */
    interface Place extends Contact {
        readonly contact?: NormalizedParent;
        readonly place_id?: string;
    }
    /**
     * Immutable data about a place contact, including the full records of the parent place lineage and the primary
     * contact for the place.
     */
    interface PlaceWithLineage extends Place {
        readonly contact?: Person.v1.PersonWithLineage | NormalizedParent;
        readonly parent?: PlaceWithLineage | NormalizedParent;
    }
    /**
     * Returns a place for the given qualifier.
     * @param context the current data context
     * @returns the place or `null` if no place is found for the qualifier
     * @throws Error if the provided context or qualifier is invalid
     */
    const get: (context: DataContext) => (qualifier: Readonly<{
        uuid: string;
    }>) => Promise<import(".").Nullable<Place>>;
    /**
     * Returns a place for the given qualifier with the place's parent lineage.
     * @param context the current data context
     * @returns the place or `null` if no place is found for the qualifier
     * @throws Error if the provided context or qualifier is invalid
     */
    const getWithLineage: (context: DataContext) => (qualifier: Readonly<{
        uuid: string;
    }>) => Promise<import(".").Nullable<PlaceWithLineage>>;
}
//# sourceMappingURL=place.d.ts.map