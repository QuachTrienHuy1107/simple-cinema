import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { authSaga } from "./saga";
import { AuthState } from "./types";

export const initialState: AuthState = {};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        someAction(state, action: PayloadAction<any>) {},
    },
});

export const { actions: authActions } = slice;

export const useAuthSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: authSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
