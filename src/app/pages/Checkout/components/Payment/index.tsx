/**
 *
 * Payment
 *
 */
import { Card, Divider, message, Skeleton, Tag } from "antd";
import Search from "antd/lib/input/Search";
import { Buttons } from "app/components/Common/Buttons";
import { UserLoginResponse } from "app/pages/Form/slice/types";
import { useScreenType } from "hooks/useScreenType";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Prompt, useHistory } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import Swal from "sweetalert2";
import { useCheckoutContext } from "../../context/createContext";
import { useBooking } from "../../hooks/useBooking";
import { useCheckout } from "../../hooks/useCheckout";
import { selectCheckout } from "../../slice/selectors";
import { MovieBooking, SeatSelectedType } from "../../slice/types";
import { Food } from "./components/Food";

interface IPaymentProps {
    moviedetail: MovieBooking;
    isLoading: boolean;
    credentials: UserLoginResponse;
    out?: boolean;
}

export const Payment = memo(({ moviedetail, isLoading, credentials, out }: IPaymentProps) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { arraySeatSelected, setArraySeat, arrayFood } = useCheckoutContext();
    const { bookingTicket } = useBooking();
    const { totalPrice, totalPriceTicket } = useCheckout();

    const { messageSuccess, error } = useSelector(selectCheckout);
    const history = useHistory();

    React.useEffect(() => {
        if (error) {
            alert(error);
            history.push("/");
        }
        if (messageSuccess) {
            setArraySeat([]);
            Swal.fire("Đặt vé thành công!", "Chúc bạn xem phim vui vẻ", "success").then(() => {
                history.push("/");
            });
        }
    }, [messageSuccess, error]);

    return (
        <>
            <Wrapper>
                <Inner>
                    {isLoading ? (
                        <Skeleton />
                    ) : (
                        <>
                            <Card title={<h1 style={{ textAlign: "center" }}>{totalPrice}</h1>}>
                                <DividerStyle dashed />
                                <Content>
                                    <h2>{moviedetail?.tenPhim}</h2>
                                    <p>{moviedetail?.tenCumRap}</p>
                                    <p>
                                        {moviedetail?.ngayChieu} - {moviedetail?.gioChieu} -{" "}
                                        {moviedetail?.tenRap}
                                    </p>
                                </Content>
                                <DividerStyle dashed />

                                <Content>
                                    <SpaceStyled>
                                        <div className="seats">
                                            <h3
                                                style={{
                                                    margin: "0 10px 10px 0",
                                                    flex: 1,
                                                    display: "inline-block",
                                                }}
                                            >
                                                Ghế
                                            </h3>
                                            {arraySeatSelected?.length === 0 && (
                                                <span style={{ color: "red" }}>
                                                    Vui lòng chọn ghế
                                                </span>
                                            )}
                                            <span>
                                                {arraySeatSelected?.map(
                                                    (item: SeatSelectedType) => {
                                                        return (
                                                            <Tag color="magenta" key={item.maGhe}>
                                                                {item.tenGhe}
                                                            </Tag>
                                                        );
                                                    },
                                                )}
                                            </span>
                                        </div>
                                        <div className="price">
                                            {totalPriceTicket.toLocaleString()}
                                        </div>
                                    </SpaceStyled>
                                </Content>
                                <DividerStyle dashed />
                                <Content>
                                    <h3>Email</h3>
                                    <p>{credentials?.email}</p>
                                </Content>
                                <DividerStyle dashed />
                                <Content>
                                    <h3>Số điện thoại</h3>
                                    <p>{credentials?.soDT}</p>
                                </Content>
                                <DividerStyle dashed />
                                <Content>
                                    <h3>Mã giảm giá</h3>
                                    <ButtonDiscount
                                        placeholder="Nhập mã giảm giá"
                                        enterButton="Áp dụng"
                                        onSearch={() => {
                                            message.warning("Mã không hợp lệ");
                                        }}
                                    />
                                </Content>

                                <DividerStyle dashed />
                                <Content>
                                    <Food />
                                </Content>
                                <Divider dashed />

                                <ButtonStyle>
                                    <Buttons
                                        onClick={() => {
                                            if (arraySeatSelected.length !== 0) {
                                                Swal.fire({
                                                    title: "Thanh toán?",
                                                    text: "Vé đã mua không thể hoàn lại",
                                                    icon: "warning",
                                                    showCancelButton: true,
                                                    confirmButtonColor: "#3085d6",
                                                    cancelButtonText: "Hủy",
                                                    cancelButtonColor: "#d33",
                                                    confirmButtonText: "Thanh toán!",
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
                                </ButtonStyle>
                            </Card>
                        </>
                    )}
                </Inner>
            </Wrapper>
            <Prompt
                when={(out && false) || (arraySeatSelected.length > 0 && true)}
                message={location => `Bạn có muốn quay về trang chủ hông?`}
            />
        </>
    );
});

const Wrapper = styled.aside`
    position: fixed;
    top: 0;
    right: 0;
    box-shadow: -3px -1px 20px 7px #ededed;
    background: #fff;
    box-shadow: 0 0 15px rgb(0 0 0 / 30%);
    z-index: 98;
    position: relative;
    padding: 0;
    width: 100%;
    height: 100vh;
`;

const Inner = styled.div`
    height: 100vh;

    overflow-y: scroll;
    overflow-x: hidden;

    ${media.small`
         bottom: 0;
         left: 0;
     `}

    .ant-card-head {
        border-bottom: none;

        .ant-card-head-title {
            padding: 0;

            h1 {
                margin-bottom: 6px;
            }
        }
    }
    .ant-card {
        height: 100%;
    }
    .ant-card-body {
        padding: 0;
    }
`;

const Content = styled.div`
    padding: 0px 20px;
    line-height: 20px;

    h3 {
        margin-bottm: 10px;
        flex: 1;
    }
`;

const ButtonStyle = styled.div`
    position: relative;
    margin-top: 20px;
    > div {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
    }
    ${media.small`
         button {
             padding: 40px;
         }
     `}
`;

const DividerStyle = styled(Divider)`
    margin: 15px 0;
`;

const ButtonDiscount = styled(Search)`
    button {
        background-color: #5ad00f;
        &:hover{
            background-color: #54b914;
    }
`;

const SpaceStyled = styled.div`
    display: flex;
    justify-content: space-between;

    .seats {
        width: 78%;
    }
    .price {
        width: 22%;
        text-align: right;
        color: #016f33;
        font-size: 1rem;
        font-weight: 600;
    }
`;
