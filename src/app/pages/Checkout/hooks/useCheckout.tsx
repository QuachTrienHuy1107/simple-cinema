import { useCheckoutContext } from "../context/createContext";
import { SeatSelectedType } from "../slice/types";
import { useHandlePickFood } from "./useHandlePickFood";

export const useCheckout = () => {
    const { arraySeatSelected, arrayFood } = useCheckoutContext();

    const totalPriceFood = arrayFood?.reduce((tt: number, item: any) => {
        const total = item.price * item.quantity;
        return (tt += total);
    }, 0);

    const totalPriceTicket = arraySeatSelected?.reduce((total: number, item: SeatSelectedType) => {
        return (total += item.giaVe);
    }, 0);

    const totalPrice = (totalPriceTicket + totalPriceFood).toLocaleString();

    return { totalPrice, totalPriceFood, totalPriceTicket };
};
