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
import { Col, Drawer, Row, Tag } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { Food } from "../Food";

interface Props {}

export const PaymentMobile = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { arraySeat } = useCheckoutContext();
    const [visible, setVisible] = React.useState(false);
    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    return (
        <Wrapper>
            {/* <Row>
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
                            <Food />
                        </Drawer>
                    </ButtonStyle>
                </Col>
            </Row> */}
        </Wrapper>
    );
});

const Wrapper = styled.div``;

const ButtonStyle = styled.div`
    width: 100%;

    button {
        padding: 40px;
    }
`;
