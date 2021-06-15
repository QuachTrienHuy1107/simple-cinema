import { PayloadAction } from "@reduxjs/toolkit";
import { MovieDetailPayload, MovieResponse } from "app/pages/HomePage/slice/types";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { movieDetailSaga } from "./saga";
import { MovieDetailProps, MovieDetailState } from "./types";

export const initialState: MovieDetailState = {
    movieDetail: [],
    isLoading: true,
};

const movieSlice = createSlice({
    name: "moviedetail",
    initialState,
    reducers: {
        getMovieDetailAction(state, action: PayloadAction<MovieDetailPayload>) {
            state.isLoading = true;
        },
        getMovieDetailActionSuccess: (state, action: PayloadAction<any>) => {
            state.movieDetail = action.payload;
            state.isLoading = false;
        },
        getMovieDetailFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearData(state){
          return initialState
        }
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
