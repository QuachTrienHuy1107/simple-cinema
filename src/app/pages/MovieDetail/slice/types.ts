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
}

/**
 * Movie Detail
 */

export interface TheaterInfo {
    readonly maCumRap: string;
    readonly maHeThongRap: string;
    readonly maRap: number;
    tenCumRap: string;
    tenHeThongRap: string;
    tenRap: string;
}

export interface MovieInfo {
    giaVe: number;
    readonly maLichChieu: number;
    readonly maPhim: number;
    readonly maRap: number;
    ngayChieuGioChieu: string;
    tenPhim: string;
    thongTinRap: Array<TheaterInfo>;
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
