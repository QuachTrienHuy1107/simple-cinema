/**
 *
 * Seat
 *
 */
import { Button, Col, Row, Skeleton, Space, Spin } from "antd";
import { useScreenType } from "hooks/useScreenType";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { useCheckoutContext } from "../../context/createContext";
import { useBooking } from "../../hooks/useBooking";
import { SeatType } from "../../slice/types";
import screenThumb from "./assets/screen.png";

interface ISeatProps {
    tickets: SeatType[];
    isLoading: boolean;
}

export const Seat = memo(({ tickets, isLoading }: ISeatProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { handlePickSeat } = useBooking();
    const { arraySeat } = useCheckoutContext();
    const { SmallMobile, XSmallMobile } = useScreenType();

    const renderSeat = (seat: SeatType[]): any => {
        return seat?.map((item: SeatType, index: number) => {
            const classSeat = arraySeat?.findIndex(seat => seat.maGhe === item.maGhe);
            const now = classSeat !== -1 ? "now" : "";
            return (
                <>
                    <XSmallMobile>
                        <Button
                            shape="circle"
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
                                ""
                            } seat__btn--${now}`}
                        >
                            {item.tenGhe}
                        </Button>
                        {(index + 1) % 16 === 0 ? <br /> : ""}
                    </XSmallMobile>

                    <SmallMobile>
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
                                ""
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
            <Row justify="center" gutter={[0, 10]}>
                <Col xl={24}>
                    <img src={screenThumb} alt="" width="100%" />
                </Col>
                {isLoading ? (
                    <Col xl={24} style={{ textAlign: "center" }}>
                        <Skeleton />
                    </Col>
                ) : (
                    <ArraySeatStyle xl={24}>
                        <div>{renderSeat(tickets)}</div>
                    </ArraySeatStyle>
                )}
                <Col xl={24}>
                    <SeatDetail>
                        <Space direction="vertical" align="center">
                            <button style={{ background: "#fff" }}> </button>
                            <span>Ghế thường</span>
                        </Space>
                        <Space direction="vertical" align="center">
                            <button style={{ background: "#ebff17" }}> </button>
                            <span>Ghế vip</span>
                        </Space>
                        <Space direction="vertical" align="center">
                            <button style={{ background: "#f5f5f5" }}> </button>
                            <span>Ghế đã đặt</span>
                        </Space>
                        <Space direction="vertical" align="center">
                            <button style={{ background: "#18ef18" }}> </button>
                            <span>Ghế đang đặt</span>
                        </Space>
                    </SeatDetail>
                </Col>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    .seat__btn {
        width: 40px;
        margin: 0px 10px 10px 0;
        padding: 0;
        display: inline-block;

        &--vip {
            background-color: #ebff17;
        }

        &--disabled {
            background-color: #252121;
        }

        &--now {
            background-color: #18ef18;
        }

        @media screen and (max-width: 1283px) {
            width: 35px;
            margin: 0 8px 8px 0;
        }
        @media screen and (max-width: 1100px) {
            width: 25px;
            margin: 0 3px 3px 0;
        }
        @media screen and (max-width: 576px) {
            width: 15px;
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
        @media screen and (max-width: 350px) {
            width: 10px;
            height: 10px;
        }
    }
`;

const ArraySeatStyle = styled(Col)`
    display: flex;
    justify-content: center;
`;

const SeatDetail = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;
    margin: 0 auto;

    button {
        width: 15px;
        height: 15px;
    }

    span {
        font-size: 0.7rem;
    }
`;
