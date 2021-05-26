/**
 *
 * MovieList
 *
 */
import { Avatar, Button, List, Row, Tabs } from "antd";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import { useGetDate } from "hooks/useGetDate";
import usePagination from "hooks/usePagination";
import { useScreenType } from "hooks/useScreenType";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { carouselData } from "../Common/Carousel";
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
    const { Desktop, Mobile } = useScreenType();
    const { actions } = useHomeSlice();
    const { moviePagination, movie, isLoading } = useSelector(selectHome);
    const [count, setCount] = React.useState(1);
    const { resPagination } = usePagination(1, 16);
    const [key, setKey] = React.useState<boolean>(false);

    console.log("resPagination", resPagination);

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

    console.log("movie", movie);

    const loadMore = (
        <div style={{ textAlign: "center" }}>
            <Button
                onClick={() => {
                    setCount(count + 3);
                    const data = {
                        ...resPagination,
                        tuNgay: dateBefore,
                        denNgay: today,
                    };
                    dispatch(actions.getMovieWithDate(data));
                }}
            >
                Xem thêm
            </Button>
        </div>
    );

    console.log("carouselData", carouselData.length);

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" onChange={key => setKey(true)} animated type="card">
                <TabPane tab="Đang chiếu" key="1">
                    <Desktop>
                        <Slider {...settings}>
                            {movie?.map((movie: any) => (
                                <div key={movie.maPhim}>
                                    <MovieCard movie={movie} />
                                </div>
                            ))}
                        </Slider>
                    </Desktop>
                    <Mobile>
                        <List
                            style={{ padding: "20px 10px 0" }}
                            itemLayout="horizontal"
                            dataSource={movie}
                            loadMore={loadMore}
                            // loading={true}
                            renderItem={(item: any, index: number) => {
                                return (
                                    <List.Item key={item.maPhim}>
                                        <img
                                            src={item.hinhAnh}
                                            alt={item.tenPhim}
                                            style={{ width: "100%", height: 250 }}
                                        />
                                    </List.Item>
                                );
                            }}
                            /* renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                    />
                                </List.Item>
                            )} */
                        />
                    </Mobile>
                </TabPane>
                <TabPane tab="Sắp chiếu" key="2">
                    <Desktop>
                        <Slider {...settings}>
                            {moviePagination?.items?.map((movie: any) => (
                                <div key={movie.maPhim}>
                                    <MovieCard movie={movie} isComming={true} />
                                </div>
                            ))}
                        </Slider>
                    </Desktop>
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
    }

    .ant-tabs-tab.ant-tabs-tab-active {
        color: #ff2f00;
    }
`;
