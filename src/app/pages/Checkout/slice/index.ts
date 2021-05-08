import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { checkoutSaga } from "./saga";
import { CheckoutState } from "./types";

export const initialState: CheckoutState = {};

const slice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        someAction(state, action: PayloadAction<any>) {},
    },
});

export const { actions: checkoutActions } = slice;

export const useCheckoutSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: checkoutSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useCheckoutSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
