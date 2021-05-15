import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieManagementSaga } from "./saga";
import { MovieCreationPayload, MovieManagementState } from "./types";

export const initialState: MovieManagementState = {
    movieCreation: {},
    isLoading: false,
};

const slice = createSlice({
    name: "movieManagement",
    initialState,
    reducers: {
        addMovieAction: (state, action: PayloadAction<any>) => {
            console.log("aaa", action.payload);
            state.isLoading = true;
        },
        addMovieActionSuccess() {},
        addMovieActionFailure() {},

        editMovieAction: (state, action: PayloadAction<any>) => {
            console.log("ss");
        },
        editMovieActionSuccess() {},
        editMovieActionFailure() {},
    },
});

export const { actions: movieManagementActions, reducer } = slice;

export const useMovieManagementSlice = () => {
    useInjectReducer({ key: slice.name, reducer });
    useInjectSaga({ key: slice.name, saga: movieManagementSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useMovieManagementSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
