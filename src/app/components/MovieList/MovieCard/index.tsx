/**
 *
 * MovieCard
 *
 */
import { PlayCircleOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import { Img } from "app/components/Common/Image";
import { ModalShow } from "app/components/ModalShow";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { ROUTES } from "utils/constants/settings";
import star from "../../../assets/star1.png";

interface IMovieCardProps {
    movie: MovieResponse;
    isComming?: boolean;
}

export const MovieCard = memo(({ movie, isComming }: IMovieCardProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [open, setOpen] = React.useState(false);
    const play = React.useRef(null) as any;

    const handleOk = () => {
        setOpen(!open);
    };

    const handleCancle = () => {
        setOpen(false);
        if (play.current !== null) {
            play.current.getInternalPlayer().pauseVideo();
        }
    };

    return (
        <>
            <CardStyle
                cover={
                    <CardInfo>
                        <Link
                            to={{
                                pathname: `${ROUTES.MOVIEDETAIL}/${movie.maPhim}`,
                                state: { isComming },
                            }}
                        >
                            <Img
                                height="350"
                                className="card__img"
                                style={{
                                    backgroundImage: `url('${movie.hinhAnh}'), url('https://tix.vn/app/assets/img/default-film.webp')`,
                                }}
                            />
                        </Link>

                        {movie.danhGia ? (
                            <Rating>
                                <p className="rate">{movie.danhGia}</p>
                                <p>
                                    <ImgStyle src={star} alt="" />
                                    <ImgStyle src={star} alt="" />
                                    <ImgStyle src={star} alt="" />
                                    <ImgStyle src={star} alt="" />
                                </p>
                            </Rating>
                        ) : (
                            ""
                        )}

                        <PlayCircleOutlined
                            className="movieCard__img--play"
                            onClick={() => {
                                setOpen(true);
                            }}
                        />
                    </CardInfo>
                }
            >
                <Link
                    to={{ pathname: `${ROUTES.MOVIEDETAIL}/${movie.maPhim}`, state: { isComming } }}
                >
                    <Tooltip title={movie.tenPhim} color="#87d068">
                        <p className="ant-card-body__title">{movie.tenPhim}</p>
                    </Tooltip>
                </Link>
                <span className="ant-card-body__datetime">
                    {!isComming && moment(movie.ngayKhoiChieu).format("DD-MM-YYYY")}
                </span>
            </CardStyle>

            <ModalShow open={open} onOpen={handleOk} onCancle={handleCancle}>
                <ReactPlayer
                    url={movie.trailer}
                    className="react-player"
                    controls={true}
                    ref={play}
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                />
            </ModalShow>
            {/* <ModalVideo
                channel="youtube"
                isOpen={open}
                videoId="https://youtu.be/TcMBFSGVi1c"
                onClose={() => setOpen(false)}
                maxwidth={"100%"}
                maxheight={"100%"}
            /> */}
        </>
    );
});

const CardStyle = styled(Card)`
    border: none;
    transition: all 0.5s;
    border-radius: 10px;

    padding: 10px;

    > a {
        height: 300px;
        display: block;
    }

    a {
        color: #000;
        font-weight: 500;

        &:hover {
            color: #fb4226;
        }
    }

    .ant-card-body {
        padding: 9px 0px;

        &__title {
            font-size: 1.2rem;
            margin-bottom: 0px;
            text-overflow: ellipsis;

            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        &__datetime {
            font-size: 0.8rem;
            color: #656363;
            margin-top: -2px;
            display: block;
        }
    }

    .ant-list-item-meta-description {
    }

    &:hover {
        .card__img {
            transform: scale(1.06);
            filter: blur(2px);
        }

        .movieCard__img--rating {
            transition: all 1.2s;
            opacity: 1;
            visibility: visible;
        }

        .movieCard__img--play {
            transition: all 1.2s;
            opacity: 1;
            visibility: visible;
        }

        .card__detail {
            display: none;
        }

        .ant-btn {
            display: block;
        }
    }

    .ant-btn {
        display: none;
    }
`;

const CardInfo = styled.div`
    position: relative;
    transition: all 0.5s;
    overflow: hidden;

    border-top-left-radius: 10px;
    border-top-right-radius: 10px;

    &::before {
        content: "";
        position: absolute;
        display: block;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        z-index: 2;
        background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0.8) 75%,
            rgba(0, 0, 0, 0.9) 100%
        );
        opacity: 0.1;
        visibility: hidden;
        transition: 0.5s;
        width: 100%;
        height: 100%;
    }

    .movieCard__img--rating {
        background-color: #081c22;
        font-weight: 800;
        color: $primaryColor;
        border: 3px solid #383434;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        top: 10px;
        opacity: 0;
        visibility: hidden;
        z-index: 3;
    }

    .movieCard__img--play {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
        font-size: 3rem;
        color: #fff;
        opacity: 0;
        visibility: hidden;
    }

    .ant-modal-body {
        position: relative;
        padding: 0;

        .video {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
`;

const Rating = styled.div`
    font-size: 16px;
    background-color: rgba(12, 27, 54, 0.8);
    border: 1px solid #1f2e46;
    border-radius: 4px;
    padding: 2px;
    position: absolute;
    top: 12px;
    right: 12px;
    color: #fff;
    width: 54px;
    text-align: center;
    line-height: 1.1;

    .rate {
        font-size: 1.2rem;
    }

    p {
        margin-bottom: 0;
    }
`;

const ImgStyle = styled(Img)`
    width: 8px;
    display: inline-block !important;
`;

const MovieDesc = styled.div``;
