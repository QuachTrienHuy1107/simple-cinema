
export interface UserRequestType extends UserResponseType{
  token?: string
}

export interface UserResponseType {
  taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  matKhau: string;
  maNhom: string;
  maLoaiNguoiDung?: string;
}

interface Seat {
  readonly maHeThongRap: string;
  tenHeThongRap: string;
  readonly maCumRap: string;
  tenCumRap: string;
  maRap: string;
  tenRap: string;
  maGhe: number;
  tenGhe: string;
}

export interface UserTicketInfoType {
  readonly maVe: number;
  ngayDat: string;
  tenPhim: string;
  giaVe: number;
  thoiLuongPhim: number;
  danhSachGhe: Array<Seat>;
}

export interface UserDetailType extends UserResponseType {
  readonly taiKhoan: string;
  hoTen: string;
  email: string;
  soDt: string;
  soDT?: string
  matKhau: string;
  maNhom: string;
  loaiNguoiDung: null;
  thongTinDatVe?: Array<UserTicketInfoType>;
}

export interface UserState {
  user: /* Array<UserResponseType> |  */any;
  userDetail: UserDetailType | any;
  isLoading: boolean;

  error?: string | Error | null
  successMessage: string

}
