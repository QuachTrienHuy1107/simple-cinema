import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieManagementSaga } from "./saga";
import { DeleteMoviePayload, MovieCreationPayload, MovieManagementState } from "./types";

export const initialState: MovieManagementState = {
    movieCreation: {},
    isLoading: false,
    successMessage: "",
    error: null
};

const slice = createSlice({
    name: "movieManagement",
    initialState,
    reducers: {
        addMovieAction: (state, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.error = null;
            state.successMessage = "";
        },
        addMovieActionSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false;
            state.successMessage = "Thêm phim thành công!";
            state.error = null;
        },
        addMovieActionFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.successMessage = "";
        },

        editMovieAction: (state, action: PayloadAction<any>) => {
            state.isLoading = true;
            state.error = null;
            state.successMessage = "";
        },
        editMovieActionSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false;
            state.successMessage = "Sửa thành công!";
            state.error = null;
        },
        editMovieActionFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
            state.successMessage = "";
        },

        deleteMovieAction(state, action: PayloadAction<DeleteMoviePayload>) {
            state.isLoading = true;
            state.error = null;
            state.successMessage = "";
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
        createShowTimeAction: (state, action: PayloadAction<any>) => {
            state.error = null;
            state.isLoading = true;
            state.successMessage = "";
        },
        createShowTimeActionSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.successMessage = action.payload;
        },
        createShowTimeActionFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
            state.successMessage = "";
        },
        clearData: () => {
          return initialState
        }
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
