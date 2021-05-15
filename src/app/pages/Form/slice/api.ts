import axiosClient from "api/axiosClient";
import { LoginPayload, RegisterPayload } from "./types";

const api = {
    login: (account: LoginPayload) => {
        const url = `/QuanLyNguoiDung/DangNhap`;
        return axiosClient
            .post(url, account)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
    signup: (payload: RegisterPayload) => {
        const url = `/QuanLyNguoiDung/DangKy`;
        return axiosClient
            .post(url, payload)
            .then(response => ({ response }))
            .catch(error => error);
    },
};

export default api;
