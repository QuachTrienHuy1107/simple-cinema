import axiosClient from "api/axiosClient";

const movieApi = {
    getMovieDetail: params => {
        const url = `/QuanLyRap/LayThongTinLichChieuPhim`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default movieApi;
