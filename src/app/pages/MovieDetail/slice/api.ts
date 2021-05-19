import axiosClient from "api/axiosClient";

const movieApi = {
    getMovieDetail: params => {
        const url = `https://movie0706.cybersoft.edu.vn/api/QuanLyRap/LayThongTinLichChieuPhim`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default movieApi;
