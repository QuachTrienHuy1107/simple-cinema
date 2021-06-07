import { PayloadAction } from "@reduxjs/toolkit";
import { PaginationResponseType } from "app/components/Paginations/types";

import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { homeSaga } from "./saga";
import {
    GetMovieWithDate,
    HomeState,
    MovieResponse,
    PaginationRequestType,
    SearchMoviePayload,
} from "./types";

export const initialState: HomeState = {
    movieWithDate: [],
    moviePagination: [],
    cinemaList: [],
    cinemaInfo: [],
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: "home",
    initialState,
    reducers: {
        //Get all movies
        getAllMovieAction(state) {
            state.isLoading = true;
        },
        getAllMovieActionSuccess(state, action: PayloadAction<MovieResponse[]>) {
            state.movieWithDate = action.payload;
            state.isLoading = false;
        },
        getAllMovieActionFailure() {},

        //Get movies with date
        getMovieWithDate(state, action: PayloadAction<GetMovieWithDate>) {
            state.isLoading = true;
        },
        getMovieWithDateSuccess(state, action: PayloadAction<PaginationResponseType>) {
            state.movieWithDate = action.payload;
            state.isLoading = false;
        },
        getMovieWithDateFailure(state, action: PayloadAction<Error>) {
          state.isLoading = false
        },

        //Get movies with pagination
        getPaginateMoviesAction: (state, action: PayloadAction<PaginationRequestType>) => {
            state.isLoading = true;
        },
        getPaginateMoviesActionSucess(state, action: PayloadAction<PaginationResponseType>) {
            state.moviePagination = action.payload;
            state.isLoading = false;
        },
        getPaginateMoviesActionFailure() {},

        //Get info one cinema
        getAllCinemaInfoAction(state, action: PayloadAction<any>) {},
        getAllCinemaInfoActionSuccess: (state, action: PayloadAction<any>) => {
            state.cinemaInfo = action.payload;
            state.isLoading = false;
        },
        getAllCinemaInfotActionFailure: state => {},

        //Get cinema list
        getAllCinemaListAction() {},
        getAllCinemaListActionSuccess: (state, action: PayloadAction<any>) => {

            state.cinemaList = action.payload;
            state.isLoading = false;
        },
        getAllCinemaListActionFailure: state => {},

        //Search movie
        searchMovie(state, action: PayloadAction<SearchMoviePayload>) {
            state.isLoading = true;
        },
        searchMovieSuccess(state, action: PayloadAction<any>) {
            state.moviePagination = action.payload;
            state.isLoading = false;
        },
        searchMovieFailure(state, action: PayloadAction<Error>) {

        },

        /**
         *
         */
        fetchMultiApi: (state, action: PayloadAction<GetMovieWithDate>) => {
            state.isLoading = true;
        },
        fetchMultiApiSuccess: state => {
            state.isLoading = false;
        },
        fetchMultiApiFailure: (state) => {
          state.isLoading = false
        },

        clearData: state => {
            return initialState;
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
