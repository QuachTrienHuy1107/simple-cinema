import axiosClient from "api/axiosClient";
import axios from "axios";

const api = {
    getAllMovie: () => {
        const url = `/QuanLyPhim/LayDanhSachPhim?maNhom=GP02`;
        return axios({
            method: "GET",
            url,
        })
            .then(res => console.log("res", res))
            .catch(err => console.log("err", err));
        /*  .get(url)
            .then(response => ({ response }))
            .catch(error => ({ error })); */
    },
    getMoviePagination: (params: any) => {
        const url = `QuanLyPhim/LayDanhSachPhimPhanTrang`;
        return axiosClient
            .get(url, { params })
            .then(response => ({ response }))
            .catch(error => ({ error }));
    },

    getMovieDetail: () => {
        const url = "https://movie0706.cybersoft.edu.vn/api/QuanLyPhim/LayThongTinPhim?MaPhim=1314";
        return axiosClient
            .get(url)
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
