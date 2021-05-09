export enum Api {
    LayDanhSachPhongVe = `/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=16099`,
}

export enum ROUTES {
    /**
     * Client
     */
    HOME = "/",
    ABOUT = "/about",
    MOVIEDETAIL = "/movie/:id",
    CHECKOUT = "/checkout",
    PROFILE = "/profile/:taiKhoan",
    /**
     * Form
     */
    LOGIN = "/login",
    REGISTER = "/register",
    /**
     * Admin
     */

    DASHBOARD = "/dashboard",
    USERLIST = "/usermanagement",
    USERDETAIL = "/user/:taiKhoan",
    NOTFOUND = "/notfound",
    PROFILEADMIN = "/profileadmin",
    MOVIEMANAGEMENT = "/moviemanagement",
}

export default {};
