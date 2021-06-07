/**
 *
 * Contact
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import img from "./assets/backapp.jpg";
import bgMobile from "./assets/mobile.png";
import { Button, Col, Row } from "antd";
import Slider from "react-slick";
import slide2 from "./assets/slide2.jpg";
import slide3 from "./assets/slide3.jpg";
import slide4 from "./assets/slide4.jpg";
import slide16 from "./assets/slide16.jpg";
import { ANCHOR } from "utils/constants/settings";

interface Props {}

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
};

export const Contact = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper id={ANCHOR.APPLiCATIONSTO}>
            <Content>
                <Row justify="center" gutter={[12, 24]}>
                    <ColStyled md={10}>
                        <h1>
                            Ứng dụng tiện lợi dành cho <br /> người yêu điện ảnh
                        </h1>
                        <p>
                            Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi
                            quà hấp dẫn.
                        </p>
                        <ButtonStyle>App miễn phí - Tải về ngay!</ButtonStyle>
                        <p>TIX có hai phiên bản iOS / Android</p>
                    </ColStyled>
                    <ColStyled md={10} offset={4} style={{ height: 350 }}>
                        <MobileScreen>
                            <Slider {...settings}>
                                <img src={slide2} alt="" />

                                <img src={slide3} alt="" />
                                <img src={slide4} alt="" />
                                <img src={slide16} alt="" />
                            </Slider>
                        </MobileScreen>
                    </ColStyled>
                </Row>
            </Content>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    background-image: url(${img});
    // height: 500px;
    padding: 120px 0 80px 0;
    background-size: contain;
    margin-top: 50px;
    color: #fff;

    h1 {
        color: #fff;
        font-size: 2rem;
    }
`;
const Content = styled.div`
    width: 70%;
    margin: 0 auto;

    p {
        margin: 10px 0;
    }
`;

const ColStyled = styled(Col)`
    width: 100%;
    margin: 0 auto;
`;

const ButtonStyle = styled(Button)`
    background-color: #fb4226;
    padding: 10px 20px;
    line-height: 10px;
    color: #fff;
    font-size: medium;
    font-weight: 700;
    border: none;
    border-radius: 4px;
`;

const MobileScreen = styled.div`
    // background-image: url(${bgMobile});
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 150px;
    height: 100%;
    overflow: hidden;
    border-radius: 14px;

    img {
        display: block;
        width: 100%;
    }
`;
