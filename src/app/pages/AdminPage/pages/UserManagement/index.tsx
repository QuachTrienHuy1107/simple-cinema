/**
 *
 * UserManagement
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Space, Table, Tooltip, Popconfirm } from "antd";
import { DeleteOutlined, DownOutlined, EditOutlined } from "@ant-design/icons";
import { Buttons } from "app/components/Common/Buttons";

interface Props {}

export function UserManagement(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Age",
            dataIndex: "age",
            sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Address",
            dataIndex: "address",
            filters: [
                {
                    text: "London",
                    value: "London",
                },
                {
                    text: "New York",
                    value: "New York",
                },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
        },
        {
            title: "Action",
            key: "action",
            sorter: true,
            render: () => (
                <Space size="middle">
                    <Tooltip title="edit">
                        <Buttons className="icon-button" shape="circle" icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title="delete">
                        <Popconfirm
                            title="Bạn có muốn xóa người dùng này không?"
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
        },
    ];

    const data: any = [];
    for (let i = 1; i <= 10; i++) {
        data.push({
            key: i,
            name: "John Brown",
            age: `${i}2`,
            address: `New York No. ${i} Lake Park`,
            description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
        });
    }

    return (
        <Wrapper>
            <Table columns={columns} dataSource={data} sticky />
        </Wrapper>
    );
}

const Wrapper = styled.div``;
