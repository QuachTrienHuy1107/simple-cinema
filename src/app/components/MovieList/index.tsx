/**
 *
 * MovieList
 *
 */
import { Tabs } from "antd";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { useGetDate } from "hooks/useGetDate";
import usePagination from "hooks/usePagination";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components/macro";
import { MovieCard } from "./MovieCard";

interface Props {}

const settings = {
    className: "center",
    arrows: true,
    centerMode: true,
    infinite: true,
    centerPadding: "0",
    slidesToShow: 1,
    speed: 400,
    rows: 2,
    slidesPerRow: 4,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesPerRow: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 756,
            settings: {
                slidesToShow: 1,
                slidesPerRow: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 576,
            settings: {
                slidesToShow: 1,
                slidesPerRow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const { TabPane } = Tabs;

export const MovieList = memo((props: Props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { today, dateBefore } = useGetDate();
    const { resPagination } = usePagination(1, 16);
    const { actions } = useHomeSlice();
    const { moviePagination, movie, isLoading } = useSelector(selectHome);
    const [key, setKey] = React.useState<boolean>(false);

    console.log("movie", movie);

    React.useEffect(() => {
        const data = {
            ...resPagination,
            tuNgay: dateBefore,
            denNgay: today,
        };
        dispatch(actions.getMovieWithDate(data));
    }, [dateBefore, today]);

    React.useEffect(() => {
        dispatch(actions.getPaginateMoviesAction(resPagination));
    }, []);

    console.log("moviePagination", moviePagination);

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" onChange={key => setKey(true)} animated>
                <TabPane tab="Đang chiếu" key="1">
                    <Slider {...settings}>
                        {movie?.map((movie: any) => (
                            <div key={movie.maPhim}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </Slider>
                </TabPane>
                <TabPane tab="Sắp chiếu" key="2">
                    <Slider {...settings}>
                        {moviePagination?.items?.map((movie: any) => (
                            <div key={movie.maPhim}>
                                <MovieCard movie={movie} isComming={true} />
                            </div>
                        ))}
                    </Slider>
                </TabPane>
            </Tabs>
            {/*  <Paginations
                totalPage={moviePagination.totalCount}
                isLoading={isLoading}
                handlePageChange={handlePageChange}
                defaultPageSize={resPagination.soPhanTuTrenTrang}
            /> */}
        </Wrapper>
    );
});

const Wrapper = styled.div`
    margin: 50px 0;

    .ant-pagination {
        margin-top: 50px;
        text-align: center;
    }

    .ant-tabs-nav-wrap {
        justify-content: center;
    }

    .slick-list {
        width: 80%;
        margin: 0 auto;
    }
    button.slick-next {
        transform: translateX(-100px) !important;
    }
    button.slick-prev {
        transform: translateX(100px) !important;
    }
`;
