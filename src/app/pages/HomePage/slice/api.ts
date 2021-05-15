import axiosClient from "api/axiosClient";
import axios from "axios";
import { API } from "utils/constants/settings";
import { MovieDetailPayload } from "./types";

const api = {
    getAllMovie: () => {
        const url = `/QuanLyPhim/LayDanhSachPhim?maNhom=GP02`;
        return axios({
            method: "GET",
            url,
        })
            .then(res => console.log("res", res))
            .catch(err => console.log("err", err));
    },
    getMovieDetail: (params: MovieDetailPayload) => {
        const url = `${API.GETMOVIEDETAIL}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
    getMoviePagination: (params: any) => {
        const url = `${API.GETALLPAGINATION}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getInfoCinema: () => {
        const url = `/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP01`;
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default api;
