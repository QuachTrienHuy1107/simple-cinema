import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieDetailSaga } from "./saga";
import { MovieDetailProps, MovieDetailState } from "./types";

export const initialState: MovieDetailState = {
    movies: [],
    movieDetail: [],
    isError: false,
    isLoading: true,
};

const movieSlice = createSlice({
    name: "moviedetail",
    initialState,
    reducers: {
        getData() {},

        getDataSuccess: (state, action: PayloadAction<any>) => {
            state.movies = action.payload;
            state.isLoading = false;
        },
        getDataFailure: state => {
            state.isLoading = false;
            state.isError = true;
        },
        getMovieDetailData(state, action: PayloadAction<any>) {
            console.log("alo", action.payload);
        },
        getMovieDetailDataSuccess: (state, action: PayloadAction<MovieDetailProps>) => {
            state.movieDetail = action.payload;
            console.log(action.payload);
        },
    },
});

export const { actions: movieDetailActions } = movieSlice;

export const useMovieDetailSlice = () => {
    useInjectReducer({ key: movieSlice.name, reducer: movieSlice.reducer });
    useInjectSaga({ key: movieSlice.name, saga: movieDetailSaga });
    return { actions: movieSlice.actions };
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
