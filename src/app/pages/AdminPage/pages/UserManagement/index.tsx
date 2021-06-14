/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * UserManagement
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import {
    Space,
    Table,
    Tooltip,
    Popconfirm,
    Button,
    Avatar,
    message,
    Form,
    InputNumber,
    Input,
    Select,
} from "antd";
import {
    CheckOutlined,
    CloseCircleFilled,
    CloseCircleOutlined,
    DeleteOutlined,
    DownOutlined,
    EditOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Buttons } from "app/components/Common/Buttons";
import usePagination from "hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { useUserSlice } from "./slice";
import { selectUser } from "./slice/selectors";
import { useHistory } from "react-router";
import { Operations } from "../../components/Operations";
import { UserState } from "./slice/types";
import { useDebounce } from "../../hooks/useDebounce";
import UserPlayground from "./UserPlayground";

interface Props {}

const { Option } = Select;

interface DataType {
    key?: React.Key;
    avatar?: any;
    taiKhoan: string;
    hoTen: string;
    email: string;
    soDt: string;
    matKhau: string;
    maLoaiNguoiDung: string;
    options?: any;
}

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "select" | "text";
    record: DataType;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Không được bỏ trống`,
                        },
                    ]}
                >
                    {(inputType !== "select" && <Input />) || (
                        <Select>
                            <Option value={"QuanTri"} key={"QuanTri"}>
                                Quản trị
                            </Option>
                            <Option value={"KhachHang"} key={"KhachHang"}>
                                Khách hàng
                            </Option>
                        </Select>
                    )}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

export function UserManagement(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { resPagination, handlePageChange } = usePagination(1, 10);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { actions } = useUserSlice();
    const { user, isLoading, successMessage, error } = useSelector(selectUser) as UserState;
    const [editingKey, setEditingKey] = React.useState<any>("");

    const isEditing = (record: DataType) => record.taiKhoan === editingKey;

    const { input } = useDebounce();

    React.useEffect(() => {
        if (input === "") {
            dispatch(actions.getPaginateUserAction(resPagination));
        }
    }, [actions, dispatch, input, resPagination, successMessage]);

    React.useEffect(() => {
        if (error) {
            message.error({ content: error });
        }
        if (successMessage !== "") {
            message.success(successMessage);
        }
    }, [error, successMessage]);

    const handleEdit = (record: Partial<DataType & { key: React.Key }>) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.taiKhoan);
    };

    const onFinish = async (values: DataType) => {
        const dataField = await form.validateFields();
        const data = {
            ...dataField,
            taiKhoan: values.taiKhoan,
            matKhau: values.matKhau,
            maNhom: "GP01",
        };

        await dispatch(actions.editProfileUserAction(data));
        setEditingKey("");
    };

    const columns = [
        {
            key: "avatar",
            title: "Avatar",
            dataIndex: "avatar",
            render: (text: string) => <Avatar icon={<UserOutlined />} />,
            width: "8%",
        },
        {
            key: "taiKhoan",
            title: "Tài khoản",
            dataIndex: "taiKhoan",
            sorter: true,
            editable: false,
            width: "15%",
        },
        {
            key: "hoTen",
            title: "Họ tên",
            dataIndex: "hoTen",
            sorter: true,
            width: "15%",
            editable: true,
        },
        {
            key: "email",
            title: "Email",
            dataIndex: "email",
            width: "22%",
            editable: true,
        },
        { key: "soDt", title: "Số điện thoại", dataIndex: "soDt", editable: true },
        {
            key: "maLoaiNguoiDung",
            title: "Loại người dùng",
            dataIndex: "maLoaiNguoiDung",
            editable: true,
        },

        {
            key: "options",
            title: "Chuc nang",
            dataIndex: "options",
            render: (text: string, record: DataType) => {
                const isEdit = isEditing(record);
                return (
                    <>
                        <Space size="middle">
                            <div>
                                {(isEdit && (
                                    <Space>
                                        <Buttons
                                            type="primary"
                                            htmlType="submit"
                                            shape="circle"
                                            icon={<CheckOutlined />}
                                            onClick={() => {
                                                onFinish(record);
                                            }}
                                        />

                                        <Popconfirm
                                            title="Sure to cancel?"
                                            onConfirm={() => {
                                                setEditingKey("");
                                            }}
                                        >
                                            <Buttons
                                                className="icon-button"
                                                shape="circle"
                                                icon={<CloseCircleOutlined />}
                                            />
                                        </Popconfirm>
                                    </Space>
                                )) || (
                                    <Space>
                                        <Tooltip title="edit">
                                            <Buttons
                                                disabled={editingKey !== ""}
                                                className="icon-button"
                                                shape="circle"
                                                icon={<EditOutlined />}
                                                onClick={() => {
                                                    handleEdit(record);
                                                }}
                                            />
                                        </Tooltip>
                                        <Tooltip title="delete">
                                            <Popconfirm
                                                title="Bạn có muốn xóa người dùng này không?"
                                                onConfirm={async () => {
                                                    const userName = record.taiKhoan;
                                                    await dispatch(
                                                        actions.deleteUserAction(userName),
                                                    );
                                                    dispatch(
                                                        actions.getPaginateUserAction(
                                                            resPagination,
                                                        ),
                                                    );
                                                }}
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <Button
                                                    disabled={editingKey !== ""}
                                                    className="icon-button"
                                                    danger
                                                    shape="circle"
                                                    icon={<DeleteOutlined />}
                                                />
                                            </Popconfirm>
                                        </Tooltip>
                                    </Space>
                                )}
                            </div>
                        </Space>
                    </>
                );
            },
            align: "center" as const,
        },
    ];

    const mergedColumns = columns.map(col => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: record => ({
                record,
                inputType: col.dataIndex === "maLoaiNguoiDung" ? "select" : "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Wrapper>
            <Form form={form} component={false} onFinish={onFinish}>
                <Operations />
                <Table
                    columns={mergedColumns}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowClassName="editable-row"
                    dataSource={user.items}
                    sticky
                    loading={isLoading}
                    pagination={{
                        total: user.totalCount,
                        onChange: handlePageChange,
                        pageSizeOptions: ["10", "20", "50", "100"],
                    }}
                />
            </Form>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
