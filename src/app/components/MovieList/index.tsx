/**
 *
 * MovieList
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

import { messages } from "./messages";
import { SearchForm } from "../SearchForm";
import { Col, Pagination, Row, Spin, Tabs } from "antd";
import Slider from "react-slick";
import { MovieCard } from "./MovieCard";
import usePagination from "hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { Paginations } from "../Paginations";
import { useGetDate } from "hooks/useGetDate";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

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

    /* React.useEffect(() => {
        if (key) {
            const data = {
                ...resPagination,
                tuNgay: dateBefore,
                denNgay: today,
            };
            dispatch(actions.getMovieWithDate(data));
        } else {
            const data = {
                ...resPagination,
                tuNgay: "05/06/2020",
                denNgay: "06/07/2020",
            };
            dispatch(actions.getMovieWithDate(data));
        }
    }, []); */

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
                <TabPane tab="Sắp chiếu" key="2"></TabPane>
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
