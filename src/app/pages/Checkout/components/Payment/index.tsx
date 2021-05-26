/**
 *
 * Payment
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Card, Col, Divider, Drawer, Row, Skeleton, Space, Tag } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { MovieBooking, ArraySeat } from "../../slice/types";
import { useCheckoutContext } from "../../context/createContext";
import { useCheckoutSlice } from "../../slice";
import { useSelector } from "react-redux";
import { selectCheckout } from "../../slice/selectors";
import { useBooking } from "../../hooks/useBooking";
import { useHistory } from "react-router";
import { useScreenType } from "hooks/useScreenType";
import { PaymentMobile } from "./components/PaymentMobile";
import { Food } from "./components/Food";
import { media } from "styles/media";

interface IPaymentProps {
    moviedetail: MovieBooking;
    isLoading: boolean;
}

export const Payment = memo(({ moviedetail, isLoading }: IPaymentProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { arraySeat, bookingTicket, username } = useCheckoutContext();
    const { setArraySeat } = useBooking();
    const { message, error } = useSelector(selectCheckout);
    const history = useHistory();
    const { Desktop, Mobile } = useScreenType();
    const [visible, setVisible] = React.useState(false);
    const [food, showFood] = React.useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const totalPrice = arraySeat
        ?.reduce((total: number, item: ArraySeat) => {
            return (total += item.giaVe);
        }, 0)
        .toLocaleString();

    React.useEffect(() => {
        if (error) {
            alert(error);
            history.push("/");
        }
        if (message) {
            alert(message);
            history.push("/");
        }
    }, [message, error]);

    return (
        <>
            <Wrapper>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <Desktop>
                        <Card
                            title={<h1 style={{ textAlign: "center" }}>{moviedetail?.tenPhim}</h1>}
                        >
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
                                <a onClick={showDrawer} style={{ marginBottom: 0, flex: 1 }}>
                                    Chọn combo
                                </a>
                                <span>
                                    {arraySeat?.map((item: any) => {
                                        return <Tag color="magenta">{item.tenGhe}</Tag>;
                                    })}
                                </span>
                                <Drawer
                                    title="Basic Drawer"
                                    placement="right"
                                    width={420}
                                    closable={false}
                                    onClose={onClose}
                                    visible={visible}
                                >
                                    <Food />
                                </Drawer>
                            </Content>

                            <Divider dashed />
                            <Content>
                                <h3 style={{ marginBottom: 0, flex: 1 }}>Ghế</h3>
                                <span>
                                    {arraySeat?.map((item: any) => {
                                        return <Tag color="magenta">{item.tenGhe}</Tag>;
                                    })}
                                </span>
                            </Content>

                            <Divider dashed />
                            <ButtonStyle>
                                <Buttons
                                    onClick={() => {
                                        bookingTicket(moviedetail.maLichChieu, arraySeat, username);
                                    }}
                                    style={{
                                        width: "100%",
                                        height: 100,
                                        borderRadius: 0,
                                        backgroundColor: "#07f356",
                                        fontSize: "1.5rem",
                                    }}
                                >
                                    Tính tiền
                                </Buttons>
                            </ButtonStyle>
                        </Card>
                    </Desktop>
                )}

                <Mobile>
                    {/* <PaymentMobile /> */}
                    <Row>
                        <Col span={12}>
                            <span>
                                {arraySeat?.map((item: any) => {
                                    return <Tag color="magenta">{item.tenGhe}</Tag>;
                                })}
                            </span>
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
                                    onClick={showDrawer}
                                >
                                    Tiếp tục
                                </Buttons>
                                <Drawer
                                    title="Basic Drawer"
                                    placement="right"
                                    width={"100%"}
                                    closable={true}
                                    onClose={onClose}
                                    visible={visible}
                                >
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
                                        <a
                                            onClick={() => {
                                                showFood(true);
                                            }}
                                            style={{ marginBottom: 0, flex: 1 }}
                                        >
                                            Chọn combo
                                        </a>
                                    </Content>
                                    <Divider />
                                    <Content>
                                        <span>
                                            {arraySeat?.map((item: any) => {
                                                return <Tag color="magenta">{item.tenGhe}</Tag>;
                                            })}
                                        </span>
                                    </Content>
                                    <ButtonStyle>
                                        <Buttons
                                            onClick={() => {
                                                bookingTicket(
                                                    moviedetail.maLichChieu,
                                                    arraySeat,
                                                    username,
                                                );
                                            }}
                                            style={{
                                                width: "100%",
                                                height: 100,
                                                borderRadius: 0,
                                                backgroundColor: "red",
                                                fontSize: "1.5rem",
                                            }}
                                        >
                                            Tính tiền
                                        </Buttons>
                                    </ButtonStyle>
                                </Drawer>
                                <Drawer
                                    title="Chọn thức ăn"
                                    placement="right"
                                    width={"100%"}
                                    closable={true}
                                    onClose={() => {
                                        showFood(false);
                                    }}
                                    visible={food}
                                >
                                    <Food />
                                </Drawer>
                            </ButtonStyle>
                        </Col>
                    </Row>
                </Mobile>
            </Wrapper>
        </>
    );
});

const Wrapper = styled.div`
    position: sticky;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;

    ${media.small`
        bottom: 0;
        left: 0;
    `}

    .ant-card {
        height: 100%;
    }

    .ant-card-body {
        padding: 0;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
    padding: 0px 20px;
`;

const ButtonStyle = styled.div`
    /*  position: absolute;
    bottom: 0;
    right: 0; */
    width: 100%;

    ${media.small`
        button {
            padding: 40px;
        }
    `}
`;
