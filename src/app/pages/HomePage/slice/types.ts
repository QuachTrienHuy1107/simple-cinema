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

export interface MovieDetailPayload {
    maPhim?: number;
}

export interface PaginationRequestType {
    readonly maNhom?: string;
    tenPhim?: string;
    soTrang: number;
    soPhanTuTrenTrang: number;
}

/* --- STATE --- */
export interface HomeState {
    movie?: MovieResponse | Object;
    moviePagination?: Array<PaginationResponseType> | any;
    cinemaList?: CinemaListResponse[] | null;
    isLoading: boolean;
    error?: Error | null;
}
