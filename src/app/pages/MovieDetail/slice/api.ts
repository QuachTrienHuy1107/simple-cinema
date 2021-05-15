import axiosClient from "api/axiosClient";

const movieApi = {
    getMovieDetail: () => {
        const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=1314";
        return axiosClient
            .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },
};

export default movieApi;
