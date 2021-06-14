/**
 *
 * CinemaStatistic
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Pie, defaults, Bar } from "react-chartjs-2";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    AreaChart,
    Area,
} from "recharts";

import { Col, Row } from "antd";
import { curveCardinal } from "d3-shape";
import { cinemaData, userData } from "../../fakeData";

interface Props {}

export const CinemaStatistic = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Row gutter={[0, 40]}>
                <Col span={24}>
                    <CinemaChart>
                        <h1>Doanh thu rạp</h1>
                        <ResponsiveContainer minHeight={360}>
                            <LineChart data={cinemaData}>
                                <Legend
                                    verticalAlign="top"
                                    content={prop => {
                                        const { payload } = prop;

                                        return (
                                            <LegendStyle>
                                                {payload?.map((item: any) => {
                                                    return (
                                                        <li key={item.key}>
                                                            <span
                                                                style={{ background: item.color }}
                                                            ></span>
                                                            {item.value}
                                                        </li>
                                                    );
                                                })}
                                            </LegendStyle>
                                        );
                                    }}
                                />
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#e5e5e5"
                                    strokeDasharray="3 3"
                                />
                                <XAxis
                                    dataKey="name"
                                    axisLine={{ stroke: "#e5e5e5", strokeWidth: 1 }}
                                    tickLine={false}
                                />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="BHDStar"
                                    stroke="#64ea91"
                                    strokeWidth={3}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="CGV"
                                    stroke="#a8071a"
                                    strokeWidth={3}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="CineStar"
                                    stroke="#662D91"
                                    strokeWidth={3}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="Galaxy"
                                    stroke="#FF8D00"
                                    strokeWidth={3}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="LotteCinima"
                                    stroke="#5b8c00"
                                    strokeWidth={3}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="MegaGS"
                                    stroke="#fffb8f"
                                    strokeWidth={3}
                                    activeDot={{ r: 5, strokeWidth: 0 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </CinemaChart>
                </Col>
                <Col span={24}>
                    <Row gutter={[12, 0]}>
                        <Col span={12}>
                            <CinemaChart>
                                <Bar
                                    type="bar"
                                    data={{
                                        labels: [
                                            "BHDStar",
                                            "CGV",
                                            "CineStar",
                                            "Galaxy",
                                            "LotteCinema",
                                            "MegaGS",
                                        ],
                                        datasets: [
                                            {
                                                label: "Total store",
                                                data: [22, 46, 23, 35, 24, 16],
                                                backgroundColor: [
                                                    "rgba(255, 99, 132, 0.2)",
                                                    "rgba(54, 162, 235, 0.2)",
                                                    "rgba(255, 206, 86, 0.2)",
                                                    "rgba(75, 192, 192, 0.2)",
                                                    "rgba(153, 102, 255, 0.2)",
                                                    "rgba(255, 159, 64, 0.2)",
                                                ],
                                                borderColor: [
                                                    "rgba(255, 99, 132, 1)",
                                                    "rgba(54, 162, 235, 1)",
                                                    "rgba(255, 206, 86, 1)",
                                                    "rgba(75, 192, 192, 1)",
                                                    "rgba(153, 102, 255, 1)",
                                                    "rgba(255, 159, 64, 1)",
                                                ],
                                                borderWidth: 1,
                                            },
                                            // {
                                            //   label: 'Quantity',
                                            //   data: [47, 52, 67, 58, 9, 50],
                                            //   backgroundColor: 'orange',
                                            //   borderColor: 'red',
                                            // },
                                        ],
                                    }}
                                    height={400}
                                    width={600}
                                    options={{
                                        maintainAspectRatio: false,
                                        scales: {
                                            yAxes: [
                                                {
                                                    ticks: {
                                                        beginAtZero: true,
                                                    },
                                                },
                                            ],
                                        },
                                        legend: {
                                            labels: {
                                                fontSize: 25,
                                            },
                                        },
                                    }}
                                />
                            </CinemaChart>
                        </Col>
                        <Col span={12}>
                            <CinemaChart>
                                <ResponsiveContainer minHeight={400} width={"100%"}>
                                    <AreaChart
                                        data={userData}
                                        margin={{
                                            top: 10,
                                            right: 30,
                                            left: 0,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip />
                                        <Area
                                            type={curveCardinal.tension(0.2)}
                                            dataKey="clients"
                                            stroke="#82ca9d"
                                            fill="#82ca9d"
                                            fillOpacity={0.3}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </CinemaChart>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    h1 {
        font-size: 1.3rem;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 20px;
    }
`;

const CinemaChart = styled.div`
    background: #fff;
    padding: 30px;
`;

const LegendStyle = styled.ul`
    text-align: right;
    color: #999;
    font-size: 14px;

    li {
        height: 48px;
        line-height: 48px;
        display: inline-block;

        & + li {
            margin-left: 24px;
        }

        span {
            width: 12px;
            height: 12px;
            margin-right: 8px;
            border-radius: 50%;
            display: inline-block;
        }
    }
`;
