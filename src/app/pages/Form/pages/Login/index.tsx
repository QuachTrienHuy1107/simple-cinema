/**
 *
 * Login
 *
 */
import { Checkbox, Col, Form, Input, message, Row } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { formItemLayout } from "utils/helpers";

import { selectAuth } from "../../slice/selectors";
import { messages } from "./messages";

interface Props {}

export const Login = memo((props: Props) => {
    const { t, i18n } = useTranslation();
    const userNameRef = React.useRef<Input>(null);
    const passWordRef = React.useRef<Input>(null);

    const { isLoading } = useSelector(selectAuth);

    return (
        <Row justify="center">
            <Col span={24}>
                <Form.Item
                    name="taiKhoan"
                    label="Tài khoản"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tài khoản!",
                        },
                    ]}
                    validateFirst
                >
                    <Input size="large" ref={userNameRef} />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item
                    name="matKhau"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                        },
                    ]}
                >
                    <Input.Password size="large" ref={passWordRef} />
                </Form.Item>
            </Col>
            <Col span={24}>
                <RememberMe className="login__remember">
                    <Form.Item valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <Link to="/register">Quên mật khẩu?</Link>
                </RememberMe>
            </Col>

            <Col span={24}>
                <Form.Item {...formItemLayout} style={{ textAlign: "center" }}>
                    <Buttons type="primary" htmlType="submit" loading={isLoading}>
                        {t(messages.Login())}
                    </Buttons>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item style={{ textAlign: "center" }}>
                    <span>Bạn chưa có tài khoản? </span>
                    <Link to="/register"> {t(messages.Register())}</Link>
                </Form.Item>
            </Col>
        </Row>
    );
});

const Div = styled.div``;

const RememberMe = styled.div`
    display: flex;
    justify-content: space-between;

    @media screen and(max-width:280px) {
        display: block;
    }
`;
