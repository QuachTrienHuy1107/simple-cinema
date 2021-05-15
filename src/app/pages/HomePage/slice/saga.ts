import { PayloadAction } from "@reduxjs/toolkit";
import { take, call, put, select, takeLatest } from "redux-saga/effects";
import { StatusCode } from "utils/constants/settings";
import { homeActions as actions } from ".";
import api from "./api";
import { MovieDetailPayload, PaginationRequestType } from "./types";

function* onGetDataPagination({ payload }: PayloadAction<PaginationRequestType>) {
    try {
        const { response, error } = yield call(api.getMoviePagination, payload);

        if (response?.status === StatusCode.Success) {
            yield put(actions.getPaginateMoviesActionSucess(response.data));
        } else {
            throw new Error("Network Error");
        }
    } catch (error) {
        yield put(actions.getPaginateMoviesActionFailure());
    }
}

function* onGetMovieDetail({ payload }: PayloadAction<MovieDetailPayload>) {
    try {
        const { response, error } = yield call(api.getMovieDetail, payload);
        console.log("response", response);
        if (response?.status === StatusCode.Success) {
            yield put(actions.getMovieDetailSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.getMovieDetailFailure(error.message));
    }
}

function* onGetCinemaList() {
    try {
        const { response, error } = yield call(api.getInfoCinema);
        console.log("response", response);
        if (response.status === StatusCode.Success) {
            yield put(actions.getAllCinemaListActionSuccess(response.data));
        } else {
            throw new Error("Network Error");
        }
    } catch (error) {
        yield put(actions.getAllCinemaListActionFailure());
    }
}

export function* homeSaga() {
    yield takeLatest(actions.getPaginateMoviesAction.type, onGetDataPagination);
    yield takeLatest(actions.getAllCinemaListAction.type, onGetCinemaList);
    yield takeLatest(actions.getMovieDetail.type, onGetMovieDetail);
}
