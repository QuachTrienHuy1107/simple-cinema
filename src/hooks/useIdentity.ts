import {useAuthSlice} from "app/pages/Form/slice";
import React from "react";
import {useDispatch} from "react-redux";

export const useIdentity = () => {
  const disptach = useDispatch();
  const { actions } = useAuthSlice();
  React.useEffect(() => {
      const userLogin = localStorage.getItem("user");
      if (userLogin) {
          const credential = JSON.parse(userLogin);

          disptach(actions.checkLoginActionSuccess(credential));
      }
  }, [actions, disptach]);

    return {};
};
