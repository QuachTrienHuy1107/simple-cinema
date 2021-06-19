/**
 *
 * Login
 *
 */
import { Checkbox, Col, Form, Input, Row } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { Loading } from "app/components/Common/Loading";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
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
    const [loading, setLoading] = React.useState(false);

    const { isLoading } = useSelector(selectAuth);

    React.useEffect(() => {
        setLoading(true);
        const showLoading = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => {
            clearTimeout(showLoading);
        };
    }, []);

    if (loading) {
        return <Loading />;
    }

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

                    <a>Quên mật khẩu?</a>
                </RememberMe>
            </Col>

            <Col span={24}>
                <Form.Item {...formItemLayout} style={{ textAlign: "center" }}>
                    <ButtonStyle type="primary" htmlType="submit" loading={isLoading}>
                        <span className="btnLogin">{t(messages.Login())}</span>
                    </ButtonStyle>
                    <Mentions>
                        <span>Username: Administrator </span>
                        <span>Password: Admin </span>
                    </Mentions>
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

const ButtonStyle = styled(Buttons)`
    width: 50%;
    padding: 25px;
    margin: 30px 0;

    span.ant-btn-loading-icon {
        transform: translateY(-10px);
    }

    span.btnLogin {
        font-size: 1.2rem;
        transform: translateY(-3px);
        margin-left: 2px;
    }
`;

const Mentions = styled.p`
    margin-top: -15px;
    span {
        color: #727279 !important;
        font-size: 0.7rem;
        margin: 0 10px;
    }
`;
