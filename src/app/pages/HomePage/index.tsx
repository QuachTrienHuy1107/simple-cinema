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
import { scroller } from "react-scroll";
import styled from "styled-components";
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
    const [loadData, setLoadData] = React.useState(3);
    const { resPagination, handlePageChange } = usePagination(1, isMobile ? 10 : 10);

    const location = useLocation();

    console.log("resPagination", resPagination);
    console.log("loadData", loadData);

    React.useEffect(() => {
        const data = {
            ...resPagination,
            tuNgay: dateBefore,
            denNgay: today,
        };
        dispatch(actions.fetchMultiApi(data));
        dispatch(actions.getPaginateMoviesAction(resPagination));

        if (location.state) {
            const { url } = location.state as any;
            scroller.scrollTo(url, false, 0, -65);
        }

        return () => {
            dispatch(actions.clearData());
        };
    }, []);

    console.log("moviePagination", moviePagination);

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
                                    handlePageChange={handlePageChange}
                                    moviePagination={moviePagination}
                                    movieWithDate={movieWithDate}
                                    isLoading={isLoading}
                                />
                            </Mobile>
                        </Col>
                        <Col span={24}>
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

const CarouselStyled = styled.div`
    position: relative;
    video {
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        object-fit: cover;
        background-attachment: scroll;
    }
    background-color: ${p => p.theme.primaryBg};
    width: auto;
    height: 100vh;

    &::before {
        content: "";
        position: absolute;
        z-index: 1;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(19, 23, 32, 0) 0%, #131720 100%);
        pointer-events: none;
    }
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
