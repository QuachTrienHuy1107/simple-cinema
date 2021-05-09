import { Col, Row } from "antd";
import { MovieList } from "app/components/MovieList";
import { Schedule } from "app/components/Schedule";
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import img from "./assets/img/banner01.jpg";
import { HomeMessages } from "./messages";
import { useHomeSlice } from "./slice";
import { selectHome } from "./slice/selectors";

export function HomePage() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { cinemaList } = useSelector(selectHome);
    const { actions } = useHomeSlice();

    React.useEffect(() => {
        dispatch(actions.getAllCinemaListAction());
    }, [dispatch]);

    return (
        <>
            <Helmet>
                <title>Home Page</title>
                <meta name="description" content="A Boilerplate application homepage" />
            </Helmet>
            <Wrapper>
                <CarouselStyled>
                    <Content>
                        <h1>{t(HomeMessages.Title())}</h1>
                        <p>{t(HomeMessages.Desc())}</p>
                    </Content>
                </CarouselStyled>
                <Row justify="center">
                    <Col span={20}>
                        <MovieList />
                    </Col>
                    <Col span={20}>
                        <Schedule cinemaList={cinemaList} />
                    </Col>
                </Row>
            </Wrapper>
        </>
    );
}

const Wrapper = styled.div``;

const Content = styled.div`
    position: relative;
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

const CarouselStyled = styled.div`
    background-image: url(${img});
    background-size: cover;
    background-repeat: no-repeat;
    background-color: ${p => p.theme.primaryBg};
    width: auto;
    height: 500px;
    position: relative;
    background-position: center center;
    &::before {
        content: "";
        position: absolute;
        z-index: 0;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(180deg, rgba(19, 23, 32, 0.5) 0%, #131720 100%);
        &:hover {
            box-shadow: 5px 10px linear-gradient(169deg, #5560ff 17%, #aa52a1 63%, #ff4343 100%);
        }
    }
`;
