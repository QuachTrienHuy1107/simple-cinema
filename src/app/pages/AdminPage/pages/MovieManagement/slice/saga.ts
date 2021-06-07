import { PayloadAction } from "@reduxjs/toolkit";
import { take, call, put, select, takeLatest } from "redux-saga/effects";
import { StatusCode } from "utils/constants/settings";
import { movieManagementActions as actions } from ".";
import { api } from "./api";
import { DeleteMoviePayload, MovieCreationPayload } from "./types";

function* onAddMovie({ payload }: PayloadAction<any>) {
    try {
        const { response, error } = yield call(api.addMovie, payload);
        if (response?.status === StatusCode.Success) {
            yield put(actions.addMovieActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {

        yield put(actions.editMovieActionFailure(error.message));
    }
}

function* onEditMovie({ payload }: PayloadAction<any>) {
    try {
        const { response, error } = yield call(api.editMovie, payload);

        if (response?.status === StatusCode.Success) {
            yield put(actions.editMovieActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {

        yield put(actions.editMovieActionFailure(error.message));
    }
}

function* onDeleteMovie({ payload }: PayloadAction<DeleteMoviePayload>) {
    try {
        const { response, error } = yield call(api.deleteMovie, payload);
        if (response?.status >= 200 || response?.status < 300) {
            yield put(actions.deleteMovieActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.deleteMovieActionFailure(error.message));

    }
}

function* onCreateShowTime({ payload }: PayloadAction<any>) {
    try {
        const { response, error } = yield call(api.createShowTime, payload);

        if (response?.status === StatusCode.Success) {
            yield put(actions.createShowTimeActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.createShowTimeActionFailure(error.message));
    }
}

export function* movieManagementSaga() {
    yield takeLatest(actions.addMovieAction.type, onAddMovie);
    yield takeLatest(actions.editMovieAction.type, onEditMovie);
    yield takeLatest(actions.deleteMovieAction.type, onDeleteMovie);
    yield takeLatest(actions.createShowTimeAction.type, onCreateShowTime);
}
