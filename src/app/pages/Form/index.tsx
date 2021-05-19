/**
 *
 * Form
 *
 */
import { Col, Form, Row } from "antd";
import Title from "antd/lib/typography/Title";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { layout } from "utils/helpers";
import { useHandleSubmit } from "./hooks/useHandleSubmit";
import { useAuthSlice } from "./slice";

interface Props {}

export function FormTemplate({ children }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { actions } = useAuthSlice();
    const [form] = Form.useForm();
    const history = useHistory();
    const { onLogin, onRegister } = useHandleSubmit();

    const onFinish = (values: any) => {
        if (Object.keys(values).length < 3) {
            onLogin({ ...values });
        } else {
            const actions = {
                ...values,
                maNhom: "GP01",
            };
            onRegister(actions);
        }
    };

    return (
        <Wrapper>
            <Content>
                <Row justify="center">
                    <ColStyled span={20}>
                        <Title
                            style={{
                                textAlign: "center",
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            {window.location.pathname === "/login" ? "Đăng nhập" : "Đăng kí"}
                        </Title>
                        <Form
                            form={form}
                            {...layout}
                            name="basic"
                            initialValues={{
                                remember: true,
                            }}
                            onFinish={onFinish}
                        >
                            {children}
                        </Form>
                    </ColStyled>
                </Row>
            </Content>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    background-image: url("http://pixner.net/boleto/demo/assets/images/account/account-bg.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-color: $bgPrimary;

    span,
    label {
        color: #fff;
        font-weight: 600;
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    height: 100%;
`;

const ColStyled = styled(Col)`
    width: 100%;
    max-width: 600px;

    padding: 60px 45px;

    background-color: rgba(68, 90, 153, 0.051);
    -webkit-box-shadow: 0px 0px 29.4px 0.6px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 29.4px 0.6px rgba(0, 0, 0, 0.5);

    @media screen and (max-width: 576px) {
        padding: 60px 10px;
    }
`;
