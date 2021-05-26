/**
 *
 * Asynchronously loads the component for Checkout
 *
 */

import { lazyLoad } from "utils/loadable";

export const Checkout = lazyLoad(
    () => import("./index"),
    module => module.Checkout,

);
