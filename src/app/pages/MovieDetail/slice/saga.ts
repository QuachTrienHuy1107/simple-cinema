import { PayloadAction } from "@reduxjs/toolkit";
import {MovieDetailPayload} from "app/pages/HomePage/slice/types";
// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { movieDetailActions as actions } from '.';
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import {StatusCode} from "utils/constants/settings";
import { movieDetailActions as actions } from ".";

import api from "./api";
// function* doSomething() {}

function* onGetMovieDetail({ payload }: PayloadAction<MovieDetailPayload>) {
    try {
        const { response, error } = yield call(api.getMovieDetail, payload);
        console.log("response", response);
        yield delay(1000)
        if (response?.status === StatusCode.Success) {
            yield put(actions.getMovieDetailActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.getMovieDetailFailure(error.message));
    }
}


export function* movieDetailSaga() {
    yield takeLatest(actions.getMovieDetailAction.type, onGetMovieDetail);
}
