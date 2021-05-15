import { message } from "antd";
import { PayloadAction } from "@reduxjs/toolkit";
import { take, call, put, select, takeLatest, delay } from "redux-saga/effects";
import { StatusCode } from "utils/constants/settings";
import { authActions as actions } from ".";
import api from "./api";
import { LoginPayload, RegisterPayload } from "./types";

import { configureAppStore } from "store/configureStore";

const { persistor } = configureAppStore();

function* onLogin({ payload }: PayloadAction<LoginPayload>) {
    try {
        const { response, error } = yield call(api.login, payload);
        yield delay(100);
        if (response?.status === StatusCode.Success) {
            yield put(actions.checkLoginActionSuccess(response.data));
            localStorage.setItem("access_token", response.data.accessToken);
            localStorage.setItem("user", JSON.stringify(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.checkLoginActionFailure(error.message));
    }
}

function* onLogout() {
    yield put(actions.checkLogoutActionSuccess());
    localStorage.clear();
    yield persistor.purge();
}

function* onSignup({ payload }: PayloadAction<RegisterPayload>) {
    try {
        const { response, error } = yield call(api.signup, payload);
        if (response.status === StatusCode.Success) {
            yield put(actions.registerActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.registerActionFailure(error.message));
    }
}

export function* authSaga() {
    yield takeLatest(actions.checkLoginAction.type, onLogin);
    yield takeLatest(actions.registerAction.type, onSignup);
    yield takeLatest(actions.checkLogoutAction.type, onLogout);
}
