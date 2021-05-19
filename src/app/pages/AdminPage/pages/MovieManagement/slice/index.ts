import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieManagementSaga } from "./saga";
import { DeleteMoviePayload, MovieCreationPayload, MovieManagementState } from "./types";

export const initialState: MovieManagementState = {
    movieCreation: {},
    isLoading: false,
    successMessage: "",
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

        deleteMovieAction(state, action: PayloadAction<DeleteMoviePayload>) {
            state.isLoading = true;
            state.error = null;
        },

        deleteMovieActionSuccess: (state, action: PayloadAction<any>) => {
            state.successMessage = action.payload;
            state.isLoading = false;
            state.error = null;
            // return state.user.items.filter(({ taiKhoan }: any) => taiKhoan !== value);
        },
        deleteMovieActionFailure(state, action: PayloadAction<Error>) {
            state.successMessage = "";
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { actions: movieManagementActions, reducer } = slice;

export const useMovieManagementSlice = () => {
    useInjectReducer({ key: slice.name, reducer });
    useInjectSaga({ key: slice.name, saga: movieManagementSaga });
    return { movieManagementActions: slice.actions };
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
