/**
 *
 * Payment
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Card, Divider, Skeleton } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { MovieBooking, ArraySeat } from "../../slice/types";
import { useCheckoutContext } from "../../context/createContext";
import { useCheckoutSlice } from "../../slice";
import { useSelector } from "react-redux";
import { selectCheckout } from "../../slice/selectors";
import { useBooking } from "../../hooks/useBooking";

interface IPaymentProps {
    moviedetail: MovieBooking;
    isLoading: boolean;
}

export const Payment = memo(({ moviedetail, isLoading }: IPaymentProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { arraySeat, bookingTicket, username } = useCheckoutContext();
    const { setArraySeat } = useBooking();
    const { message } = useSelector(selectCheckout);

    const totalPrice = arraySeat?.reduce((total: number, item: ArraySeat) => {
        return (total += item.giaVe);
    }, 0);

    console.log("arraySeat", arraySeat);

    if (message) {
        // alert("Đặt vé thành công");
        setArraySeat([]);
    }

    return (
        <Wrapper>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Card title={<h1 style={{ textAlign: "center" }}>{moviedetail?.tenPhim}</h1>}>
                    <h1 style={{ textAlign: "center" }}>{totalPrice}</h1>
                    <Divider dashed />
                    <Content>
                        <h3>Ngày chiếu</h3>
                        <p>{moviedetail?.ngayChieu}</p>
                    </Content>
                    <Divider dashed />
                    <Content>
                        <h3>Giờ chiếu</h3>
                        <p>{moviedetail?.gioChieu}</p>
                    </Content>
                    <Divider dashed />
                    <Content>
                        <h3>Cụm rạp</h3>
                        <p>{moviedetail?.tenCumRap}</p>
                    </Content>
                    <Divider dashed />
                    <Content>
                        <h3>Rạp</h3>
                        <p>{moviedetail?.tenRap}</p>
                    </Content>
                    <Divider dashed />
                    <Content>
                        <h3>Ghế</h3>
                        <p>123</p>
                    </Content>
                    <Divider dashed />

                    <Buttons
                        onClick={() => {
                            const values = {
                                maLichChieu: moviedetail.maLichChieu,
                                danhSachVe: arraySeat,
                                taiKhoanNguoiDung: username,
                            };
                            bookingTicket(moviedetail.maLichChieu, arraySeat, username);
                        }}
                        style={{ width: "100%", height: 100, borderRadius: 0, color: "#fff" }}
                    >
                        Tính tiền
                    </Buttons>
                </Card>
            )}
        </Wrapper>
    );
});

const Wrapper = styled.div`
    .ant-card-body {
        padding: 0;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 10px 20px;
`;
