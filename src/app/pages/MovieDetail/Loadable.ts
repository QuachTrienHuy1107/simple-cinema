/**
 *
 * Asynchronously loads the component for MovieDetail
 *
 */

 import React from "react";
import { lazyLoad } from "utils/loadable";
import { Loading } from "app/components/Common/Loading";
import {Spin} from "antd";

 const MovieDetail = lazyLoad(
    () => import("./index"),
    module => module.MovieDetail,

    /* {
        fallback: <Loading />,
    }, */
);

export default MovieDetail
