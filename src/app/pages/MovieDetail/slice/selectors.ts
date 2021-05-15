import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state?.moviedetail || initialState;

export const selectMovieDetail = createSelector([selectSlice], state => state);
