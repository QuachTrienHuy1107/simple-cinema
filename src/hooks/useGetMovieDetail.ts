import { useMovieDetailSlice } from "app/pages/MovieDetail/slice";
import { selectMovieDetail } from "app/pages/MovieDetail/slice/selectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetMovieDetail = () => {
    const dispatch = useDispatch();
    const { actions } = useMovieDetailSlice();
    const { movieDetail ,isLoading} = useSelector(selectMovieDetail);

    const getMovieDetail = (maPhim) => {
      dispatch(actions.getMovieDetailAction({maPhim}));
    }


    return { movieDetail,isLoading,getMovieDetail };
};
