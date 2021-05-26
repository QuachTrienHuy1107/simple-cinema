import { Col, Row, Skeleton } from "antd";
import { Carousel } from "app/components/Common/Carousel";
import { Footer } from "app/components/Common/Footer";
import { Header } from "app/components/Common/Header";
import { Filter } from "app/components/Filter";
import { MovieList } from "app/components/MovieList";
import usePagination from "hooks/usePagination";
import { useScreenType } from "hooks/useScreenType";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Contact } from "./components/Contact";
import { Schedule } from "./components/Schedule";
import { useHomeSlice } from "./slice";
import { selectHome } from "./slice/selectors";
import { HomeState } from "./slice/types";

export const HomePage: React.FC<Record<never, never>> = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { cinemaList, isLoading, moviePagination } = useSelector(selectHome) as HomeState;
    const { actions } = useHomeSlice();
    const { Desktop, Tablet } = useScreenType();

    const { resPagination } = usePagination(1, 10);

    React.useEffect(() => {
        const data = {
            ...resPagination,
        };
        dispatch(actions.getPaginateMoviesAction(data));
    }, []);

    React.useEffect(() => {
        dispatch(actions.getAllCinemaListAction());
    }, [actions, dispatch]);

    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="Simple movie" />
            </Helmet>
            <>
                <Wrapper>
                    <Header />
                    <Carousel />
                    <Row justify="center" gutter={[0, 40]}>
                        <Col span={24}>
                            <Desktop>
                                <Filter movieList={moviePagination.items} />
                            </Desktop>

                            <MovieList />
                        </Col>
                        <Col span={24}>
                            {isLoading ? <Skeleton /> : <Schedule cinemaList={cinemaList} />}
                        </Col>
                    </Row>
                    <Contact />
                    <Footer />
                </Wrapper>
            </>
        </>
    );
};

const Wrapper = styled.div`
    margin: 0px 0 50px;
`;

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
