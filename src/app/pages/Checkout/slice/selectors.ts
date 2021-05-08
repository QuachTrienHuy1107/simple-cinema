import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "types";
import { initialState } from ".";

const selectSlice = (state: RootState) => state.checkout || initialState;

export const selectCheckout = createSelector([selectSlice], state => state);
