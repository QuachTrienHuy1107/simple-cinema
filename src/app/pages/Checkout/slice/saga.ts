import { PayloadAction } from "@reduxjs/toolkit";
import { take, call, put, select, takeLatest } from "redux-saga/effects";
import { StatusCode } from "utils/constants/settings";
import { checkoutActions as actions } from ".";
import { api } from "./api";
import { BookingPayload, SeatIdPayload } from "./types";

function* onFetchSeats({ payload }: PayloadAction<SeatIdPayload>) {
    try {
        const { response, error } = yield call(api.getAllSeat, payload);
        if (response?.status === StatusCode.Success) {
            yield put(actions.getAllSeatActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.getAllSeatActionFailure(error.message));
    }
}
function* onBookingTicket({ payload }: PayloadAction<BookingPayload>) {
    try {
        const { response, error } = yield call(api.bookingTicket, payload);
        console.log('response',response)
        if (response?.status === StatusCode.Success) {
            yield put(actions.bookingTicketSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.bookingTicketFailure(error.message));
    }
}

export function* checkoutSaga() {
    yield takeLatest(actions.getAllSeatAction.type, onFetchSeats);
    yield takeLatest(actions.bookingTicket.type, onBookingTicket);
}
