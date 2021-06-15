/**
 *
 * Asynchronously loads the component for MovieDetail
 *
 */

 import React from "react";
import { lazyLoad } from "utils/loadable";
import { Loading } from "app/components/Common/Loading";
import {Spin} from "antd";

export const MovieDetail = lazyLoad(
    () => import("./index"),
    module => module.MovieDetail,
);
