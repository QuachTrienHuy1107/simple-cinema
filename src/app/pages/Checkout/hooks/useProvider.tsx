import React from "react";
import { useDispatch } from "react-redux";
import { CheckoutContextType } from "../context/createContext";
import { useCheckoutSlice } from "../slice";
import { FoodType } from "../slice/types";

type ArraySeat = { maGhe: number; giaVe: number };

export const useProvider = (): CheckoutContextType => {
    const [arraySeatSelected, setArraySeat] = React.useState<ArraySeat[]>([]) as any;
    const [arrayFood, setArrayFood] = React.useState<FoodType[] | any>([]);

    const memoValue = React.useMemo(
        () => ({
            arraySeatSelected,
            setArraySeat,
            arrayFood,
            setArrayFood,
        }),
        [arraySeatSelected, arrayFood],
    );

    return memoValue;
};
