/**
 *
 * BannerDetail
 *
 */
import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { selectMovieDetail } from "../../slice/selectors";
import { useMovieDetailSlice } from "../../slice";
import { Col, Progress, Row, Timeline } from "antd";
import { Container } from "react-bootstrap";
import moment from "moment";
interface MovieDetailProps {}

export const BannerDetail = memo((props: MovieDetailProps) => {
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(selectMovieDetail);
    const { actions } = useMovieDetailSlice();
    useEffect(() => {
        dispatch(actions.getMovieDetailData());
    }, [dispatch]);

    // Style Components

    const Image = styled.div`
        position: relative;
        cursor: pointer;

        :hover {
            img {
                background-color: black;
            }
            i {
                transform: scale(1.2, 1.2);
                transition: 0.2s linear all;
                color: #386cd7;
            }
        }
        img {
            border-radius: 15px;
        }
        i {
            font-size: 60px;
            position: absolute;
            top: 40%;
            left: 40%;
            color: white;
        }
    `;
    const Container = styled.div`
        display: block;
        margin-left: 0px;
        margin-right: 0px;
        padding-top: 100px;
        @media screen and (min-width: 768px) {
            margin-left: 110px;
            margin-right: 110px;
            margin-bottom: 50px;
        }
    `;
    const TittleMovie = styled.h3`
        font-size: 2rem;
        color: white;
        margin-bottom: 15px;
        font-weight: 600;
    `;
    const Rate = styled.div`
        font-size: 1.2rem;
        margin-bottom: 12px;
        i {
            color: yellow;
        }
    `;
    const Date = styled.div`
        display: flex;
        margin-bottom: 26px;
        p {
            align-self: center;
            display: inline;
            background-color: #e73e2c;
            padding: 5px;
            border-radius: 5px;
            margin-right: 10px;
            font-weight: 600;
        }
        span {
            color: #e73e2c;
            font-weight: 700;
        }
        .time__start {
            line-height: 1.5em;
        }
    `;
    const Wrapper = styled.div`
        display: flex;
    `;
    const WrapperBanner = styled.div`
        display: flex;
        justify-content: space-between;
    `;
    const Detail = styled.div`
        margin-left: 50px;
        align-self: center;
    `;
    const RateTitle = styled.div`
        text-align: center;
        font-size: 1.2rem;
        color: #e73e2c;
    `;
    const BuyMovie = styled.a`
        background-color: #e73e2c;
        padding: 8px 30px;
        border-radius: 5px;
        margin-right: 10px;
        font-weight: 600;
        color: white;
        :hover {
            color: #386cd8;
        }
    `;
    return (
        <Container>
            <WrapperBanner>
                <div>
                    <Wrapper>
                        <a href={movieDetail.trailer}>
                            <Image>
                                <img width={260} height={350} src={movieDetail.hinhAnh} alt="" />
                                <i className="fa fa-play" />
                            </Image>
                        </a>
                        <Detail>
                            <div>
                                <TittleMovie>{movieDetail.tenPhim}</TittleMovie>
                                <Date>
                                    <p>{movieDetail.maNhom}</p>
                                    <div className="time__start">
                                        Ngày khởi chiếu:{" "}
                                        <span>
                                            {moment(movieDetail.ngayKhoiChieu).format(
                                                "MMMM Do YYYY",
                                            )}
                                        </span>
                                        <div>
                                            Thời gian:{" "}
                                            {moment(movieDetail.ngayKhoiChieu).format("hh:MM A")}
                                        </div>
                                    </div>
                                </Date>
                            </div>
                            <BuyMovie href="#schedule">Mua vé</BuyMovie>
                        </Detail>
                    </Wrapper>
                </div>
                <div>
                    <Rate>
                        <Progress
                            type="circle"
                            percent={movieDetail.danhGia * 10}
                            format={percent => `${percent + "%"}`}
                            width={120}
                        />
                        {/* <i className="fa fa-star" /> */}
                    </Rate>
                    <RateTitle>Đánh giá</RateTitle>
                </div>
            </WrapperBanner>
        </Container>
    );
});

const Div = styled.div``;
