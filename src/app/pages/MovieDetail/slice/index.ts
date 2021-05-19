import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieDetailSaga } from "./saga";
import { MovieDetailProps, MovieDetailState } from "./types";

export const initialState: MovieDetailState = {
    movies: [],
    movieDetail: [],
    isError: false,
    isLoading: false,
};

const movieSlice = createSlice({
    name: "moviedetail",
    initialState,
    reducers: {
        getDataSuccess: (state, action: PayloadAction<any>) => {
            state.movies = action.payload;
            state.isLoading = false;
        },
        getDataFailure: state => {
            state.isLoading = false;
            state.isError = true;
            state.isLoading = false;
        },
        getMovieDetailData(state, action: PayloadAction<any>) {
            console.log("maaa", action.payload);
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
