/**
 *
 * Form
 *
 */
import { Col, Form, Row } from "antd";
import Title from "antd/lib/typography/Title";
import { Loading } from "app/components/Common/Loading";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components/macro";
import { layout } from "utils/helpers";
import bgLogin from "./assets/bgLogin.jpg";
import { useHandleSubmit } from "./hooks/useHandleSubmit";
import { useAuthSlice } from "./slice";
import { UserLoginResponse } from "./slice/types";

interface Props {}

export function FormTemplate({ children }) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const { actions } = useAuthSlice();
    const [form] = Form.useForm();
    const history = useHistory();
    const { onLogin, onRegister, isAuthenticated, isLoading } = useHandleSubmit();
    const [out, setOut] = React.useState(false);
    const location = useLocation();
    const [account, setAccount] = React.useState<UserLoginResponse>({});

    React.useEffect(() => {
        if (location.state) {
            const { credentials } = location.state as any;
            form.setFieldsValue({
                taiKhoan: credentials?.taiKhoan,
                matKhau: credentials?.matKhau,
            });
        }
    }, [location.state]);

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

    const onFinishFailed = (errorInfo: any) => {};

    const onFieldsChange = change => {
        if (change[0].value !== "") {
            setOut(true);
        } else if (isAuthenticated) {
            setOut(false);
        } else {
            setOut(false);
        }
    };

    return (
        <>
            {isAuthenticated ? (
                <Loading />
            ) : (
                <Wrapper>
                    <Content>
                        <Row justify="center">
                            <ColStyled span={20}>
                                <Title
                                    style={{
                                        textAlign: "center",
                                        cursor: "pointer",
                                        color: "#fff",
                                    }}
                                    onClick={() => {
                                        history.goBack();
                                    }}
                                >
                                    {window.location.pathname === "/login"
                                        ? "Đăng nhập"
                                        : "Đăng kí"}
                                </Title>
                                <Form
                                    form={form}
                                    {...layout}
                                    name="basic"
                                    initialValues={{
                                        remember: true,
                                    }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    onFieldsChange={onFieldsChange}
                                >
                                    {children}
                                </Form>
                            </ColStyled>
                        </Row>
                    </Content>
                    {/* <Prompt
                    when={out}
                    message={(location: any) => {
                        return "Bạn có muốn thoát không?";
                    }}
                /> */}
                </Wrapper>
            )}
        </>
    );
}

const Wrapper = styled.div`
    background-image: url(${bgLogin});
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

    background-image: linear-gradient(to bottom, rgba(20, 50, 93, 0.9), rgba(8, 22, 48, 0.9));
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 45%);

    @media screen and (max-width: 576px) {
        padding: 60px 10px;
    }
`;
