/**
 * Asynchronously loads the component for HomePage
 */
import React from "react";
import { Loading } from "app/components/Common/Loading";
import { lazyLoad } from "utils/loadable";

const HomePage = lazyLoad(
    () => import("./index"),
    module => module.HomePage,
    {
        fallback: <Loading />,
    },
);

export default HomePage;
