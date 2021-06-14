/**
 *
 * UserStatistic
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";

import { Card, Col, Row, Space, Table, Tag } from "antd";
import { browserData } from "../../fakeData";
import { CartesianGrid, LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { cpuData } from "../../fakeData";
import ProfileAdmin from "./components/ProfileAdmin";

interface Props {}

const { Meta } = Card;

const status = {
    1: {
        color: "#64ea91",
    },
    2: {
        color: "#f8c82e",
    },
    3: {
        color: "#8fc9fb",
    },
    4: {
        color: "#f69899",
    },
};

export const DashboardDetail = memo((props: Props) => {
    const columns = [
        {
            title: "name",
            dataIndex: "name",
        },
        {
            title: "percent",
            dataIndex: "percent",
            className: "percent",
            render: (text, it) => <Tag color={status[it.status].color}>{text}%</Tag>,
        },
    ];

    return (
        <Wrapper>
            <Row gutter={[24, 0]}>
                <Col span={8}>
                    <BrowserStatistic
                        pagination={false}
                        showHeader={false}
                        columns={columns}
                        rowKey="name"
                        dataSource={browserData}
                    />
                </Col>
                <Col span={8}>
                    <CinemaChart>
                        <CPUDetail>
                            <div className="item">
                                <p>Usage</p>
                                <p>312GB</p>
                            </div>
                            <div className="item">
                                <p>Space</p>
                                <p>825GB</p>
                            </div>
                            <div className="item">
                                <p>CPU</p>
                                <p>42%</p>
                            </div>
                        </CPUDetail>
                        <ResponsiveContainer minHeight={340}>
                            <LineChart data={cpuData} margin={{ left: -22 }}>
                                <XAxis
                                    dataKey="name"
                                    axisLine={{ stroke: "#e5e5e5", strokeWidth: 1 }}
                                    tickLine={false}
                                />
                                <YAxis axisLine={false} tickLine={false} />
                                <CartesianGrid
                                    vertical={false}
                                    stroke={"#e5e5e5"}
                                    strokeDasharray="3 3"
                                />
                                <Line
                                    type="monotone"
                                    dataKey="cpu"
                                    stroke="#8fc9fb"
                                    fill="#8fc9fb"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CinemaChart>
                </Col>
                <Col span={8}>
                    <ProfileAdmin />
                </Col>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div``;

const BrowserStatistic = styled(Table)`
    height: 100%;
    .percent {
        text-align: right;
    }

    .ant-table,
    .ant-spin-nested-loading,
    .ant-spin-container {
        height: 100%;
    }
`;

const CinemaChart = styled.div`
    background: #fff;
    padding: 10px 20px;
`;

const CPUDetail = styled.div`
    display: flex;
    margin-bottom: 10px;
    .item {
        text-align: center;
        height: 64px;
        width: 100%;
        position: relative;

        & + .item {
            &::before {
                content: "";
                display: block;
                width: 1px;
                height: 40px;
                position: absolute;
                background: #f5f5f5;
                top: 12px;
            }
        }

        p {
            color: #757575;

            &:first-child {
                font-size: 16px;
            }

            &:last-child {
                font-size: 20px;
                font-weight: 700;
            }
        }
    }
`;

const CardStyle = styled(Card)`
    height: 100px;

    img {
        width: 100%;
    }
`;
