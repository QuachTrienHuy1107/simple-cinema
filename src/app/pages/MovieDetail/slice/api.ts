import axiosClient from "api/axiosClient";
import {MovieDetailPayload} from "app/pages/HomePage/slice/types";
import {API} from "utils/constants/settings";

const api = {
    getMovieDetail: (params: MovieDetailPayload) => {
        const url = `${API.GET_MOVIE_DETAIL}`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default api;
