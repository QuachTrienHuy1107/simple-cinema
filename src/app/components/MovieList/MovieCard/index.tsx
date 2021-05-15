/**
 *
 * MovieCard
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Card, Progress } from "antd";
import { Link } from "react-router-dom";
import { PlayCircleOutlined } from "@ant-design/icons";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import { Image } from "app/components/Common/Image";

interface IMovieCardProps {
    movie: MovieResponse;
}

export const MovieCard = memo(({ movie }: IMovieCardProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <CardStyle
            cover={
                <CardLink to="/about">
                    <Image
                        style={{
                            backgroundImage: `url('${movie.hinhAnh}'), url('https://tix.vn/app/assets/img/default-film.webp')`,
                        }}
                    />

                    <Progress
                        type="circle"
                        percent={movie.danhGia * 10}
                        format={percent => `${percent}`}
                        className="movieCard__img--rating"
                        width={30}
                    />
                    <PlayCircleOutlined className="movieCard__img--play" />
                </CardLink>
            }
        >
            <Link to="/about">
                {/* <Meta title={movie.tenPhim} description={movie.moTa} /> */}
                <p className="ant-card-body__title">{movie.tenPhim}</p>
            </Link>
            <span className="ant-card-body__datetime">{movie.ngayKhoiChieu.substr(0, 10)}</span>
        </CardStyle>
    );
});

const CardStyle = styled(Card)`
    border: none;
    transition: all 0.5s;

    border-radius: 10px;

    .ant-card-body {
        padding: 9px 0px;

        &__title {
            font-weight: $bolder;
            font-size: 1.2rem;
            margin-bottom: 0px;
            @include TextEllipsis(2);
        }
        &__datetime {
            font-size: $text6;
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
        img {
            transform: scale(1.06);
            filter: blur(2px);
        }
        .movieCard__img {
            &::before {
                opacity: 1;
                visibility: visible;
            }
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
    }
`;

const CardLink = styled(Link)`
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
        color: $primaryColor;
        opacity: 0;
        visibility: hidden;
    }
`;
