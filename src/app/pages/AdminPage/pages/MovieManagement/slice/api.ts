import axiosClient from "api/axiosClient";
import axios from "axios";
import { API } from "utils/constants/settings";
import { DeleteMoviePayload, MovieCreationPayload } from "./types";

export const api = {
    addMovie: (params: any) => {
        const url = `/QuanLyPhim/ThemPhimUploadHinh`;
        return axiosClient
            .post(url, params)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    editMovie: (params: any) => {
        const url = `${process.env.REACT_APP_API_URL}/QuanLyPhim/CapNhatPhimUpload`;
        /* return axios({
            method: "PUT",
            url,
            data: params,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(response => (response))
            .catch(error => (error)); */
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

    createShowTime: (params: any) => {
        const url = `${API.CREATE_SHOWTIME}`;
        return axiosClient
            .post(url, params)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};
