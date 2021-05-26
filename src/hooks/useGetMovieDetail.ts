import { useMovieDetailSlice } from "app/pages/MovieDetail/slice";
import { selectMovieDetail } from "app/pages/MovieDetail/slice/selectors";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const useGetMovieDetail = maPhim => {
    const dispatch = useDispatch();
    const { actions } = useMovieDetailSlice();
    const { movieDetail ,isLoading} = useSelector(selectMovieDetail);

    React.useEffect(() => {
        dispatch(actions.getMovieDetailAction({maPhim}));
    }, [maPhim]);

    return { movieDetail,isLoading };
};
