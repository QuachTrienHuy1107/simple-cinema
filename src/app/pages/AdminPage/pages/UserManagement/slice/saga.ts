
import { PayloadAction } from "@reduxjs/toolkit";
import { PaginationRequestType } from "app/pages/HomePage/slice/types";
import { take, call, put, select, takeLatest, delay } from "redux-saga/effects";
import { StatusCode } from "utils/constants/settings";
import { userActions as actions } from ".";
import api from "./api";
import {UserRequestType} from "./types";

function* onGetPaginateUser({ payload }: PayloadAction<PaginationRequestType>) {

    try {
        const { response, error } = yield call(api.getPaginateUser, payload);
        if (response?.status >= 200 || response?.status < 300) {
            yield put(actions.getPaginateUserActionSuccess(response.data));
        } else {
            throw new Error(error);
        }
    } catch (error) {
        yield put(actions.getPaginateUserActionFailure(error.message));
        console.log(error)
      ;
    }
}

function* onDeleteUser({ payload }: PayloadAction<string>) {
  try {
      const { response, error } = yield call(api.deleteUser, payload);
      if (response?.status >= 200 || response?.status < 300) {
          yield put(actions.deleteUserActionSuccess(response.data));
      }
      else{
          throw new Error(error)
      }

  } catch (error) {
      yield put(actions.deleteUserActionFailure(error.message));
      console.log("error", error);
  }
}

function* onEditProfileUser({ payload }: PayloadAction<UserRequestType>) {
  try {
      const { response, error } = yield call(api.editUser, payload);
      if (response?.status >= 200 || response?.status < 300) {
          yield put(actions.editProfileUserActionSuccess(response.data));
      }
      else{
        throw new Error(error);
      }
  } catch (error) {
      yield put(actions.editProfileUserActionFailure(error.message));
      console.log("error", error);
  }
}

function* onSearchUser({ payload }: PayloadAction<PaginationRequestType>) {
  try {
      const { response, error } = yield call(api.searchUser, payload);
      yield delay(1500)
      if (response?.status === StatusCode.Success) {
          yield put(actions.searchUserActionSuccess(response.data));
      } else {
          throw new Error(error);
      }
  } catch (error) {
      yield put(actions.searchUserActionFailure(error.message));
  }
}

export function* userSaga() {
    yield takeLatest(actions.getPaginateUserAction.type, onGetPaginateUser);
    yield takeLatest(actions.deleteUserAction.type, onDeleteUser);
    yield takeLatest(actions.editProfileUserAction.type, onEditProfileUser);
    yield takeLatest(actions.searchUserAction.type, onSearchUser);
}
