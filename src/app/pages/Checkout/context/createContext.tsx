import React, { createContext } from "react";
import { useProvider } from "../hooks/useProvider";
import { FoodType, SeatSelectedType } from "../slice/types";

export interface CheckoutContextType {
    arraySeatSelected: Array<SeatSelectedType>;
    setArraySeat: ({ maVe, giaVe }: any) => void;
    arrayFood: Array<FoodType>;
    setArrayFood: ({ id, name, price, quantity }: any) => void;
}

export const CheckoutContext = createContext<CheckoutContextType>({
    arraySeatSelected: [],
    setArraySeat: ({ _maVe, _giaVe }: any) => {},
    arrayFood: [],
    setArrayFood: ({ id, name, price, quantity }: FoodType) => {},
});

export const useCheckoutContext = () => {
    return React.useContext(CheckoutContext);
};

export const ContextProvider = ({ children }) => {
    const contextValue = useProvider();
    return <CheckoutContext.Provider value={contextValue}>{children}</CheckoutContext.Provider>;
};
