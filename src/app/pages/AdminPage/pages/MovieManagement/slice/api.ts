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

    createShowTime: (params: any) => {
        const url = `${API.CREATE_SHOWTIME}`;
        return axiosClient
            .post(url, params )
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};
