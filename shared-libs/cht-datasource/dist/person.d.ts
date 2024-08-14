import { DataContext } from './libs/data-context';
import { Contact, NormalizedParent } from './libs/contact';
import * as Place from './place';
/** */
export declare namespace v1 {
    /**
     * Immutable data about a person contact.
     */
    interface Person extends Contact {
        readonly date_of_birth?: Date;
        readonly phone?: string;
        readonly patient_id?: string;
        readonly sex?: string;
    }
    /**
     * Immutable data about a person contact, including the full records of the parent place lineage.
     */
    interface PersonWithLineage extends Person {
        readonly parent?: Place.v1.PlaceWithLineage | NormalizedParent;
    }
    /**
     * Returns a person for the given qualifier.
     * @param context the current data context
     * @returns the person or `null` if no person is found for the qualifier
     * @throws Error if the provided context or qualifier is invalid
     */
    const get: (context: DataContext) => (qualifier: Readonly<{
        uuid: string;
    }>) => Promise<import(".").Nullable<Person>>;
    /**
     * Returns a person for the given qualifier with the person's parent lineage.
     * @param context the current data context
     * @returns the person or `null` if no person is found for the qualifier
     * @throws Error if the provided context or qualifier is invalid
     */
    const getWithLineage: (context: DataContext) => (qualifier: Readonly<{
        uuid: string;
    }>) => Promise<import(".").Nullable<PersonWithLineage>>;
}
//# sourceMappingURL=person.d.ts.map