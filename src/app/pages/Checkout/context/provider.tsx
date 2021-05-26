import React from "react";
import { useDispatch } from "react-redux";
import { useBooking } from "../hooks/useBooking";
import { useCheckoutSlice } from "../slice";
import { CheckoutContextType } from "./createContext";

type ArraySeat = { maGhe: number; giaVe: number };

export const useProvider = (): CheckoutContextType => {
    const [ticketId, setTicketId] = React.useState(0);
    const [username, setUsername] = React.useState("");
    const [arraySeat, setArraySeat] = React.useState<ArraySeat[]>([]) as any;
    const dispatch = useDispatch();
    const { actions } = useCheckoutSlice();

    React.useEffect(() => {
        const userLogin = localStorage.getItem("user");
        if (userLogin) {
            const credential = JSON.parse(userLogin);
            setUsername(credential.taiKhoan);
        }
    }, [username]);

    const bookingTicket = React.useCallback(async (maLichChieu, danhSachVe, taiKhoanNguoiDung) => {
        const data = {
            maLichChieu,
            danhSachVe,
            taiKhoanNguoiDung,
        };
        console.log("data", data);
        await dispatch(actions.bookingTicket(data));
        setArraySeat([]);
    }, []);

    return { ticketId, arraySeat, username, bookingTicket, setArraySeat };
};
