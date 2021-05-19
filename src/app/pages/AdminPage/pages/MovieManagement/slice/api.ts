import axiosClient from "api/axiosClient";
import axios from "axios";
import { API } from "utils/constants/settings";
import { DeleteMoviePayload, MovieCreationPayload } from "./types";

export const api = {
    addMovie: (params: any) => {
        console.log("params", params);
        const url = `/QuanLyPhim/ThemPhimUploadHinh`;
        return axiosClient
            .post(url, params)
            .then(response => ({ response }))
            .catch(error => ({ error }));
        /* return axios({
            method: "POST",
            url,
            data: params,
            headers: {
                Authorization:
                    "Bearer " +
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiMTEyMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlF1YW5UcmkiLCJuYmYiOjE2MjA5MjYxNzMsImV4cCI6MTYyMDkyOTc3M30.gus--KrUAGIjZyhTxBU7b3nJ_IJ2BIpDlpd8_2yNzs0",
            },
        })
            .then(res => console.log("res", res))
            .catch(err => console.log("errr", err)); */
        /*     .post(url, { params, header: { "content-type": "multipart/form-data" } })
            .then(response => ({ response }))
            .catch(error => ({ error })); */
    },

    editMovie: (params: any) => {
        console.log("params", params);
        const url = `/QuanLyPhim/CapNhatPhimUpload`;
        return axiosClient
            .post(url, params)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    deleteMovie: (params: DeleteMoviePayload) => {
        const url = `${API.DELETE_MOVIE}`;
        return axiosClient
            .delete(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};
