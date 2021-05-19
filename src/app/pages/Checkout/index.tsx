/**
 *
 * Checkout
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Col, PageHeader, Row, Space, Spin } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import Countdown from "antd/lib/statistic/Countdown";
import { Payment } from "./components/Payment";
import { Seat } from "./components/Seat";
import { useDispatch, useSelector } from "react-redux";
import { useCheckoutSlice } from "./slice";
import { selectCheckout } from "./slice/selectors";
import { ContextProvider } from "./context/createContext";
import { Loading } from "app/components/Common/Loading";

interface Props {}

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK

function onFinish() {
    console.log("finished!");
}

export function Checkout(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { actions } = useCheckoutSlice();
    const { tickets, isLoading } = useSelector(selectCheckout);
    const { message } = useSelector(selectCheckout);
    const { danhSachGhe, thongTinPhim } = tickets;

    React.useEffect(() => {
        dispatch(actions.getAllSeatAction({ maLichChieu: 16103 }));
    }, [message]);

    return (
        <ContextProvider>
            <Wrapper>
                <TopTitle
                    onBack={() => null}
                    title="Back"
                    extra={[
                        <Space>
                            <Countdown value={deadline} onFinish={onFinish} />
                        </Space>,
                    ]}
                />
                <Row justify="center" style={{ margin: "50px 0" }}>
                    <Col md={14} sm={22}>
                        <Seat tickets={danhSachGhe} isLoading={isLoading} />
                    </Col>
                    <Col md={6} sm={22} className="seat__payment">
                        <Payment moviedetail={thongTinPhim} isLoading={isLoading} />
                    </Col>
                </Row>
            </Wrapper>
        </ContextProvider>
    );
}

const Wrapper = styled.div`
    margin: 0px 0 50px;
`;

const TopTitle = styled(PageHeader)`
    padding: 50px 150px;
    background-color: #0f1319;
    border-top: 1px solid #17305f;
    border-bottom: 1px solid #17305f;
`;
