/**
 *
 * Seat
 *
 */
import { Button, Col, message, Row, Skeleton, Space, Spin } from "antd";
import { useScreenType } from "hooks/useScreenType";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { useCheckoutContext } from "../../context/createContext";
import { useHandlePickSeat } from "../../hooks/useHandlePickSeat";
import { SeatType } from "../../slice/types";
import screenThumb from "./assets/screen.png";

interface ISeatProps {
    arrayTickets: SeatType[];
    isLoading: boolean;
}

export const Seat = memo(({ arrayTickets, isLoading }: ISeatProps) => {
    const { t, i18n } = useTranslation();
    const { handlePickSeat } = useHandlePickSeat();
    const { arraySeatSelected } = useCheckoutContext();
    const { SmallMobile, XSmallMobile } = useScreenType();

    let count = 0;
    let count1 = 0;

    const renderSeat = (seat: SeatType[]): any => {
        return seat?.map((item: SeatType, index: number) => {
            const classSeat = arraySeatSelected?.findIndex(seat => seat.maGhe === item.maGhe);
            const now = classSeat !== -1 ? "now" : "";
            return (
                <>
                    <XSmallMobile>
                        {index % 16 === 0 ? (
                            <SeatRow>{String.fromCharCode(97 + count++).toUpperCase()}</SeatRow>
                        ) : (
                            ""
                        )}
                        <Button
                            key={item.maGhe}
                            disabled={item.daDat}
                            onClick={() => {
                                if (arraySeatSelected.length === 10) {
                                    message.warning("Số lượng ghế không được vượt quá 10");
                                } else {
                                    handlePickSeat({
                                        id: item.maGhe,
                                        price: item.giaVe,
                                        seatName: item.tenGhe,
                                    });
                                }
                            }}
                            className={`seat__btn ${
                                (item.loaiGhe === "Vip" &&
                                    item.daDat === false &&
                                    "seat__btn--vip") ||
                                (item.daDat === true && "seat__btn--disabled")
                            } seat__btn--${now}`}
                        >
                            {/* {item.tenGhe} */}{" "}
                        </Button>{" "}
                        {(index + 1) % 16 === 0 ? <br /> : ""}
                    </XSmallMobile>

                    <SmallMobile>
                        {index % 16 === 0 ? (
                            <SeatRow>{String.fromCharCode(97 + count1++).toUpperCase()}</SeatRow>
                        ) : (
                            ""
                        )}
                        <Button
                            key={item.maGhe}
                            disabled={item.daDat}
                            onClick={() => {
                                handlePickSeat({
                                    id: item.maGhe,
                                    price: item.giaVe,
                                    seatName: item.tenGhe,
                                });
                            }}
                            className={`seat__btn ${
                                (item.loaiGhe === "Vip" &&
                                    item.daDat === false &&
                                    "seat__btn--vip") ||
                                (item.daDat === true && "seat__btn--disabled")
                            } seat__btn--${now} smBtnSeat`}
                        >
                            {" "}
                        </Button>
                        {(index + 1) % 16 === 0 ? <br /> : ""}
                    </SmallMobile>
                </>
            );
        });
    };

    return (
        <Wrapper>
            <Row justify="center">
                <Col xl={24} sm={24}>
                    <img src={screenThumb} alt="" width="100%" />
                </Col>
                {isLoading ? (
                    <Col xl={24} sm={24} style={{ textAlign: "center" }}>
                        <Skeleton />
                    </Col>
                ) : (
                    <ArraySeatStyle xl={24} sm={24}>
                        <div>{renderSeat(arrayTickets)}</div>
                    </ArraySeatStyle>
                )}
                <ColStyle xl={24} sm={24}>
                    <SeatDetail>
                        <Space direction="vertical" align="center">
                            <div className="seat__model seat__model--normal"></div>
                            <span>Ghế thường</span>
                        </Space>
                        <Space direction="vertical" align="center">
                            <div className="seat__model seat__model--vip"> </div>
                            <span>Ghế vip</span>
                        </Space>
                        <Space direction="vertical" align="center">
                            <div className="seat__model seat__model--booked"></div>
                            <span>Ghế đã đặt</span>
                        </Space>
                        <Space direction="vertical" align="center">
                            <div className="seat__model seat__model--booking"></div>
                            <span>Ghế đang đặt</span>
                        </Space>
                    </SeatDetail>
                </ColStyle>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    .seat__btn {
        width: 30px;
        height: 30px;
        margin: 0px 10px 10px 0;
        padding: 0;
        display: inline-block;
        background-color: #4b4e54;
        color: #fff;
        &--vip {
            background-color: #f9b204;
        }
        &--disabled {
            background-color: #f5f5f5;
        }
        &--now {
            background-color: #18ef18;
        }
        @media screen and (max-width: 1283px) {
            margin: 0 10px 15px 0;
        }
        @media screen and (max-width: 1100px) {
            width: 25px;
            height: 25px;
            margin: 0 8px 8px 0;
        }
        @media screen and (max-width: 992px) {
            width: 20px;
            height: 20px;
            margin: 0 6px 6px 0;
        }
        /*  @media screen and (max-width: 992px) {
            width: 20px;
            height: 20px;
            margin: 0 8px 8px 0;
        } */
        @media screen and (max-width: 756px) {
            width: 20px;
            height: 20px;
            font-size: 13px;
        }
    }
    .smBtnSeat {
        width: 20px;
        height: 20px;
        margin: 3px;
        @media screen and (max-width: 450px) {
            width: 15px;
            height: 15px;
        }
        @media screen and (max-width: 365px) {
            width: 13px;
            height: 13px;
        }
        @media screen and (max-width: 330px) {
            width: 10px;
            height: 10px;
        }
    }
`;

const ArraySeatStyle = styled(Col)`
    display: flex;
    justify-content: center;
    margin-top: -20px;
`;

const SeatDetail = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 20px auto;

    @media screen and (max-width: 992px) {
        width: 70%;
    }
    @media screen and (max-width: 576px) {
        width: 100%;
        font-size: 0.7rem;
    }

    .seat__model {
        width: 15px;
        height: 15px;
        border: 1px solid #000;

        &--normal {
            background: #4b4e54;
        }
        &--vip {
            background: #f9b204;
        }
        &--booked {
            background: #f5f5f5;
        }
        &--booking {
            background: #18ef18;
        }
    }
`;

const SeatRow = styled.span`
    display: inline-block;
    margin-right: 10px;
    width: 20px;
    font-weight: 600;

    @media screen and (max-width: 576px) {
        width: 15px;
        margin-right: 5px;
    }
    @media screen and (max-width: 460px) {
        transform: translateY(-5px);
    }
`;

const ColStyle = styled(Col)`
    width: 100%;
`;
