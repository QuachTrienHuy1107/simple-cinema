/**
 *
 * Seat
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Col, Row, Spin } from "antd";
import screenThumb from "./assets/screen-thumb.png";
import { SeatType } from "../../slice/types";
import { Buttons } from "app/components/Common/Buttons";
import { useBooking } from "../../hooks/useBooking";
import { CheckoutContext, useCheckoutContext } from "../../context/createContext";

interface ISeatProps {
    tickets: SeatType[];
    isLoading: boolean;
}

export const Seat = memo(({ tickets, isLoading }: ISeatProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { handlePickSeat } = useBooking();
    const { arraySeat } = useCheckoutContext();

    const renderSeat = (seat: SeatType[]): any => {
        return seat?.map((item: SeatType, index: number) => {
            const classSeat = arraySeat?.findIndex(ghe => ghe.maGhe === item.maGhe);
            const now = classSeat !== -1 ? "now" : "";

            return (
                <div style={{ display: "inline-block" }}>
                    <Button
                        shape="circle"
                        key={item.maGhe}
                        disabled={item.daDat}
                        onClick={() => {
                            handlePickSeat({ id: item.maGhe, price: item.giaVe });
                        }}
                        className={`seat__btn ${
                            (item.loaiGhe === "Vip" && item.daDat === false && "seat__btn--vip") ||
                            ""
                        } seat__btn--${now}`}
                    >
                        {item.tenGhe}
                    </Button>
                    {(index + 1) % 16 === 0 ? <br /> : ""}
                </div>
            );
        });
    };

    return (
        <Wrapper>
            <Row justify="center" gutter={[0, 48]}>
                <Col span={22}>
                    <div className="seat__screen">
                        <img src={screenThumb} alt="" />
                    </div>
                </Col>
                {isLoading ? (
                    <Col span={22} style={{ textAlign: "center" }}>
                        <Spin />
                    </Col>
                ) : (
                    <Col span={22}>
                        <div>{renderSeat(tickets)}</div>
                    </Col>
                )}
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    .seat__btn {
        width: 40px;
        margin: 0px 10px 10px 0;
        padding: 0;

        &--vip {
            background-color: #7e4707;
        }

        &--disabled {
            background-color: #252121;
        }

        &--now {
            background-color: green;
        }
    }
`;

const SeatArray = styled.div`
    display: inline-block;
`;
