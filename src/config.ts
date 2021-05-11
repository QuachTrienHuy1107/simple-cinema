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
    MOVIELIST = "/movielist",
    /**
     * Form
     */
    LOGIN = "/login",
    REGISTER = "/register",
    /**
     * Admin
     */
    ADMIN = "/admin",
    DASHBOARD = "/admin/dashboard",
    USERMANAGEMENT = "/admin/usermanagement",
    USERDETAIL = "/admin/user/:taiKhoan",
    NOTFOUND = "/admin/notfound",
    PROFILEADMIN = "/admin/profileadmin",
    MOVIEMANAGEMENT = "/admin/moviemanagement",
}

export default {};
