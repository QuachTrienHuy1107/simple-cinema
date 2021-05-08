import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieDetailSaga } from "./saga";
import { MovieDetailState } from "./types";

export const initialState: MovieDetailState = {};

const slice = createSlice({
    name: "movieDetail",
    initialState,
    reducers: {
        someAction(state, action: PayloadAction<any>) {},
    },
});

export const { actions: movieDetailActions } = slice;

export const useMovieDetailSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: movieDetailSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMovieDetailSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
