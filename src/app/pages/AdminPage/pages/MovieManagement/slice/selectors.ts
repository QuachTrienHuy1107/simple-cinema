import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.movieManagement || initialState;

export const selectMovieManagement = createSelector([selectSlice], state => state);
