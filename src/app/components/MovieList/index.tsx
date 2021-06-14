/**
 *
 * MovieList
 *
 */
import { Tabs } from "antd";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import { useGetDate } from "hooks/useGetDate";
import usePagination from "hooks/usePagination";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ANCHOR } from "utils/constants/settings";
import { PaginationResponseType } from "../Paginations/types";
import { MovieCard } from "./MovieCard";

interface Props {
    movieWithDate: MovieResponse[];
    moviePagination: PaginationResponseType;
}

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
                slidesToShow: 2,
                slidesPerRow: 1,
                slidesToScroll: 1,
                rows: 2,
            },
        },
    ],
};

const { TabPane } = Tabs;

export const MovieList = memo(({ moviePagination, movieWithDate }: Props) => {
    return (
        <Wrapper id={ANCHOR.MOVIELISTTO}>
            <Tabs defaultActiveKey="1" animated type="card" tabPosition="top">
                <TabPane tab="Đang chiếu" key="1">
                    <Slider {...settings}>
                        {movieWithDate?.map((movie: any) => (
                            <div key={movie.maPhim}>
                                <MovieCard movie={movie} />
                            </div>
                        ))}
                    </Slider>
                </TabPane>
                <TabPane tab="Sắp chiếu" key="2">
                    <Slider {...settings}>
                        {moviePagination.items?.map((movie: any) => (
                            <div key={movie.maPhim}>
                                <MovieCard movie={movie} isComming={true} />
                            </div>
                        ))}
                    </Slider>
                </TabPane>
            </Tabs>
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
        max-width: 1280px;
        width: 60%;
        margin: 0 auto;

        @media screen and (max-width: 1290px) {
            width: 80%;
        }

        ${media.medium`
            width: 100%;
        `}
    }
    button.slick-next {
        transform: translateX(-270px) !important;
        &:before {
            font-size: 2rem;
            color: #000000;
        }
        @media screen and (max-width: 992px) {
            display: none !important;
        }
    }
    button.slick-prev {
        transform: translateX(270px) !important;
        &:before {
            font-size: 2rem;
            color: #000000;
        }

        @media screen and (max-width: 992px) {
            display: none !important;
        }
    }

    .ant-tabs-tab-btn {
        font-size: 1.2rem;
        color: #000;
    }

    .ant-tabs-tab.ant-tabs-tab-active {
        .ant-tabs-tab-btn {
            color: #fb4226 !important;
        }
    }
`;
