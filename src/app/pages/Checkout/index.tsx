/**
 *
 * Checkout
 *
 */
import { Col, PageHeader, Row, Space, Steps } from "antd";
import Countdown from "antd/lib/statistic/Countdown";
import { Header } from "app/components/Common/Header";
import { Logo } from "app/components/Common/Logo";
import { useScreenType } from "hooks/useScreenType";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { selectAuth } from "../Form/slice/selectors";
import { Payment } from "./components/Payment";
import { Seat } from "./components/Seat";
import { ContextProvider } from "./context/createContext";
import { useCheckoutSlice } from "./slice";
import { selectCheckout } from "./slice/selectors";

interface Props {}
const { Step } = Steps;
// Date.now() + 1000 * 60 * 20;
const deadline = Date.now() + 1000 * 60 * 20; // Moment is also OK

export function Checkout(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { actions } = useCheckoutSlice();
    const history = useHistory();
    const { tickets, isLoading } = useSelector(selectCheckout);
    const { credentials } = useSelector(selectAuth);
    const { danhSachGhe, thongTinPhim } = tickets;
    const { maLichChieu } = useParams() as any;
    console.log("maLichChieu", maLichChieu);

    const onFinish = () => {
        console.log("finished!");
        history.goBack();
    };

    console.log("credentials", credentials);

    const title = (
        <div>
            <Logo />
        </div>
    );

    React.useEffect(() => {
        dispatch(actions.getAllSeatAction({ maLichChieu }));
    }, []);

    return (
        <ContextProvider>
            <Wrapper>
                <Row>
                    <Col xl={18} md={24} xs={24}>
                        <Header />
                        <Row justify="space-between">
                            <Col lg={24} md={24}>
                                <TopTitle
                                    onBack={() => null}

                                    // title={title}
                                    // subTitle={subTitle}
                                    // extra={title}
                                />
                                <SubTitle>
                                    <Space>
                                        <div>
                                            <img
                                                src={thongTinPhim?.hinhAnh}
                                                alt=""
                                                width={60}
                                                height={60}
                                            />
                                        </div>
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
                                        <Seat tickets={danhSachGhe} isLoading={isLoading} />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col xl={6} md={24} xs={24}>
                        <Payment moviedetail={thongTinPhim} isLoading={isLoading} />
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
    }

    .ant-space-item {
        margin-bottom: 0 !important;
    }
`;

const SubTitleStyle = styled(Space)``;

const CountdownStyle = styled(Countdown)`
    .ant-space {
        width: 100px;
    }
`;
