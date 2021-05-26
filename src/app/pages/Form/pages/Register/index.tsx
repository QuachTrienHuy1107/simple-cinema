/**
 *
 * Register
 *
 */
import { Col, Form, Input, Row } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { formItemLayout } from "utils/helpers";

interface Props {}

export const Register = memo((props: Props) => {
    const { t, i18n } = useTranslation();

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
                >
                    <Input size="large" />
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
                    <Input.Password size="large" />
                </Form.Item>
            </Col>
            <Col span={24}>
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
            <Col span={24}>
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
            <Col span={24}>
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
                            message: "Sai rồi",
                        },
                    ]}
                >
                    <Input size="large" />
                </Form.Item>
            </Col>
            <Col span={24}>
                <Form.Item name="soDt" label="Số điện thoại">
                    <Input size="large" />
                </Form.Item>
            </Col>

            {/*  <Col span={24}>
                <Select
                    placeholder="Select a person"
                    optionFilterProp="children"
                    size="large"
                    style={{ color: "#000" }}
                >
                    {new Array(9).fill(null).map((_, index) => (
                        <Option value={`GP0${index}`}>GP0{index}</Option>
                    ))}
                </Select>
            </Col> */}
            <Col span={24}>
                <Form.Item {...formItemLayout} style={{ textAlign: "center" }}>
                    <Buttons type="primary" htmlType="submit" className="login__btn">
                        Đăng kí
                    </Buttons>
                </Form.Item>
            </Col>

            <Col span={24}>
                <Form.Item style={{ textAlign: "center", margin: "30px 0" }}>
                    <span>Bạn đã có tài khoản? </span>
                    <Link to="/login">Đăng nhập</Link>
                </Form.Item>
            </Col>
        </Row>
    );
});

const Div = styled.div``;
