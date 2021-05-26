/**
 *
 * Carousels
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import banner1 from "./assets/banner1.jpg";
import banner2 from "./assets/banner2.png";
import banner3 from "./assets/banner3.png";
import Slider from "react-slick";
import { media } from "styles/media";

interface Props {}

const settings = {
    className: "center",
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export const carouselData = [
    {
        maPhim: 1,
        hinhAnh: banner1,
        tenPhim: "banner 1",
    },
    {
        maPhim: 2,
        hinhAnh: banner2,
        tenPhim: "banner 2",
    },
    {
        maPhim: 3,
        hinhAnh: banner3,
        tenPhim: "banner 3",
    },
];

export const Carousel = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Slider {...settings}>
                {carouselData.map(item => {
                    return (
                        <div key={item.maPhim}>
                            <img src={item.hinhAnh} alt={item.tenPhim} width="100%" height="700" />
                        </div>
                    );
                })}
            </Slider>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    overflow: hidden;

    ${media.small`
        display: none;
    `}
`;
