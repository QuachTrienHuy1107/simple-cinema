import { message } from "antd";
import React, { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ActionType } from "utils/constants/settings";
import { useMovieManagementSlice } from "../pages/MovieManagement/slice";
import {selectMovieManagement} from "../pages/MovieManagement/slice/selectors";
import { useUpload } from "./useUpload";

export const useAddEdit = () => {
    const formData = new FormData();
    const dispatch = useDispatch();
    const { movieManagementActions } = useMovieManagementSlice();
    const {successMessage, error, isLoading} = useSelector(selectMovieManagement)
    const [edit, setEdit] = React.useState(true);

    const onAddEdit = React.useCallback(
        (values: any) => {
            const data = {
                ...values,
            };
            console.log('data',data)

            for (let key in data) {
                formData.append(key, data[key]);
            }

            /* if (edit) {
                dispatch(movieManagementActions.editMovieAction(formData));
            } else {
                dispatch(movieManagementActions.addMovieAction(formData));
            } */
        },
        [movieManagementActions, dispatch, edit, formData],
    );

    return { onAddEdit, setEdit ,successMessage,error,isLoading};
};
