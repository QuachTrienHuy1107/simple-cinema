/**
 *
 * MovieManagement
 *
 */
import { DeleteOutlined } from "@ant-design/icons";
import { Form, message, Popconfirm, Space, Table, Tooltip } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import usePagination from "hooks/usePagination";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { Operations } from "../../components/Operations";
import { useDebounce } from "../../hooks/useDebounce";
import { MovieForm } from "./MovieForm";
import { useMovieManagementSlice } from "./slice";
import { selectMovieManagement } from "./slice/selectors";

interface Props {}

export function MovieManagement(props: Props) {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { actions } = useHomeSlice();
    const { movieManagementActions } = useMovieManagementSlice();
    const { successMessage, error } = useSelector(selectMovieManagement);
    const { moviePagination, isLoading } = useSelector(selectHome);
    const { resPagination, handlePageChange } = usePagination(1, 10);
    const [visible, setVisible] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const { input } = useDebounce();

    const handleOk = () => {
        setOpen(!open);
    };

    const handleCancle = () => {
        setOpen(!open);
    };

    React.useEffect(() => {
        if (input === "") {
            dispatch(actions.getPaginateMoviesAction(resPagination));
        }
        return () => {
            dispatch(movieManagementActions.clearData());
        };
    }, [resPagination, input, dispatch, actions]);

    React.useEffect(() => {
        if (error) {
            message.error(error);
        }
        if (successMessage !== "") {
            message.success({ content: successMessage, duration: 1 }).then(() => {
                dispatch(actions.getPaginateMoviesAction(resPagination));
            });
        }
    }, [error, successMessage]);

    const columns = [
        {
            key: "maPhim",
            title: "Mã phim",
            dataIndex: "maPhim",
            sorter: true,
            width: "10%",
        },
        {
            key: "hinhAnh",
            title: "Hình ảnh",
            dataIndex: "hinhAnh",
            render: (src: string) => <img src={src} alt="" width={50} height={50} />,
            width: "10%",
        },
        {
            key: "tenPhim",
            title: "Tên phim",
            dataIndex: "tenPhim",
            sorter: true,
            width: "13%",
        },
        {
            key: "biDanh",
            title: "Bí danh",
            dataIndex: "biDanh",
            width: "13%",
        },
        {
            key: "trailer",
            title: "Trailer",
            dataIndex: "trailer",
            width: "25%",
            render: (text: string) => (
                <>
                    <a onClick={() => setOpen(true)}>{text}</a>
                    {/* <Modal
                        title="Basic Modal"
                        visible={open}
                        onOk={handleOk}
                        onCancel={handleCancle}
                        bodyStyle={{ width: "100%", height: "100%", background: "red" }}
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal> */}
                </>
            ),
        },
        {
            key: "ngayKhoiChieu",
            title: "Ngày chiếu",
            dataIndex: "ngayKhoiChieu",
            width: "10%",
            render: (date: string) => <span>{moment(date).format("DD-MM-YYYY")}</span>,
        },
        { key: "danhGia", title: "Đánh giá", width: "10%", dataIndex: "danhGia" },

        {
            key: "options",
            title: "Chuc nang",
            dataIndex: "options",
            render: (text: string, record: any, index: number) => (
                <Space size="middle">
                    <Tooltip title="edit">
                        <MovieForm record={record} edit={true} />
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
            <Form>
                <Operations />
                <Table
                    columns={columns}
                    dataSource={moviePagination.items || moviePagination}
                    sticky
                    loading={isLoading}
                    pagination={{
                        total: moviePagination.totalCount,
                        onChange: handlePageChange,
                        defaultPageSize: 10,
                        onShowSizeChange: (curren, size) => {},
                        pageSizeOptions: ["10", "20", "50", "100"],
                    }}
                />
            </Form>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
