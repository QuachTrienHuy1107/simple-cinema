/**
 *
 * Filter
 *
 */
import { SearchOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { InputStyled } from "app/components/Common/InputStyled";
import { useDebounce } from "app/pages/AdminPage/hooks/useDebounce";
import { useUserSlice } from "app/pages/AdminPage/pages/UserManagement/slice";
import { useHomeSlice } from "app/pages/HomePage/slice";
import usePagination from "hooks/usePagination";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import styled from "styled-components/macro";

interface Props {}

export const SearchForm = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [form] = Form.useForm();
    const history = useHistory();
    const { actions } = useHomeSlice();
    const { actions: userAction } = useUserSlice();
    const { handleChange, input } = useDebounce();
    const dispatch = useDispatch();
    const location = useLocation();
    const { resPagination, handlePageChange } = usePagination(1, 10);

    React.useEffect(() => {
        if (location.pathname.includes("moviemanagement")) {
            if (input !== "") {
                const data = {
                    tenPhim: input,
                    maNhom: "GP01",
                };
                dispatch(actions.searchMovie(data));
            } else {
                dispatch(actions.getPaginateMoviesAction(resPagination));
            }
        }
        if (location.pathname.includes("usermanagement")) {
            if (input !== "") {
                const data = {
                    ...resPagination,
                    tuKhoa: input,
                    maNhom: "GP01",
                };
                dispatch(userAction.searchUserAction(data));
            } else {
                dispatch(userAction.getPaginateUserAction(resPagination));
            }
        }
    }, [actions, dispatch, input, location.pathname, resPagination, userAction]);

    return (
        <Wrapper>
            <Form form={form}>
                <Input
                    size="large"
                    onChange={handleChange}
                    placeholder="Search..."
                    suffix={<SearchOutlined style={{ fontSize: "1.2rem" }} />}
                />

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
`;
