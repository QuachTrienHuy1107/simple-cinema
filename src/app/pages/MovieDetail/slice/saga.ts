// import { take, call, put, select, takeLatest } from 'redux-saga/effects';
// import { movieDetailActions as actions } from '.';
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { movieDetailActions as actions } from ".";

import movieApi from "./api";
// function* doSomething() {}

export function* onGetDataMovieDetail() {
    try {
        const { response, error } = yield call(movieApi.getMovieDetail);
        yield put(actions.getMovieDetailDataSuccess(response.data));
        console.log("getDetailMovie", response.data);
    } catch (error) {
        // yield put(getDataPaginationFail)
        // console.log('error',error)
    }
}
export function* movieDetailSaga() {
    yield takeLatest(actions.getMovieDetailData.type, onGetDataMovieDetail);
}
