/**
 *
 * Asynchronously loads the component for Form
 *
 */

import { lazyLoad } from "utils/loadable";

export const Form = lazyLoad(
    () => import("./index"),
    module => module.FormTemplate,
);
