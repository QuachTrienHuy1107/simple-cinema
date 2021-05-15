/* --- STATE --- */
export interface MovieCreationPayload {
    readonly maPhim: number;
    tenPhim: string;
    biDanh: string;
    trailer: string;
    hinhAnh: File;
    moTa: string;
    maNhom: string;
    ngayKhoiChieu: string;
    danhGia: number;
}

export interface MovieManagementState {
    movieCreation: MovieCreationPayload | any;
    isLoading: boolean;
}
