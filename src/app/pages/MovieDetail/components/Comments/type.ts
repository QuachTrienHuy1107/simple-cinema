export interface Comments {
    maNguoiDung: string;
    taiKhoan: string;
    danhGia: number;
    binhLuan: string;
}

export interface CommentResponse {
    id?: number;
    maPhim?: number;
    arrayComments?: Array<Comments>;
}
