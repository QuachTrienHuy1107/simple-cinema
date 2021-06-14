/**
 *
 * Register
 *
 */
import { Col, Form, Input, Row } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { ROUTES } from "utils/constants/settings";
import { formItemLayout } from "utils/helpers";
import { selectAuth } from "../../slice/selectors";
import Swal from "sweetalert2";
import { useAuthSlice } from "../../slice";

interface Props {}

export const Register = memo((props: Props) => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const { isLoading, credentials } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const { actions } = useAuthSlice();

    React.useEffect(() => {
        if (Object.keys(credentials).length !== 0) {
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Đăng kí thành công!!!",
                showConfirmButton: false,
                timer: 2000,
            }).then(() => {
                history.push({ pathname: `${ROUTES.LOGIN}`, state: { credentials } });
            });
        }
        return () => {
            dispatch(actions.clearData());
        };
    }, [credentials, history]);

    return (
        <Row justify="center" gutter={[12, 10]}>
            <Col span={12}>
                <Form.Item
                    name="taiKhoan"
                    label="Tài khoản"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập tài khoản!",
                        },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
            </Col>
            <Col span={12}>
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
                    <Input.Password size="large" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name=""
                    label="Nhập lại mật khẩu"
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập mật khẩu!",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("matKhau") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error("Mật khẩu không trùng!"));
                            },
                        }),
                    ]}
                >
                    <Input.Password size="large" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="hoTen"
                    label="Họ tên"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập họ tên!",
                        },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Vui lòng nhập email!",
                        },
                        {
                            type: "email",
                            message: "Email không đúng định dạng",
                        },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item name="soDt" label="Số điện thoại">
                    <Input size="large" />
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item {...formItemLayout} style={{ textAlign: "center" }}>
                    <ButtonStyle type="primary" htmlType="submit" loading={isLoading}>
                        <span className="btnLogin">Đăng kí</span>
                    </ButtonStyle>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item style={{ textAlign: "center" }}>
                    <span>Bạn đã có tài khoản? </span>
                    <Link to="/login">Đăng nhập</Link>
                </Form.Item>
            </Col>
        </Row>
    );
});

const Div = styled.div``;

const ButtonStyle = styled(Buttons)`
    width: 50%;
    padding: 25px;

    span.ant-btn-loading-icon {
        transform: translateY(-10px);
    }

    span.btnLogin {
        font-size: 1.2rem;
        transform: translateY(-3px);
        margin-left: 2px;
    }
`;
