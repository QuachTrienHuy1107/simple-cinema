import axiosClient from "api/axiosClient";
import axios from "axios";
import {API} from "utils/constants/settings";
import {UserRequestType} from "./types";

const api = {
    getPaginateUser: (params: any) => {
        const url = `${API.GET_USER_PAGINATE}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getUserDetail: (params: any) => {
        const url = `${API.GET_USER_DETAIL}`;
        return axiosClient
            .post(url, params)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    deleteUser: (payload: string) => {
        const url = `${API.DELETE_USER}?TaiKhoan=${payload}`;
        return axiosClient
            .delete(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    editUser: (payload: UserRequestType) => {
        const url = `${API.EDIT_USER}`;
        return axiosClient
            .put(url, payload)
            .then(response => ({ response }))
            .catch(error => error);
    },
    searchUser: (params: any) => {

        const url = `${API.SEARCH_USER}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => error);
    },
};

export default api;
