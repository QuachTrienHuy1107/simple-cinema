/**
 *
 * Dashboard
 *
 */
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Card, Col, Row, Statistic } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { CinemaStatistic } from "./components/CinemaStatistic";
import { DashboardDetail } from "./components/DashboardDetail";

interface Props {}

export function Dashboard(props: Props) {
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Row gutter={[0, 30]}>
                <Col span={24}>
                    <StatisticGroup>
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Revenue"
                                        precision={2}
                                        value={20.36}
                                        valueStyle={{ color: "#3f8600" }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="User"
                                        precision={2}
                                        value={50.89}
                                        valueStyle={{ color: "#3f8600" }}
                                        prefix={<ArrowUpOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Movies"
                                        precision={2}
                                        value={15.15}
                                        valueStyle={{ color: "#cf1322" }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>

                            <Col span={6}>
                                <Card>
                                    <Statistic
                                        title="Cinema"
                                        value={9.3}
                                        precision={2}
                                        valueStyle={{ color: "#cf1322" }}
                                        prefix={<ArrowDownOutlined />}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </StatisticGroup>
                </Col>
                <Col span={24}>
                    <CinemaStatistic />
                </Col>
                <Col span={24}>
                    <DashboardDetail />
                </Col>
            </Row>
        </Wrapper>
    );
}

const Wrapper = styled.div``;

const StatisticGroup = styled.div`
    padding: 20px 0;

    .ant-statistic-title {
        font-size: 1.5rem;
    }
`;
