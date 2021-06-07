import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { checkoutSaga } from "./saga";
import { BookingPayload, TicketInfoResponse, CheckoutState, SeatIdPayload, SeatType, FoodType } from "./types";

export const initialState: CheckoutState = {
    tickets: [],
    arrayFood: [],
    isLoading: false,
    messageSuccess: null,
};

const slice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        getAllSeatAction(state, action: PayloadAction<SeatIdPayload>) {
            state.isLoading = true;
        },
        getAllSeatActionSuccess(state, action: PayloadAction<TicketInfoResponse>) {
            state.tickets = action.payload;
            state.isLoading = false;
        },
        getAllSeatActionFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false
        },
        bookingTicket: (state, action: PayloadAction<BookingPayload>): void => {
            state.isLoading = true;
            state.messageSuccess = null;
            state.error = null;
        },
        bookingTicketSuccess(state, action: PayloadAction<any>) {
            state.isLoading = false;
            state.messageSuccess = action.payload;
        },
        bookingTicketFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
            state.error = action.payload;
        },
        resetStore: (state) => {

          return initialState
        }
    },
});

export const { actions: checkoutActions } = slice;

export const useCheckoutSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: checkoutSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useCheckoutSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
