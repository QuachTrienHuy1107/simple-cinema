/* --- STATE --- */

export type SeatIdPayload = {
    maLichChieu: number;
};

export type ArraySeat = { maGhe: number; giaVe: number };

export interface SeatType {
    readonly maGhe: number;
    daDat: boolean;
    giaVe: number;
    loaiGhe: string;
    tenGhe: string;
    maRap: number;
    taiKhoanNguoiDat: string;
    stt: string;
}

export interface MovieBooking {
    readonly maLichChieu: number;
    diaChi: string;
    gioChieu: string;
    hinhAnh: string;
    ngayChieu: string;
    tenCumRap: string;
    tenPhim: string;
    tenRap: string;
}

export type CheckoutDetail = {
    danhSachGhe: Array<SeatType>;
    thongTinPhim: any;
};
export type TicketDetail = {
    readonly maLichChieu: string;
    tenCumRap: string;
    tenRap: string;
    diaChi: string;
    tenPhim: string;
    hinhAnh: string;
    ngayChieu: string;
    gioChieu: string;
};

export interface BookingPayload {
    maLichChieu: number;
    danhSachVe: Array<any>;
    taiKhoanNguoiDung: string;
}

export interface CheckoutState {
    tickets: SeatType[] | any;
    isLoading: boolean;
    error?: Error;
    message: string | null
}
