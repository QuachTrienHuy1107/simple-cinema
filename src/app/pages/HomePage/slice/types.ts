import { PaginationResponseType } from "app/components/Paginations/types";
import { CinemaListResponse } from "../components/Schedule/types";

export interface MovieResponse {
    readonly maPhim: number;
    tenPhim: string;
    biDanh: string;
    trailer: string;
    hinhAnh?: string;
    moTa: string;
    maNhom: string;
    ngayKhoiChieu: string;
    danhGia: number;
    lichChieu?: Array<any>;
}

export interface SearchMoviePayload {
    tenPhim: string;
    maNhom: string;
}

export interface MovieDetailPayload {
    maPhim?: number;
}

export interface GetMovieWithDate extends PaginationRequestType {
    tuNgay: string;
    denNgay: string;
}

export interface PaginationRequestType {
    maNhom?: string;
    tenPhim?: string;
    tuKhoa?: string;
    soTrang: number;
    soPhanTuTrenTrang: number;
}

/* --- STATE --- */
export interface HomeState {
    movies?: MovieResponse[];
    movieWithDate?: MovieResponse | Object | PaginationResponseType | any;
    moviePagination?: Array<PaginationResponseType> | Array<MovieResponse> | any;
    cinemaList?: CinemaListResponse[] | null;
    cinemaInfo: any;
    isLoading: boolean;
    error?: Error | null;
}
