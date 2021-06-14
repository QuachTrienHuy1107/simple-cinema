/* --- STATE --- */
export interface UserLoginResponse {
    readonly maLoaiNguoiDung?: string;
    hoTen?: string;
    email?: string;
    soDT?: string;
    readonly taiKhoan?: string;
    accessToken?: string;
    matKhau?: string;
}

export interface LoginPayload {
    taiKhoan: string;
    matKhau: string;
}

export interface RegisterPayload {
    readonly maLoaiNguoiDung?: string;
    taiKhoan: string;
    matKhau: string;
    email: string;
    soDt: string;
    maNhom: string;
    hoTen: string;
}

export interface AuthState {
    credentials: UserLoginResponse | any;
    isLoading: boolean;
    error?: Error | null | string;
    isAuthenticated?: boolean;
}
