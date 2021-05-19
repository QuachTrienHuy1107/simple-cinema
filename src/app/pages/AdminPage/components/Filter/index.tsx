/**
 *
 * Filter
 *
 */
import React, { ChangeEvent, memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Col, Form, Input, Row } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { useForm } from "antd/lib/form/Form";
import { SearchForm } from "app/components/SearchForm";
import Search from "antd/lib/input/Search";
import { InputStyled } from "app/components/Common/InputStyled";
import { SearchOutlined } from "@ant-design/icons";
import { useHistory, useLocation } from "react-router";
import { ROUTES } from "utils/constants/settings";
import { useDebounce } from "../../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { useHomeSlice } from "app/pages/HomePage/slice";

interface Props {}

export const Filter = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const history = useHistory();
    const { actions } = useHomeSlice();
    const { handleChange, input } = useDebounce();
    const dispatch = useDispatch();
    const location = useLocation();

    console.log("sss", input);

    React.useEffect(() => {
        if (location.pathname.includes("moviemanagement") && input !== "") {
            const data = {
                tenPhim: input,
                maNhom: "GP01",
            };
            dispatch(actions.searchMovie(data));
        }
    }, [input]);

    return (
        <Wrapper>
            <Form form={form}>
                <Row justify="space-between" gutter={[16, 20]}>
                    <Col flex="auto">
                        <InputStyled
                            onChange={handleChange}
                            placeholder="Search..."
                            suffix={<SearchOutlined style={{ fontSize: "1.2rem" }} />}
                        />
                    </Col>
                    {/*   <Col span={6} style={{ textAlign: "right" }}>
                        <Button
                            style={{ margin: "0 8px" }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Button>
                    </Col> */}

                    <Col style={{ textAlign: "right" }} flex="100px">
                        <Buttons
                            size="large"
                            onClick={() => {
                                history.push({
                                    pathname: `${ROUTES.FORMADMIN}/:maPhim`,
                                });
                            }}
                        >
                            Create
                        </Buttons>
                    </Col>
                </Row>
                {/*  <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Buttons type="primary" htmlType="submit">
                            Search
                        </Buttons>
                        <Buttons
                            style={{ margin: "0 8px" }}
                            onClick={() => {
                                form.resetFields();
                            }}
                        >
                            Clear
                        </Buttons>
                    </Col>
                </Row> */}
            </Form>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    color: #000;
    margin: 10px 0 40px;
`;
