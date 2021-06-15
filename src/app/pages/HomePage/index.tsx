import { BackTop, Col, Row, Skeleton } from "antd";
import { Carousel } from "app/components/Common/Carousel";
import { Loading } from "app/components/Common/Loading";
import { Filter } from "app/components/Filter";
import { MovieList } from "app/components/MovieList";
import { MovieListMobile } from "app/components/MovieList/MovieListMobile";
import { useGetDate } from "hooks/useGetDate";
import usePagination from "hooks/usePagination";
import { useScreenType } from "hooks/useScreenType";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { useLocation } from "react-router";
import styled from "styled-components";
import backNews from "./assets/back-news.png";
import { Contact } from "./components/Contact";
import { News } from "./components/News";
import { Schedule } from "./components/Schedule";
import { useHomeSlice } from "./slice";
import { selectHome } from "./slice/selectors";
import { HomeState } from "./slice/types";

export const HomePage: React.FC<Record<never, never>> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { cinemaList, isLoading, moviePagination, movieWithDate } = useSelector(
        selectHome,
    ) as HomeState;
    const { actions } = useHomeSlice();
    const { today, dateBefore } = useGetDate();
    const { Desktop, Mobile } = useScreenType();
    const isMobile = useMediaQuery({ minWidth: 0, maxWidth: 767 });
    const { resPagination } = usePagination(1, isMobile ? 10 : 20);

    const location = useLocation();

    React.useEffect(() => {
        const data = {
            ...resPagination,
            tuNgay: "01/01/2019", //  dateBefore,
            denNgay: "30/04/2021", //today,
        };
        dispatch(actions.fetchMultiApi(data));
        dispatch(actions.getPaginateMoviesAction(resPagination));

        const go = setTimeout(() => {
            if (location.state) {
                const { url } = location.state as any;
                const ele = document.getElementById(url || "") as any;
                if (ele) {
                    ele.scrollIntoView({ block: "nearest", behavior: "smooth" });
                }
            }
        }, 2000);

        return () => {
            dispatch(actions.clearData());
            clearTimeout(go);
        };
    }, []);

    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="Simple movie" />
            </Helmet>
            <>
                {isLoading && <Loading />}
                <Wrapper>
                    <BackTop duration={1000} visibilityHeight={1500} />
                    <Carousel />
                    <Row justify="center" gutter={[0, 40]}>
                        <Col span={24}>
                            <Desktop>
                                <Filter movieList={moviePagination.items} />
                                <MovieList
                                    moviePagination={moviePagination}
                                    movieWithDate={movieWithDate}
                                />
                            </Desktop>
                            <Mobile>
                                <MovieListMobile
                                    moviePagination={moviePagination}
                                    movieWithDate={movieWithDate}
                                />
                            </Mobile>
                        </Col>
                        <Col span={24}>
                            <BackNews></BackNews>
                            {isLoading ? <Skeleton /> : <Schedule cinemaList={cinemaList} />}
                        </Col>
                        <Col span={24}>
                            <News />
                        </Col>
                    </Row>

                    <Contact />

                    {/* <Playground /> */}
                </Wrapper>
            </>
        </>
    );
};

const Wrapper = styled.div``;

const BackNews = styled.div`
    background-image: url(${backNews});
    background-size: 100%;
    background-repeat: no-repeat;
    padding-top: 120px;
`;

const Content = styled.div`
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    h1 {
        font-size: 4rem;
        font-weight: 600;
        font-family: Bold;

        @media screen and (max-width: 756px) {
            font-size: 3rem;
        }
    }

    p {
        font-size: 2rem;
    }
`;
