import { PayloadAction } from "@reduxjs/toolkit";
import { PaginationResponseType } from "app/components/Paginations/types";

import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { homeSaga } from "./saga";
import {
    GetMovieWithDate,
    HomeState,
    MovieDetailPayload,
    MovieResponse,
    PaginationRequestType,
    SearchMoviePayload,
} from "./types";

export const initialState: HomeState = {
    movie: [],
    moviePagination: [],
    cinemaList: [],
    isLoading: true,
    error: null,
};

const slice = createSlice({
    name: "home",
    initialState,
    reducers: {
        searchMovie(state, action: PayloadAction<SearchMoviePayload>){
          state .isLoading = true
        },
        searchMovieSuccess(state,action: PayloadAction<any>){
          state.moviePagination = action.payload
          state.isLoading = false
        },
        searchMovieFailure(state,action: PayloadAction<Error>){
          console.log('error',action.payload)
        },

        getMovieWithDate(state, action: PayloadAction<GetMovieWithDate>) {
            state.isLoading = true;
        },
        getMovieWithDateSuccess(state, action: PayloadAction<PaginationResponseType>) {
            state.movie = action.payload;
            state.isLoading = false;
        },
        getMovieWithDateFailure(state, action: PayloadAction<Error>) {},
        getPaginateMoviesAction: (state, action: PayloadAction<PaginationRequestType>) => {},
        getPaginateMoviesActionSucess(state, action: PayloadAction<PaginationResponseType>) {
            state.moviePagination = action.payload;
            state.isLoading = false;
        },
        getPaginateMoviesActionFailure() {},
        getMovieDetail(state, action: PayloadAction<MovieDetailPayload>) {
            state.isLoading = true;
            state.error = null;
        },
        getMovieDetailSuccess: (state, action: PayloadAction<MovieResponse>) => {
            state.movie = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        getMovieDetailFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        getAllCinemaListAction() {},
        getAllCinemaListActionSuccess: (state, action: PayloadAction<any>) => {
            state.cinemaList = action.payload;
            state.isLoading = false;
        },
        getAllCinemaListActionFailure: state => {},
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
