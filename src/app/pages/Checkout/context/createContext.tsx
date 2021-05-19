import React, { createContext } from "react";
import { useProvider } from "./provider";

export interface CheckoutContextType {
    ticketId: number;
    arraySeat: Array<any>;
    username: string;
    bookingTicket: (maLichChieu: number, danhSachVe: Array<any>, taiKhoanNguoiDung: string) => void;
    setArraySeat: ({ maVe, giaVe }: any) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    ticketId: 0,
    arraySeat: [],
    username: "",
    bookingTicket: (
        _maLichChieu: number,
        _dachSachVe: Array<any>,
        _taiKhoanNguoiDung: string,
    ) => {},
    setArraySeat: ({ _maVe, _giaVe }: any) => {},
});

export const useCheckoutContext = () => {
    return React.useContext(CheckoutContext);
};

export const ContextProvider = ({ children }) => {
    const contextValue = useProvider();
    return <CheckoutContext.Provider value={contextValue}>{children}</CheckoutContext.Provider>;
};
