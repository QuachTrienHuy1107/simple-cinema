/**
 *
 * BannerDetail
 *
 */
import { Col, Progress, Rate, Row, Space } from "antd";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import React, { memo } from "react";
import ReactPlayer from "react-player";
import { Link } from "react-scroll";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ANCHOR } from "utils/constants/settings";
import iconPlay from "./assets/play-video.png";

interface MovieDetailProps {
    movieDetail: any;
}

export const Banner = memo(({ movieDetail }: MovieDetailProps) => {
    const { Mobile, Desktop } = useScreenType();
    const [isPlay, setPlay] = React.useState(false);
    const handlePlay = () => {
        setPlay(true);
    };

    return (
        <>
            <Wrapper>
                <BannerDetail>
                    <img
                        src={movieDetail.hinhAnh}
                        alt=""
                        style={{ width: "100%", display: isPlay ? "none" : "block" }}
                    />
                    <Mobile>
                        <Content>
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src={iconPlay}
                                    alt="play"
                                    className="iconPlay"
                                    onClick={handlePlay}
                                    style={{ display: (isPlay && "none") || "inline-block" }}
                                />
                            </div>
                        </Content>
                    </Mobile>

                    <ReactPlayer
                        url={movieDetail.trailer}
                        className="react-player"
                        controls={true}
                        style={{ display: isPlay ? "block" : "none" }}
                        // ref={play}
                    />
                    <Content>
                        <Desktop>
                            <Row justify="center" align="middle">
                                <Col lg={16} xl={14}>
                                    <Space>
                                        <ImageStyle>
                                            <img
                                                width={260}
                                                height={360}
                                                src={movieDetail.hinhAnh}
                                                alt=""
                                            />
                                            {/* <i className="fa fa-play" /> */}
                                        </ImageStyle>
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
                                                <ButtonBooking>
                                                    <Link
                                                        activeClass="active"
                                                        to={ANCHOR.SCHEDULEFORM}
                                                        spy={true}
                                                        smooth={true}
                                                        hashSpy={true}
                                                        offset={-50}
                                                        duration={500}
                                                    >
                                                        Mua vé
                                                    </Link>
                                                </ButtonBooking>
                                            </Date>
                                        </Detail>
                                    </Space>
                                </Col>
                                <Col lg={8} xl={8}>
                                    <Score>
                                        <Progress
                                            type="circle"
                                            percent={movieDetail.danhGia * 10}
                                            format={percent => `${percent + "%"}`}
                                            width={120}
                                        />
                                    </Score>
                                    <RateTitle>
                                        <Rate disabled defaultValue={5} />
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
    position: relative;
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

    .react-player {
        display: block;
        height: 100% !important;
        width: 100% !important;
        position: absolute;
        z-index: 3;
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

    @media screen and (max-width: 576px) {
        height: 350px;
    }
`;

const Content = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 3;
    width: 100%;

    .iconPlay {
        width: 80px;
        color: #fff;
        text-align: center;
    }
`;

const ImageStyle = styled.div`
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

const ButtonBooking = styled.div`
    a {
        color: #fff;
        font-size: 1.2rem;
        display: inline-block;
        width: 170px;
        text-align: center;
        background-color: #e73e2c;
        padding: 10px 0px;
        border-radius: 5px;
        margin-right: 10px;
        font-weight: 600;
        margin-top: 15px;
        cursor: pointer;
        -webkit-transition: all 0.4s;
        transition: all 0.4s;

        &:hover {
            background-color: #ef602a;
        }
    }
`;

const Score = styled.div`
    font-size: 1.2rem;
    margin-bottom: 12px;
    text-align: center;
    i {
        color: yellow;
    }
    span {
        color: #fff !important;
        font-size: 2rem !important;
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
