/**
 *
 * MovieCard
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Card, Modal, Progress } from "antd";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import { MovieResponse } from "app/pages/HomePage/slice/types";

import { ROUTES } from "utils/constants/settings";
import star from "../../../assets/star1.png";
import moment from "moment";
import ModalVideo from "react-modal-video";
import ReactPlayer from "react-player";
import "./style.scss";
import { Img } from "app/components/Common/Image";
interface IMovieCardProps {
    movie: MovieResponse;
    isComming?: boolean;
}

export const MovieCard = memo(({ movie, isComming }: IMovieCardProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [open, setOpen] = React.useState(false);

    console.log("movie", movie);
    return (
        <>
            <CardStyle
                cover={
                    <CardInfo>
                        <Link to={`${ROUTES.MOVIEDETAIL}/${movie.maPhim}`}>
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
                <Link to={`${ROUTES.MOVIEDETAIL}/${movie.maPhim}`}>
                    <p className="ant-card-body__title">{movie.tenPhim}</p>
                </Link>
                <span className="ant-card-body__datetime">
                    {moment(movie.ngayKhoiChieu).format("DD-MM-YYYY")}
                </span>
            </CardStyle>

            <Modal
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                centered
                footer={<div style={{ padding: 0 }}></div>}
                width={520}
                style={{ padding: 0, border: "none" }}
                closable={false}
            >
                {/* <iframe
                    title={movie?.tenPhim}
                    width="800"
                    height="400"
                    src={`${movie.trailer}`}
                    className="video"
                ></iframe> */}
                <ReactPlayer
                    url={movie.trailer}
                    className="react-player"
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        transform: "translate(-50%,-50%)",
                    }}
                />
            </Modal>

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
        }
        &__datetime {
            font-size: 1rem;
        }
    }

    .ant-list-item-meta-description {
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
