/**
 * A qualifier that identifies an entity by its UUID.
 */
export type UuidQualifier = Readonly<{
    uuid: string;
}>;
/**
 * Builds a qualifier that identifies an entity by its UUID.
 * @param uuid the UUID of the entity
 * @returns the qualifier
 * @throws Error if the UUID is invalid
 */
export declare const byUuid: (uuid: string) => UuidQualifier;
/**
 * Returns `true` if the given qualifier is a {@link UuidQualifier}, otherwise `false`.
 * @param identifier the identifier to check
 * @returns `true` if the given identifier is a {@link UuidQualifier}, otherwise
 * `false`
 */
export declare const isUuidQualifier: (identifier: unknown) => identifier is Readonly<{
    uuid: string;
}>;
//# sourceMappingURL=qualifier.d.ts.map