import React from "react";
import { useDispatch } from "react-redux";
import { useCheckoutSlice } from "../slice";

export const useBooking = () => {
    const dispatch = useDispatch();
    const { actions } = useCheckoutSlice();
    const [username, setUsername] = React.useState("");

    React.useEffect(() => {
        const userLogin = localStorage.getItem("user");
        if (userLogin) {
            const credential = JSON.parse(userLogin);
            setUsername(credential.taiKhoan);
        }
    }, [username]);

    const bookingTicket = React.useCallback(async (maLichChieu, danhSachVe) => {
        const data = {
            maLichChieu,
            danhSachVe,
            taiKhoanNguoiDung: username,
        };

        await dispatch(actions.bookingTicket(data));
        // setArraySeat([]);
    }, []);

    return { bookingTicket };
};
