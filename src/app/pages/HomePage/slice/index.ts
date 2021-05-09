import { PayloadAction } from "@reduxjs/toolkit";
import { PaginationResponseType } from "app/components/Paginations/types";

import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { homeSaga } from "./saga";
import { HomeState, PaginationRequestType } from "./types";

export const initialState: HomeState = {
    moviePagination: [],
    cinemaList: [],
    isLoading: true,
    isError: false,
};

const slice = createSlice({
    name: "home",
    initialState,
    reducers: {
        getPaginateMoviesAction: (state, action: PayloadAction<PaginationRequestType>) => {
            state.isLoading = true;
        },
        getPaginateMoviesActionSucess(state, action: PayloadAction<PaginationResponseType>) {
            console.log("1");
            state.moviePagination = action.payload;
            state.isLoading = false;
        },
        getPaginateMoviesActionFailure() {},

        getAllCinemaListAction() {},
        getAllCinemaListActionSuccess: (state, action: PayloadAction<any>) => {
            state.cinemaList = action.payload;
        },
        getAllCinemaListActionFailure: state => {
            state.isError = true;
        },
    },
});

export const { actions: homeActions, reducer, name } = slice;

export const useHomeSlice = () => {
    useInjectReducer({ key: name, reducer });
    useInjectSaga({ key: name, saga: homeSaga });
    return { actions: slice.actions };
};

// export const { getAllMovies } = homeActions;

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
