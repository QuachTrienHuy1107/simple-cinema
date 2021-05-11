export interface TimerProps {
    readonly maLichChieu: string;
    readonly maRap: string;
    tenRap: string;
    ngayChieuGioChieu: string;
    giaVe: number;
}

export interface MovieProps {
    lstLichChieuTheoPhim: Array<TimerProps>;
    readonly maPhim: string;
    tenPhim: string;
    hinhAnh: string;
}

export interface CinemaListProps {
    danhSachPhim: Array<MovieProps>;
    readonly maCumRap: string;
    tenCumRap: string;
    diaChi: string;
}

export interface CinemaListResponse {
    readonly maHeThongRap: string;
    readonly maNhom: string;
    lstCumRap?: Array<CinemaListProps>;
    tenHeThongRap: string;
    logo: string;
}
