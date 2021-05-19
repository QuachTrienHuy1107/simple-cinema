export enum StatusCode {
    Success = 200 || 201 || 202,
    Error = 404,
    Server = 500,
}

export enum API {
    GETMOVIEDETAIL = `/QuanLyPhim/LayThongTinPhim`,
    GETALLPAGINATION = `QuanLyPhim/LayDanhSachPhimPhanTrang`,
    EDIT_MOVIE = `/QuanLyPhim/CapNhatPhimUpload`,
}

export enum ROUTES {
    /**
     * Client
     */
    HOME = "/",
    ABOUT = "/about",
    MOVIEDETAIL = "/movie",
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
    DASHBOARD = "/admin/dashboard",
    USERMANAGEMENT = "/admin/usermanagement",
    USERDETAIL = "/admin/user/:taiKhoan",
    NOTFOUND = "/admin/notfound",
    PROFILEADMIN = "/admin/profileadmin",
    MOVIEMANAGEMENT = "/admin/moviemanagement",
    FORMADMIN = "/admin/formadmin",
}

export enum ActionType {
    update,
    creation,
    delete,
    view,
}
