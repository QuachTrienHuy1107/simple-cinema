/**
 *
 * Food
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Col, Image, InputNumber, Row, Space } from "antd";
import pop1 from "./assets/pop1.png";
interface Props {}

export const Food = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Content>
                <Row justify="space-around" align="middle">
                    <Col span={12}>
                        <Space>
                            <Image width={100} src={pop1} />

                            <div>
                                <h5>ten mon</h5>
                                <span>111</span>
                            </div>
                        </Space>
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                        <InputNumber size="large" min={1} max={10} defaultValue={3} />
                    </Col>
                </Row>
            </Content>
        </Wrapper>
    );
});

const Wrapper = styled.div``;

const Content = styled.div`
    background-color: #f6f6f6;
    padding: 30px;
`;
