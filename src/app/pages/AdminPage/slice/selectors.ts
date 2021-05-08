import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.admin || initialState;

export const selectAdmin = createSelector([selectSlice], state => state);
