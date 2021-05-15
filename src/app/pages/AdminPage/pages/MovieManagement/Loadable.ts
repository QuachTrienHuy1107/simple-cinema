/**
 *
 * Asynchronously loads the component for MovieManagement
 *
 */

import { lazyLoad } from "utils/loadable";

export const MovieManagement = lazyLoad(
    () => import("./index"),
    module => module.MovieManagement,
);
