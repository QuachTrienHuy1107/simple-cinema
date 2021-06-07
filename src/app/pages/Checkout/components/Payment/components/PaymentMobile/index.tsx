/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * PaymentMobile
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { useCheckoutContext } from "app/pages/Checkout/context/createContext";
import { Col, Divider, Drawer, Image, message, Row, Space, Tag } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { Food } from "../Food";
import { MovieBooking, SeatSelectedType } from "app/pages/Checkout/slice/types";
import { UserLoginResponse } from "app/pages/Form/slice/types";
import { useBooking } from "app/pages/Checkout/hooks/useBooking";
import { LeftOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import { useHandlePickFood } from "app/pages/Checkout/hooks/useHandlePickFood";
import { useSelector } from "react-redux";
import { selectCheckout } from "app/pages/Checkout/slice/selectors";
import { useCheckout } from "app/pages/Checkout/hooks/useCheckout";

interface Props {
    moviedetail: MovieBooking;

    credentials: UserLoginResponse;
}

export const PaymentMobile = memo(({ moviedetail, credentials }: Props) => {
    const { t, i18n } = useTranslation();
    const { arraySeatSelected } = useCheckoutContext();
    const [visible, setVisible] = React.useState(false);
    const { totalPrice } = useCheckout();
    const { bookingTicket } = useBooking();
    const { arrayFood } = useSelector(selectCheckout);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Wrapper>
            <Row>
                <Col span={12}>
                    <PaymentDetail>
                        <h3>
                            {totalPrice === "0" ? (
                                <span style={{ color: "red", fontSize: "0.7rem" }}>
                                    Mời bạn chọn ghế
                                </span>
                            ) : (
                                totalPrice
                            )}
                        </h3>
                        <span>
                            {arraySeatSelected?.map((item: any) => {
                                return <SeatItem color="magenta">{item.tenGhe}</SeatItem>;
                            })}
                        </span>
                    </PaymentDetail>
                </Col>
                <Col span={12}>
                    <ButtonStyle>
                        <Buttons
                            style={{
                                width: "100%",
                                borderRadius: 0,
                                backgroundColor: "#07f356",
                                fontSize: "1.5rem",
                            }}
                            onClick={() => {
                                if (arraySeatSelected.length !== 0) {
                                    showDrawer();
                                } else {
                                    message.warning("Vui lòng chọn ghế");
                                }
                            }}
                        >
                            Tiếp tục
                        </Buttons>
                    </ButtonStyle>
                    <Drawer
                        title={<TotalPrice className="totalPrice">{`${totalPrice} Đ`}</TotalPrice>}
                        placement="right"
                        width={"100%"}
                        closable={true}
                        onClose={onClose}
                        visible={visible}
                    >
                        <Detail>
                            <Col span={16}>
                                <h3 className="detail__title">{moviedetail?.tenPhim}</h3>
                                <p>
                                    <span className="detail__description">
                                        104 phút - 2D - phụ đề
                                    </span>
                                </p>
                                <p>
                                    <span>
                                        {arraySeatSelected?.map((item: SeatSelectedType) => {
                                            return (
                                                <SeatItem color="#87d068" key={item.maGhe}>
                                                    {item.tenGhe}
                                                </SeatItem>
                                            );
                                        })}
                                    </span>
                                </p>

                                <div className="detail__contact">
                                    <div className="detail__contact--item">
                                        <h3>Email</h3>
                                        <span>{credentials?.email}</span>
                                    </div>
                                    <div className="detail__contact--item">
                                        <h3>Số điện thoại</h3>
                                        <span>{credentials?.soDT}</span>
                                    </div>
                                </div>
                            </Col>
                            <Col span={8}>
                                <ImageStyle src={moviedetail?.hinhAnh} alt="" />
                            </Col>
                        </Detail>

                        <Divider />
                        <Content>
                            <h3>Ngày chiếu</h3>
                            <p>
                                {moviedetail?.ngayChieu} - {moviedetail?.gioChieu}
                            </p>
                        </Content>
                        <Divider dashed />
                        <Content>
                            <h3>Rạp</h3>
                            <p>
                                {moviedetail?.tenCumRap} - {moviedetail?.tenRap}
                            </p>
                        </Content>
                        <Divider dashed />
                        <Content>
                            <Food isMobile={true} />
                            {/* <p>
                                {arrayFood?.map(item => (
                                    <Content>
                                        <span>{item.quantity}</span> X <span>{item.name}</span>
                                    </Content>
                                ))}
                                total: {totalPrice}
                            </p> */}
                        </Content>
                        <Divider />
                        <Content>
                            <h3>Mã giảm giá</h3>
                            <p>0%</p>
                        </Content>

                        <Divider />

                        <ButtonCheckout>
                            <Buttons
                                onClick={() => {
                                    if (arraySeatSelected.length !== 0) {
                                        Swal.fire({
                                            title: "Vé sẽ được gửi qua email",
                                            text:
                                                "Vé đã mua không thể thu hồi! Bạn hãy kiểm tra kĩ trước khi thanh toán",
                                            icon: "warning",
                                            showCancelButton: true,
                                            confirmButtonColor: "#3085d6",
                                            cancelButtonColor: "#d33",
                                            confirmButtonText: "Thanh toán",
                                        }).then(async result => {
                                            if (result.isConfirmed) {
                                                await bookingTicket(
                                                    moviedetail.maLichChieu,
                                                    arraySeatSelected,
                                                );
                                            }
                                        });
                                    } else {
                                        message.warning("Vui lòng chọn ghế");
                                    }
                                }}
                                style={{
                                    width: "100%",
                                    height: 100,
                                    borderRadius: 0,
                                    backgroundColor: "#5ad00f",
                                    color: "#fff",
                                    fontSize: "1.5rem",
                                }}
                            >
                                Tính tiền
                            </Buttons>
                        </ButtonCheckout>
                    </Drawer>
                </Col>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div``;

const ButtonStyle = styled.div`
    width: 100%;
    position: relative;
    button {
        padding: 40px;
    }
`;

const TotalPrice = styled.h2`
    font-size: 1.5rem;
    color: green;
    transform: translateY(5px);
`;

const PaymentDetail = styled.div`
    text-align: center;
    height: 100%;
    background-color: #f9f9f9;

    > span {
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;

        span {
            margin-right: 5px;
        }
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
`;

const ImageStyle = styled(Image)`
    width: 100%;
    height: 160px !important;
`;

const Detail = styled(Row)`
    min-height: 160px;
    height: 160px;

    p {
        margin: 5px 0;
    }

    .detail {
        &__title {
            margin-bottom: -5px;
        }
        &__description {
            font-size: 0.7rem;
            color: #7d7d7d;
        }

        &__contact {
            &--item {
                display: flex;
                align-items: center;
                margin: 5px 0;
                h3 {
                    font-size: 0.8rem;
                    margin-bottom: 0;
                    margin-right: 5px;
                }
            }
        }
    }
`;

const ButtonCheckout = styled(ButtonStyle)`
    position: absolute;
    margin-top: 30px;
    bottom: 0;
    width: 100%;
    left: 0;
`;

const SeatItem = styled(Tag)`
    width: 35px;
    text-align: center;
`;
