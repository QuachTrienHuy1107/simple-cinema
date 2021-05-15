/**
 *
 * SearchForm
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Col, DatePicker, Form, Input, Row } from "antd";
import { CalendarFilled, SearchOutlined } from "@ant-design/icons";

interface Props {}

export const SearchForm = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <FormStyled size="large">
                <Row gutter={[24, 8]} justify="center">
                    <Col lg={10} md={24} sm={24}>
                        <FormItem
                            rules={[
                                {
                                    required: true,
                                    message: t(messages.CheckEmpty()),
                                },
                            ]}
                        >
                            <Input
                                prefix={<SearchOutlined className="site-form-item-icon" />}
                                placeholder="Tìm phim"
                            />
                        </FormItem>
                    </Col>
                    <Col lg={12} md={24} sm={24}>
                        <FormItem name="date-picker" className="search__form--datetime">
                            <Row gutter={[24, 0]}>
                                <Col lg={12} md={12} sm={24}>
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Chọn ngày bắt đầu"
                                        suffixIcon={<span />}
                                    />
                                </Col>

                                <Col lg={12} md={12} sm={24}>
                                    <DatePicker
                                        format="YYYY-MM-DD HH:mm:ss"
                                        placeholder="Chọn ngày kết thúc"
                                        suffixIcon={<span />}
                                    />
                                </Col>
                            </Row>
                        </FormItem>
                    </Col>

                    <Col lg={1} md={24}>
                        <Button shape="circle">
                            <SearchOutlined />
                        </Button>
                    </Col>
                </Row>
            </FormStyled>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    width: 80%;
    margin: 0 auto;
`;

const FormStyled = styled(Form)`
    // background-color: ${p => p.theme.primaryBg};
    border-radius: 16px;
    padding: 30px 30px;
    margin: 30px 0;
`;

const FormItem = styled(Form.Item)`
    border: none;
    outline: none !important;
    box-shadow: none !important;

    input {
        font-size: $text5 !important;
    }

    .search__form--datetime {
        border: none;
        outline: none !important;
        box-shadow: none !important;
        .ant-picker {
            width: 100%;
        }
    }
`;
