import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { homeSaga } from "./saga";
import { HomeState } from "./types";

export const initialState: HomeState = {
    movies: [],
    isLoading: true,
    isError: false,
};

const slice = createSlice({
    name: "home",
    initialState,
    reducers: {
        someAction(state, action: PayloadAction<any>) {},
    },
});

export const { actions: homeActions } = slice;

export const useHomeSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: homeSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomeSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
