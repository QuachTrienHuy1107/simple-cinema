import { useCheckoutContext } from "../context/createContext";
import { FoodType } from "../slice/types";

export const useHandleRemoveFood = () => {
    const { arrayFood, setArrayFood } = useCheckoutContext();
    const handleRemoveFood = id => {
        let newArrayFood = [...arrayFood];

        newArrayFood = newArrayFood?.filter((item: FoodType) => item.id !== id);

        return setArrayFood(newArrayFood);
    };

    return { handleRemoveFood };
};
