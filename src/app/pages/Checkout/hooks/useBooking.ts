import React from "react";
import { useDispatch } from "react-redux";
import { useCheckoutContext } from "../context/createContext";
import { useCheckoutSlice } from "../slice";

type ArraySeat = { maGhe: number; giaVe: number; tenGhe?: string };

export const useBooking = () => {
    const { arraySeat, setArraySeat } = useCheckoutContext();

    const handlePickSeat = ({ id, price }) => {
        const index = arraySeat.findIndex(item => item.maGhe === id);
        if (index === -1) {
            setArraySeat([...arraySeat, { maGhe: id, giaVe: price }]);
        } else {
            let newArr = [...arraySeat];
            newArr = newArr.filter(item => item.maGhe !== newArr[index].maGhe);
            setArraySeat(newArr);
        }
    };

    return { handlePickSeat, arraySeat, setArraySeat };
};
