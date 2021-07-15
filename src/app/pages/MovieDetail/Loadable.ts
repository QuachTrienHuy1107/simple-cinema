/**
 *
 * Asynchronously loads the component for MovieDetail
 *
 */

import { lazyLoad } from "utils/loadable";

export const MovieDetail = lazyLoad(
    () => import("./index"),
    module => module.MovieDetail,
);
