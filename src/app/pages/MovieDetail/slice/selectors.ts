import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.movieDetail || initialState;

export const selectMovieDetail = createSelector([selectSlice], state => state);
