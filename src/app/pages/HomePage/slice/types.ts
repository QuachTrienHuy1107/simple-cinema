import { PaginationResponseType } from "app/components/Paginations/types";
import { CinemaListResponse } from "app/components/Schedule/types";

export interface MovieResponse {
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

export interface PaginationRequestType {
    readonly maNhom?: string;
    tenPhim?: string;
    soTrang: number;
    soPhanTuTrenTrang: number;
}

/* --- STATE --- */
export interface HomeState {
    moviePagination?: Array<PaginationResponseType> | any;
    cinemaList?: CinemaListResponse[] | null;
    isLoading: boolean;
    isError: boolean;
}
