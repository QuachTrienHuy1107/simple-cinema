import axiosClient from "api/axiosClient";
import axios from "axios";
import { API } from "utils/constants/settings";
import { GetMovieWithDate, MovieDetailPayload, SearchMoviePayload } from "./types";

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
    getMovieWithDate: (params: GetMovieWithDate) => {
        const url = `${API.GET_MOVIE_WITH_DATE}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
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

    searchMovie: (params: SearchMoviePayload) => {
        const url = `${API.SEARCH_MOVIE}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default api;
