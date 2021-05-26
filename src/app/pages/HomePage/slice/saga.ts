import { PayloadAction } from "@reduxjs/toolkit";
import { take, call, put, select, takeLatest } from "redux-saga/effects";
import { StatusCode } from "utils/constants/settings";
import { homeActions as actions } from ".";
import api from "./api";
import {
    GetMovieWithDate,
    MovieDetailPayload,
    PaginationRequestType,
    SearchMoviePayload,
} from "./types";

function* onGetAllMovie() {
    try {
        const { response, error } = yield call(api.getAllMovie);

        if (response?.status === StatusCode.Success) {
            yield put(actions.getAllMovieActionSuccess(response.data));
        } else {
            throw new Error("Network Error");
        }
    } catch (error) {
        yield put(actions.getAllMovieActionFailure());
    }
}
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
function* onGetMovieWithDate({ payload }: PayloadAction<GetMovieWithDate>) {
    try {
        const { response, error } = yield call(api.getMovieWithDate, payload);
        if (response?.status === StatusCode.Success) {
            yield put(actions.getMovieWithDateSuccess(response.data));
        } else {
            throw new Error("Network Error");
        }
    } catch (error) {
        yield put(actions.getMovieWithDateFailure(error.message));
    }
}

function* onGetCinemaList() {
    try {
        const { response, error } = yield call(api.getCinemaList);
        if (response?.status === StatusCode.Success) {
            yield put(actions.getAllCinemaListActionSuccess(response.data));
        } else {
            throw new Error("Network Error");
        }
    } catch (error) {
        yield put(actions.getAllCinemaListActionFailure());
    }
}
function* onGetCinemaInfo({ payload }: PayloadAction<any>) {
    try {
        const { response, error } = yield call(api.getInfoCinema, payload);
        if (response?.status === StatusCode.Success) {
            yield put(actions.getAllCinemaInfoActionSuccess(response.data));
        } else {
            throw new Error("Network Error");
        }
    } catch (error) {
        yield put(actions.getAllCinemaInfotActionFailure());
    }
}

function* onSearchMovie({ payload }: PayloadAction<SearchMoviePayload>) {
    try {
        const { response, error } = yield call(api.searchMovie, payload);
        if (response?.status === StatusCode.Success) {
            yield put(actions.searchMovieSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        console.log("erer", error);
        yield put(actions.searchMovieFailure(error.message));
    }
}

export function* homeSaga() {
    yield takeLatest(actions.getAllMovieAction.type, onGetAllMovie);
    yield takeLatest(actions.getPaginateMoviesAction.type, onGetDataPagination);
    yield takeLatest(actions.getMovieWithDate.type, onGetMovieWithDate);
    yield takeLatest(actions.getAllCinemaListAction.type, onGetCinemaList);
    yield takeLatest(actions.getAllCinemaInfoAction.type, onGetCinemaInfo);
    yield takeLatest(actions.searchMovie.type, onSearchMovie);
}
