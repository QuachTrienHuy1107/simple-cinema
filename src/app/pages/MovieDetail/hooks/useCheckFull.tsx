import React from "react";

let isFull = true;
export const useCheckFull = () => {
    const checkFull = (maRap: any) => {
        isFull = true;

        return isFull;
    };

    return { checkFull, isFull };
};
