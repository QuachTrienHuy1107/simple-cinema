import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { adminSaga } from "./saga";
import { AdminState } from "./types";

export const initialState: AdminState = {};

const slice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        someAction(state, action: PayloadAction<any>) {},
    },
});

export const { actions: adminActions } = slice;

export const useAdminSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: adminSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAdminSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
