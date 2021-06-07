import React from "react";
import { useCheckoutContext } from "../context/createContext";

export const useHandlePickSeat = () => {
    const { arraySeatSelected, setArraySeat } = useCheckoutContext();
    const handlePickSeat = React.useCallback(
        ({ id, price, seatName }) => {
            const index = arraySeatSelected.findIndex(item => item.maGhe === id);
            if (index === -1) {
                setArraySeat([...arraySeatSelected, { maGhe: id, giaVe: price, tenGhe: seatName }]);
            } else {
                let newArr = [...arraySeatSelected];
                newArr = newArr.filter(item => item.maGhe !== newArr[index].maGhe);
                setArraySeat(newArr);
            }
        },
        [arraySeatSelected, setArraySeat],
    );

    return { handlePickSeat };
};
