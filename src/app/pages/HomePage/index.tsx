import { Button, Col, Row, Skeleton, Spin } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { Footer } from "app/components/Common/Footer";
import { Header } from "app/components/Common/Header";
import { MovieList } from "app/components/MovieList";
import { SearchForm } from "app/components/SearchForm";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import { HomeMessages } from "./messages";
import { useHomeSlice } from "./slice";
import { selectHome } from "./slice/selectors";
import video from "./assets/img/Halloween.mp4";
import { Schedule } from "./components/Schedule";
import { Loading } from "app/components/Common/Loading";
import { ROUTES } from "utils/constants/settings";
import { useGetDate } from "hooks/useGetDate";
import usePagination from "hooks/usePagination";
import { HomeState } from "./slice/types";
import { Contact } from "./components/Contact";

export function HomePage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { cinemaList, isLoading, movie, moviePagination } = useSelector(selectHome) as HomeState;
    const { actions } = useHomeSlice();
    const { today, dateBefore } = useGetDate();
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
                <meta name="description" content="A Boilerplate application homepage" />
            </Helmet>
            <>
                <Header />
                <Wrapper>
                    <CarouselStyled>
                        <video src={video} loop autoPlay muted height="100vh"></video>
                        <Content>
                            <h1>{t(HomeMessages.Title())}</h1>
                            <p>{t(HomeMessages.Desc())}</p>
                        </Content>
                    </CarouselStyled>
                    <Row justify="center" gutter={[0, 40]}>
                        <Col span={20}>
                            <SearchForm movieList={moviePagination.items} />

                            <MovieList />
                        </Col>
                        <Col span={20}>
                            {isLoading ? <Skeleton /> : <Schedule cinemaList={cinemaList} />}
                        </Col>
                    </Row>
                </Wrapper>
                <Contact />
                <Footer />
            </>

            <Switch>
                <Route exact path={`${ROUTES.MOVIELIST}`} component={MovieList} />
            </Switch>
        </>
    );
}

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
