/* --- STATE --- */

import {TimerProps} from "app/pages/HomePage/components/Schedule/types";

/**
 * Movie
 */

export interface Movie {
    readonly maPhim: number;
    tenPhim: string;
    biDanh: string;
    trailer: string;
    hinhAnh: string;
    moTa: string;
    maNhom: string;
    ngayKhoiChieu: string;
    danhGia: number;
    heThongRapChieu: Array<TheaterInfo>;
}

/**
 * Movie Detail
 */

export interface TheaterInfo {
    logo: string;
    maHeThongRap: string;
    tenHeThongRap: string;
    cumRapChieu: Array<MovieInfo>;
}

export interface MovieInfo {
    lichChieuPhim: Array<MovieShowtime>;
    maCumRap: string;
    tenCumRap: string;
}
export interface MovieShowtime extends TimerProps {
    thoiLuong: string;
}
export interface MovieDetailProps {
    biDanh: string;
    danhGia: number;
    hinhAnh: string | File ;
    readonly maPhim: number;
    readonly maNhom: string;
    moTa: string;
    tenPhim: string;
    trailer: string;
    lichChieu: Array<MovieInfo>;
    ngayKhoiChieu: string;
    thoiLuong?: number;
}

export interface MovieDetailState {
    movieDetail?: MovieDetailProps[] | any;
    isLoading: boolean;
    error?: Error
}
