/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from "utils/loadable";

const HomePage = lazyLoad(
    () => import("./index"),
    module => module.HomePage,
);

export default HomePage;
