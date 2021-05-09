/**
 *
 * Asynchronously loads the component for About
 *
 */

import { lazyLoad } from "utils/loadable";

const About = lazyLoad(
    () => import("./index"),
    module => module.About,
);

export default About;
