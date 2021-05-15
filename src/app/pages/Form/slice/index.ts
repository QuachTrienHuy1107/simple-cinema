import { PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { authSaga } from "./saga";
import { AuthState, LoginPayload, RegisterPayload, UserLoginResponse } from "./types";

export const initialState: AuthState = {
    credentials: {},
    isLoading: false,
    error: null,
    isAuthenticated: false,
};

const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["credentials"],
};

const slice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        checkLoginAction(state, action: PayloadAction<LoginPayload>) {
            state.isLoading = true;
        },
        checkLoginActionSuccess: (state, action: PayloadAction<UserLoginResponse>) => {
            state.credentials = action.payload;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null;
        },
        checkLoginActionFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        checkLogoutAction() {},
        checkLogoutActionSuccess: state => {
            state.credentials = {};
            // state.isError = false;
            state.isAuthenticated = false;
        },
        checkLogoutActionFailure: state => {
            // state.isError = true;
            state.isLoading = false;
        },

        registerAction(state, action: PayloadAction<RegisterPayload>) {
            state.isLoading = true;
        },
        registerActionSuccess(state, action: PayloadAction<RegisterPayload>) {
            state.credentials = action.payload;
            state.isLoading = false;
        },
        registerActionFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

export const { actions: authActions, reducer, name } = slice;

export const useAuthSlice = () => {
    useInjectReducer({ key: name, reducer });
    useInjectSaga({ key: name, saga: authSaga });
    return { actions: slice.actions };
};

export default reducer;

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useAuthSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
