/**
 * Verify if the user's role has the permission(s).
 * @param permissions {string | string[]} Permission(s) to verify
 * @param userRoles {string[]} Array of user roles.
 * @param chtPermissionsSettings {object} Object of configured permissions in CHT-Core's settings.
 * @return {boolean}
 */
export function hasPermissions(permissions: string | string[], userRoles: string[], chtPermissionsSettings: object): boolean;
/**
 * Verify if the user's role has all the permissions of any of the provided groups.
 * @param permissionsGroupList {string[][]} Array of groups of permissions due to the complexity of permission grouping
 * @param userRoles {string[]} Array of user roles.
 * @param chtPermissionsSettings {object} Object of configured permissions in CHT-Core's settings.
 * @return {boolean}
 */
export function hasAnyPermission(permissionsGroupList: string[][], userRoles: string[], chtPermissionsSettings: object): boolean;
//# sourceMappingURL=auth.d.ts.map