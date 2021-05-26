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

export interface SearchMoviePayload{
  tenPhim: string
  maNhom: string
}

export interface MovieDetailPayload {
    maPhim?: number;
}

export interface GetMovieWithDate extends PaginationRequestType {
    tuNgay: string;
    denNgay: string;
}

export interface PaginationRequestType {
    readonly maNhom?: string;
    tenPhim?: string;
    soTrang: number;
    soPhanTuTrenTrang: number;
}

/* --- STATE --- */
export interface HomeState {
    movie?: MovieResponse | Object | PaginationResponseType | any;
    moviePagination?: Array<PaginationResponseType> | any;
    cinemaList?: CinemaListResponse[] | null;
    cinemaInfo: any
    isLoading: boolean;
    error?: Error | null;
}
