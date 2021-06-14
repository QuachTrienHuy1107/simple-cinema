import { message } from 'antd';
import { PayloadAction } from "@reduxjs/toolkit";
import { take, call, put, select, takeLatest, delay, takeEvery } from "redux-saga/effects";
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
        yield put(actions.getAllMovieActionFailure(error.message));
    }
}
function* onGetDataPagination({ payload }: PayloadAction<PaginationRequestType>) {
    try {
        const { response, error } = yield call(api.getMoviePagination, payload);
        yield delay(1500);
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
        yield delay(1500)
        if (response?.status === StatusCode.Success) {
            yield put(actions.searchMovieSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {

        yield put(actions.searchMovieFailure(error.message));
    }
}

function* fetchMultiApi({ payload }: PayloadAction<GetMovieWithDate>) {
    try {
        const { response, error } = yield call(api.fetchMultiApi, payload);
        yield delay(1400)
        // yield put(actions.getAllMovieActionSuccess(response[0].data));
        yield put(actions.getAllCinemaListActionSuccess(response[0].data));
        yield put(actions.getMovieWithDateSuccess(response[1].data));
    } catch (error) {
        yield put(actions.fetchMultiApiFailure());
    }
}

export function* homeSaga() {
    yield takeLatest(actions.getAllMovieAction.type, onGetAllMovie);
    yield takeLatest(actions.getPaginateMoviesAction.type, onGetDataPagination);
    yield takeLatest(actions.getMovieWithDate.type, onGetMovieWithDate);
    yield takeLatest(actions.getAllCinemaListAction.type, onGetCinemaList);
    yield takeLatest(actions.getAllCinemaInfoAction.type, onGetCinemaInfo);
    yield takeLatest(actions.searchMovie.type, onSearchMovie);
    yield takeLatest(actions.fetchMultiApi.type, fetchMultiApi);
}
