/**
 *
 * Asynchronously loads the component for UserManagement
 *
 */

import { lazyLoad } from "utils/loadable";

export const UserManagement = lazyLoad(
    () => import("./index"),
    module => module.UserManagement,
);
