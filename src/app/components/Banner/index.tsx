/**
 *
 * BannerDetail
 *
 */
import { StarOutlined } from "@ant-design/icons";
import { Col, Progress, Row, Space } from "antd";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import React, { memo } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { Buttons } from "../Common/Buttons";

interface MovieDetailProps {
    movieDetail: any;
}

export const Banner = memo(({ movieDetail }: MovieDetailProps) => {
    const dispatch = useDispatch();
    const { Mobile, Desktop } = useScreenType();
    // const { actions } = useMovieDetailSlice();

    return (
        <>
            <Wrapper>
                <BannerDetail>
                    <img src={movieDetail.hinhAnh} alt="" style={{ width: "100%" }} />
                    <Content>
                        <Desktop>
                            <Row justify="center" align="middle">
                                <Col lg={16} xl={14}>
                                    <Space>
                                        <a href={movieDetail.trailer}>
                                            <Image>
                                                <img
                                                    width={260}
                                                    height={350}
                                                    src={movieDetail.hinhAnh}
                                                    alt=""
                                                />
                                                <i className="fa fa-play" />
                                            </Image>
                                        </a>
                                        <Detail>
                                            <Date>
                                                <span>
                                                    {moment(movieDetail.ngayKhoiChieu).format(
                                                        "DD-MM-YYYY",
                                                    )}
                                                </span>
                                                <Space>
                                                    <p>{movieDetail.maNhom}</p>
                                                    <TittleMovie>{movieDetail.tenPhim}</TittleMovie>
                                                </Space>

                                                <span>
                                                    <span>Thời gian: </span>
                                                    {moment(movieDetail.ngayKhoiChieu).format(
                                                        "hh:MM A",
                                                    )}
                                                </span>
                                                <ButtonBooking>Mua vé</ButtonBooking>
                                            </Date>
                                        </Detail>
                                    </Space>
                                </Col>
                                <Col lg={8} xl={8}>
                                    <Rate>
                                        <Progress
                                            type="circle"
                                            percent={movieDetail.danhGia * 10}
                                            format={percent => `${percent + "%"}`}
                                            width={120}
                                        />
                                        {/* <i className="fa fa-star" /> */}
                                    </Rate>
                                    <RateTitle>
                                        <Space>
                                            <StarOutlined />
                                            <StarOutlined />
                                            <StarOutlined />
                                            <StarOutlined />
                                            <StarOutlined />
                                        </Space>
                                        <p style={{ color: "#fff", margin: "20px 0" }}>
                                            43 người đánh giá
                                        </p>
                                    </RateTitle>
                                </Col>
                            </Row>
                        </Desktop>
                    </Content>
                </BannerDetail>
                <Mobile>
                    <MobileContent>
                        <Detail>
                            <Date>
                                <span className="datetime">
                                    {moment(movieDetail.ngayKhoiChieu).format("DD-MM-YYYY")}
                                </span>
                                <Space>
                                    <p>{movieDetail.maNhom}</p>
                                    <TittleMovie>{movieDetail.tenPhim}</TittleMovie>
                                </Space>

                                <span className="datetime">
                                    <span>Thời gian: </span>
                                    {moment(movieDetail.ngayKhoiChieu).format("hh:MM A")}
                                </span>
                            </Date>
                        </Detail>
                    </MobileContent>
                </Mobile>
            </Wrapper>
        </>
    );
});

// Style Components

const Wrapper = styled.div`
    /* height: 500px;
    min-height: 800px; */
`;

const BannerDetail = styled.div`
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 18% 32%;
    position: relative;
    height: 500px;
    overflow: hidden;

    > img {
        filter: blur(15px);
        margin: -50px 0 -5px -10px;
        width: calc(100% + 5px);
        height: 800px;

        ${media.small`
    filter: blur(0);
    margin: -50px 0 -5px 0px;
    `}
    }

    &:before {
        content: "";
        background: linear-gradient(to top, rgb(10, 32, 41), transparent 100%);
        height: 100%;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
    }
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 100%;
`;

const Image = styled.div`
    position: relative;
    cursor: pointer;
    ${media.small`
    display: none;
    `}

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

const Detail = styled.div`
    margin-left: 20px;
    align-self: center;
`;

const TittleMovie = styled.h3`
    font-size: 2rem;
    color: white;
    margin-bottom: 15px;
    font-weight: 600;
`;
const Date = styled.div`
    display: flex;
    flex-direction: column;

    span {
        color: #fff;
        font-weight: 700;
    }

    p {
        align-self: center;
        display: inline;
        color: #fff;
        background-color: #e73e2c;
        padding: 5px;
        border-radius: 5px;
        font-weight: 600;
    }

    .datetime {
        color: #a1a0a0;
        font-size: 0.9rem;
    }
`;

const ButtonBooking = styled(Buttons)`
    background-color: #e73e2c;
    padding: 8px 30px;
    border-radius: 5px;
    margin-right: 10px;
    font-weight: 600;
    margin-top: 15px;
    :hover {
        background-color: #e73e2c !important;
        span {
            color: #fff;
        }
    }
`;

const Rate = styled.div`
    font-size: 1.2rem;
    margin-bottom: 12px;
    text-align: center;
    i {
        color: yellow;
    }
`;

const RateTitle = styled.div`
    text-align: center;
    font-size: 1.2rem;
    color: #e73e2c;
`;

const MobileContent = styled.div`
    background-color: rgb(10, 32, 41);
`;
