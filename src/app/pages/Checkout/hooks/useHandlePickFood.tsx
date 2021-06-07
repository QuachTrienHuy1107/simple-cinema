import React from "react";
import { useDispatch } from "react-redux";
import { useCheckoutContext } from "../context/createContext";
import { useCheckoutSlice } from "../slice";
import { FoodType } from "../slice/types";
import { useCheckout } from "./useCheckout";

export const useHandlePickFood = () => {
    const { arrayFood, setArrayFood } = useCheckoutContext();

    const handlePickFood = ({ id, name, price, quantity }: FoodType) => {
        const index = arrayFood.findIndex(item => item.id === id);
        if (index === -1) {
            setArrayFood([...arrayFood, { id, name, price, quantity }]);
        } else {
            arrayFood[index].quantity = quantity;
            setArrayFood([...arrayFood]);
        }
    };

    const clearArrayFood = () => {
        setArrayFood([]);
    };

    return { handlePickFood, arrayFood, clearArrayFood };
};
