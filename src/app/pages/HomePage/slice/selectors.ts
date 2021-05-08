import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.home || initialState;

export const selectHome = createSelector([selectSlice], state => state);
