/**
 *
 * ShowTime
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Col, Form, Row, Select, Skeleton, Tabs } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { InputStyled } from "app/components/Common/InputStyled";
import { formItemLayout } from "utils/helpers";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { useDispatch, useSelector } from "react-redux";
import { HomeState, MovieResponse } from "app/pages/HomePage/slice/types";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import usePagination from "hooks/usePagination";

const { Option } = Select;
const { TabPane } = Tabs;

interface Props {}

const isLoading = false;

export const ShowTime = React.memo((props: Props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { actions } = useHomeSlice();
    const { cinemaList, isLoading, moviePagination } = useSelector(selectHome) as HomeState;
    const { resPagination } = usePagination(1, 10);

    React.useEffect(() => {
        const data = {
            ...resPagination,
        };
        dispatch(actions.getPaginateMoviesAction(data));
    }, []);

    return (
        <Wrapper>
            <Form form={form} name="showtime">
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <>
                        <Row justify="space-around" gutter={[20, 35]}>
                            <ColStyled md={15}>
                                <LeftPanel>
                                    <Row gutter={[24, 12]} justify="space-around">
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Chọn phim"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <Select
                                                    size="large"
                                                    onChange={value => {
                                                        console.log("value", value);
                                                    }}
                                                >
                                                    {moviePagination &&
                                                        moviePagination.items?.map(
                                                            (movie: MovieResponse) => {
                                                                return (
                                                                    <Option
                                                                        key={movie.maPhim}
                                                                        value={movie.maPhim}
                                                                    >
                                                                        {movie.tenPhim}
                                                                    </Option>
                                                                );
                                                            },
                                                        )}
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Chọn rạp"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <Select size="large">
                                                    <Option value="aaa">123</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Chọn hệ thống rạp"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <Select size="large">
                                                    <Option value="aaa">123</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Chọn ngày giờ chiếu"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <Select size="large">
                                                    <Option value="aaa">123</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Chọn cụm rạp"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <Select size="large">
                                                    <Option value="aaa">123</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Chọn cụm rạp"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <InputStyled
                                                    size="large"
                                                    placeholder="Nhập giá vé"
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </LeftPanel>
                            </ColStyled>
                            <ColStyled md={6}>
                                <RightPanel>
                                    <Tabs defaultActiveKey="1" centered>
                                        <TabPane tab="Tab 1" key="1">
                                            Content of Tab Pane 1
                                        </TabPane>
                                        <TabPane tab="Tab 2" key="2">
                                            Content of Tab Pane 2
                                        </TabPane>
                                        <TabPane tab="Tab 3" key="3">
                                            Content of Tab Pane 3
                                        </TabPane>
                                    </Tabs>
                                </RightPanel>
                            </ColStyled>
                        </Row>
                    </>
                )}
            </Form>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    background-color: #131720;
    border-radius: 16px;
    position: relative;
    width: 100%;
    border: 1px solid #151f30;
`;

const ColStyled = styled(Col)`
    border-radius: 10px;
    padding: 20px;
`;

const LeftPanel = styled.div`
    .ant-card-body {
        text-align: center;
    }
`;

const RightPanel = styled.div``;
