import { message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useAuthSlice } from "../slice";
import { selectAuth } from "../slice/selectors";
import { LoginPayload, RegisterPayload } from "../slice/types";

export const useHandleSubmit = () => {
    const { credentials, isLoading, error, isAuthenticated } = useSelector(selectAuth);
    const history = useHistory();
    const { actions } = useAuthSlice();
    const dispatch = useDispatch();

    const onLogin = async (values: LoginPayload): Promise<void> => {
        await dispatch(actions.checkLoginAction(values));
    };

    const onRegister = async (values: RegisterPayload): Promise<void> => {
        await dispatch(actions.registerAction(values));
    };

    React.useEffect(() => {
        if (error) {
            message.error(error);
        }
        if (isAuthenticated) {
            history.push("/");
        }
    }, [error, history, isAuthenticated]);

    return { credentials, isLoading, error, onLogin, onRegister, isAuthenticated };
};
