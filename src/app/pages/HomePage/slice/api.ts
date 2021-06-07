import axiosClient from "api/axiosClient";
import axios from "axios";
import { API } from "utils/constants/settings";
import { GetMovieWithDate, MovieDetailPayload, SearchMoviePayload } from "./types";

const api = {
    getAllMovie: () => {
        const url = `${API.GET_ALL_MOVIE}`;
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
    getMovieWithDate: (params: GetMovieWithDate) => {
        const url = `${API.GET_MOVIE_WITH_DATE}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getMoviePagination: (params: any) => {
        const url = `${API.GET_ALL_PAGINATION}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getCinemaList: () => {
        const url = `${API.GET_CINEMA_LIST}`;
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getInfoCinema: params => {
        const url = `${API.GET_CINEMA_INFO}`;
        return axiosClient
            .get(url, { params })
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

    fetchMultiApi: async (params: GetMovieWithDate) => {
      console.log('prarmas',params)
        const url1 = await axiosClient.get(`${API.GET_ALL_MOVIE}`);
        const url2 = await axiosClient.get(`${API.GET_CINEMA_LIST}`);
        const url3 = await axiosClient.get(`${API.GET_MOVIE_WITH_DATE}`, { params });

        return axios
            .all([url1, url2, url3])
            .then(axios.spread((...response) => ({ response })))
            .catch(error => ({ error }));
    },
};

export default api;
