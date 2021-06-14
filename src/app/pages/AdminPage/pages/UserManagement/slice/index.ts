import { PayloadAction } from "@reduxjs/toolkit";
import { PaginationResponseType } from "app/components/Paginations/types";
import { PaginationRequestType } from "app/pages/HomePage/slice/types";
import { createSlice } from "utils/@reduxjs/toolkit";
import { useInjectReducer, useInjectSaga } from "utils/redux-injectors";
import { userSaga } from "./saga";
import { UserDetailType, UserResponseType, UserState } from "./types";

export const initialState: UserState = {
    user: [],
    userDetail: {},
    isLoading: true,
    error: null,
    successMessage: "",
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        getPaginateUserAction(state, action: PayloadAction<PaginationRequestType>) {
            state.successMessage = "";
            state.isLoading = true;
            state.error = null;
        },
        getPaginateUserActionSuccess(state, action: PayloadAction<PaginationResponseType>) {
            state.user = action.payload;
            state.isLoading = false;
        },
        getPaginateUserActionFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },

        getUserDetailAction(state, action: PayloadAction<any>) {
            state.successMessage = "";
            state.isLoading = true;
        },
        getUserDetailActionSuccess(state, action: PayloadAction<UserDetailType>) {
            state.userDetail = action.payload;
            state.isLoading = false;
        },
        getUserDetailActionFailure() {},

        deleteUserAction(state, action: PayloadAction<any>) {
            state.successMessage = "";
            state.isLoading = true;
            state.error = null;
        },
        deleteUserActionSuccess: (state, action: PayloadAction<any>) => {
            state.successMessage = action.payload;
            state.isLoading = false;

            // return state.user.items.filter(({ taiKhoan }: any) => taiKhoan !== value);
        },
        deleteUserActionFailure(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.successMessage = "";

            state.isLoading = false;
        },
        editProfileUserAction: (state, action: PayloadAction<UserDetailType>) => {
            state.successMessage = "";
            state.isLoading = true;
            state.error = null;
        },
        editProfileUserActionSuccess: (state, action: PayloadAction<any>) => {
            state.userDetail = action.payload;
            state.isLoading = false;
            state.successMessage = "Sửa thành công!";
        },
        editProfileUserActionFailure: (state, action: PayloadAction<Error>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        searchUserAction(state, action: PayloadAction<any>) {
            state.isLoading = true;
            state.error = null;
        },
        searchUserActionSuccess(state, action: PayloadAction<UserResponseType>) {
            state.user.items = action.payload;
            state.isLoading = false;
        },
        searchUserActionFailure(state, action: PayloadAction<Error>) {
            state.error = action.payload;
            state.isLoading = false;
        },
        clearData: () => {
            return initialState;
        },
    },
});

export const { actions: userActions } = slice;

export const useUserSlice = () => {
    useInjectReducer({ key: slice.name, reducer: slice.reducer });
    useInjectSaga({ key: slice.name, saga: userSaga });
    return { actions: slice.actions };
};

/**
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useUserSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
