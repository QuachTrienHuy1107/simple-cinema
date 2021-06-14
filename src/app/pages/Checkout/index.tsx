/**
 *
 * Checkout
 *
 */
import { Col, message, PageHeader, Row, Skeleton, Space, Steps } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { Header } from "app/components/Common/Header";
import { Loading } from "app/components/Common/Loading";
import { useScreenType } from "hooks/useScreenType";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { selectAuth } from "../Form/slice/selectors";
import { Payment } from "./components/Payment";
import { PaymentMobile } from "./components/Payment/components/PaymentMobile";
import { Seat } from "./components/Seat";
import { ContextProvider, useCheckoutContext } from "./context/createContext";
import { useCheckout } from "./hooks/useCheckout";
import { useCheckoutSlice } from "./slice";
import { selectCheckout } from "./slice/selectors";
import Swal from "sweetalert2";

interface Props {}
const { Step } = Steps;
// Date.now() + 1000 * 60 * 20;

export function Checkout(props: Props) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { actions } = useCheckoutSlice();
    const history = useHistory();
    const { tickets, isLoading } = useSelector(selectCheckout);
    const { Desktop, Mobile } = useScreenType();
    const { setArraySeat } = useCheckoutContext();
    const { credentials } = useSelector(selectAuth);
    const { danhSachGhe, thongTinPhim } = tickets;
    const [out, setOut] = React.useState(false);
    const { maLichChieu } = useParams() as any;

    const onFinish = async () => {
        message
            .warning("Bạn đã đạt giới hạn thời gian đặt vé cho phép. Xin vui lòng đặt vé lại!!")
            .then(() => {
                setOut(true);
                history.goBack();
            });
    };

    const deadline = Date.now() + 2000 * 60; // Moment is also OK

    React.useEffect(() => {
        dispatch(actions.getAllSeatAction({ maLichChieu }));
        return () => {
            setArraySeat([]);
            dispatch(actions.resetStore());
        };
    }, []);

    return (
        <ContextProvider>
            {isLoading && <Loading />}
            <Wrapper>
                <Row>
                    <Col xl={18} md={16} xs={24}>
                        <Header />
                        <Row justify="space-between">
                            <Col lg={24} md={24}>
                                <TopTitle onBack={() => null} />
                                <SubTitle>
                                    <Space className="movieDetail">
                                        <Desktop>
                                            <div>
                                                <img
                                                    src={
                                                        isLoading ? (
                                                            <Skeleton />
                                                        ) : (
                                                            thongTinPhim?.hinhAnh
                                                        )
                                                    }
                                                    alt=""
                                                    width={60}
                                                    height={60}
                                                />
                                            </div>
                                        </Desktop>

                                        <Space direction="vertical">
                                            <div>
                                                <span>{thongTinPhim?.tenCumRap}</span>
                                                <span> - </span>
                                                <span>{thongTinPhim?.tenRap}</span>
                                            </div>
                                            <div>
                                                <p>{thongTinPhim?.diaChi}</p>
                                            </div>
                                        </Space>
                                    </Space>
                                    <div>
                                        <p>Thời gian đặt vé</p>
                                        <Space>
                                            <CountdownStyle value={deadline} onFinish={onFinish} />
                                        </Space>
                                    </div>
                                </SubTitle>
                                <Row justify="center">
                                    <Col xl={20} lg={24}>
                                        <Seat arrayTickets={danhSachGhe} isLoading={isLoading} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={6} md={8} xs={24}>
                        <Desktop>
                            <Payment
                                moviedetail={thongTinPhim}
                                isLoading={isLoading}
                                credentials={credentials}
                                out={out}
                            />
                        </Desktop>
                        <Mobile>
                            <PaymentMobile
                                moviedetail={thongTinPhim}
                                credentials={credentials}
                                out={out}
                            />
                        </Mobile>
                    </Col>
                </Row>
            </Wrapper>
        </ContextProvider>
    );
}

const Wrapper = styled.div`
    height: 100%;
`;

const TopTitle = styled(PageHeader)`
    padding: 10px 50px;
    border-bottom: 1px solid #17305f;

    ${media.small`
        padding: 0 50px;
    `}
`;

const SubTitle = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    span {
        color: #000;
        font-size: 1.3rem;
        margin-bottom: -10px;
        font-weight: 600;

        @media screen and (max-width: 576px) {
            font-size: 1rem;
        }
    }

    @media screen and (max-width: 420px) {
        padding: 10px;
        .movieDetail {
            width: 70%;
            flex: 1;
            padding-right: 5px;
        }
    }

    .ant-space-item {
        margin-bottom: 0 !important;
    }
`;

const CountdownStyle = styled(Countdown)`
    .ant-space {
        width: 100px;
    }
`;
