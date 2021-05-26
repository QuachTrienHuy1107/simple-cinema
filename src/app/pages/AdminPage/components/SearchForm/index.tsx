/**
 *
 * Filter
 *
 */
import { SearchOutlined } from "@ant-design/icons";
import { Col, Drawer, Form, Row } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { InputStyled } from "app/components/Common/InputStyled";
import { useHomeSlice } from "app/pages/HomePage/slice";
import usePagination from "hooks/usePagination";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components/macro";
import { useDebounce } from "../../hooks/useDebounce";
import { MovieFormAdmin } from "../../pages/MovieManagement/MovieForm/MovieFormAdmin";

interface Props {}

export const SearchForm = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const history = useHistory();
    const { actions } = useHomeSlice();
    const { handleChange, input } = useDebounce();
    const dispatch = useDispatch();
    const location = useLocation();
    const { resPagination, handlePageChange } = usePagination(1, 10);
    const [visible, setVisible] = React.useState(false);
    const [edit, setEdit] = React.useState(false);

    console.log("visible", visible);

    const showDrawer = () => {
        setVisible(true);
        setEdit(false);
    };

    const onClose = () => {
        setVisible(false);
        setEdit(false);
    };

    React.useEffect(() => {
        if (location.pathname.includes("moviemanagement") && input !== "") {
            const data = {
                tenPhim: input,
                maNhom: "GP01",
            };
            dispatch(actions.searchMovie(data));
        }
        if (input === "") {
            dispatch(actions.getPaginateMoviesAction(resPagination));
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

                    <Col style={{ textAlign: "right" }} flex="100px">
                        <Buttons size="large" onClick={showDrawer}>
                            Create
                        </Buttons>
                        <Drawer
                            title={edit ? "Edit" : "Create"}
                            width={720}
                            placement="right"
                            closable={false}
                            onClose={onClose}
                            visible={visible}
                            bodyStyle={{ paddingBottom: 80 }}
                        >
                            <MovieFormAdmin isEdit={false} />
                        </Drawer>
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
