import { message } from "antd";
import React, { ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { ActionType } from "utils/constants/settings";
import { useMovieManagementSlice } from "../pages/MovieManagement/slice";
import { useUpload } from "./useUpload";

export const useAddEdit = () => {
    const formData = new FormData();
    const dispatch = useDispatch();
    const { actions } = useMovieManagementSlice();
    const [edit, setEdit] = React.useState(true);

    console.log("sss", edit);

    const onAddEdit = React.useCallback(
        (values: any) => {
            const data = {
                ...values,
            };
            console.log("data", data);
            for (let key in data) {
                formData.append(key, data[key]);
            }

            if (edit) {
                dispatch(actions.editMovieAction(formData));
            } else {
                dispatch(actions.addMovieAction(formData));
            }
        },
        [actions, dispatch, edit, formData],
    );

    return { onAddEdit, setEdit };
};
