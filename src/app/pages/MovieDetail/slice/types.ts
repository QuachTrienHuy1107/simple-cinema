/* --- STATE --- */

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
    lichChieuPhim: Array<any>;
    maCumRap: string;
    tenCumRap: string;
}
export interface MovieShowtime {
    giaVe: number;
    maLichChieu: string;
    maRap: string;
    ngayChieuGioChieu: string;
    tenRap: string;
    thoiLuong: string;
}
export interface MovieDetailProps {
    biDanh: string;
    danhGia: string;
    hinhAnh: string;
    readonly maPhim: number;
    readonly maNhom: string;
    moTa: string;
    tenPhim: string;
    trailer: string;
    lichChieu: Array<MovieInfo>;
    ngayKhoiChieu: string;
    thoiLuong: number;
}

export interface MovieDetailState {
    movies: Movie[] | any;
    movieDetail?: MovieDetailProps[] | any;
    isLoading: boolean;
    isError: Error | null | boolean;
}
