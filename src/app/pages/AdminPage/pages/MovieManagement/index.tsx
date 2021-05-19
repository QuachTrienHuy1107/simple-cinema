/**
 *
 * MovieManagement
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, message, Popconfirm, Space, Table, Tooltip } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHomeSlice } from "app/pages/HomePage/slice";
import usePagination from "hooks/usePagination";
import { Buttons } from "app/components/Common/Buttons";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { useHistory } from "react-router";
import { ROUTES } from "utils/constants/settings";
import { useMovieManagementSlice } from "./slice";
import { selectMovieManagement } from "./slice/selectors";
import { Filter } from "../../components/Filter";
import { useDebounce } from "../../hooks/useDebounce";

interface Props {}

export function MovieManagement(props: Props) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { actions } = useHomeSlice();
    const { movieManagementActions } = useMovieManagementSlice();
    const { successMessage, error } = useSelector(selectMovieManagement);
    const { moviePagination, isLoading } = useSelector(selectHome);
    const { resPagination, handlePageChange } = usePagination(1, 10);
    const history = useHistory();

    const { handleChange, input } = useDebounce();

    console.log("input", input);

    React.useEffect(() => {
        if (input === "") {
            dispatch(actions.getPaginateMoviesAction(resPagination));
        }
    }, [resPagination, successMessage, input, dispatch, actions]);

    // console.log("moviesPagination", moviesPagination);

    React.useEffect(() => {
        if (error) {
            message.error(error);
        }
        if (successMessage !== "") {
            message.success("Xóa phim thành công!");
        }
    }, [error, successMessage]);

    const columns = [
        {
            key: "maPhim",
            title: "Mã phim",
            dataIndex: "maPhim",
            sorter: true,
            width: "15%",
        },
        {
            key: "hinhAnh",
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            render: (text: string) => <img src={text} alt="" width={50} height={50} />,
            width: "10%",
        },
        {
            key: "tenPhim",
            title: "Tên phim",
            dataIndex: "tenPhim",
            sorter: true,
            width: "15%",
        },
        {
            key: "biDanh",
            title: "Bí danh",
            dataIndex: "biDanh",
            width: "20%",
        },
        { key: "ngayKhoiChieu", title: "Ngày chiếu", dataIndex: "ngayKhoiChieu", width: "20%" },
        { key: "danhGia", title: "Đánh giá", dataIndex: "danhGia" },

        {
            key: "options",
            title: "Chuc nang",
            dataIndex: "options",
            render: (text: string, record: any, index: number) => (
                <Space size="middle">
                    <Tooltip title="edit">
                        <Buttons
                            onClick={() => {
                                history.push({
                                    pathname: `${ROUTES.FORMADMIN}/${record.maPhim}`,
                                    state: { isEdit: true },
                                });
                            }}
                            className="icon-button"
                            shape="circle"
                            icon={<EditOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="delete">
                        <Popconfirm
                            onConfirm={async () => {
                                const maPhim = record.maPhim;
                                await dispatch(
                                    movieManagementActions.deleteMovieAction({ maPhim }),
                                );
                                dispatch(actions.getPaginateMoviesAction(resPagination));
                            }}
                            title="Bạn có muốn xóa phim này không?"
                            okText="Có"
                            cancelText="Không"
                        >
                            <Buttons
                                className="icon-button"
                                danger
                                shape="circle"
                                icon={<DeleteOutlined />}
                            />
                        </Popconfirm>
                    </Tooltip>
                </Space>
            ),
            align: "center" as const,
        },
    ];

    return (
        <Wrapper>
            <Filter />
            <Table
                columns={columns}
                dataSource={moviePagination.items || moviePagination}
                sticky
                loading={isLoading}
                pagination={{
                    total: moviePagination.totalCount,
                    onChange: handlePageChange,
                    defaultPageSize: 10,
                    onShowSizeChange: (curren, size) => {
                        console.log("curren", curren);
                        console.log("size", size);
                    },
                    pageSizeOptions: ["10", "20", "50", "100"],
                }}
            />
        </Wrapper>
    );
}

const Wrapper = styled.div``;
