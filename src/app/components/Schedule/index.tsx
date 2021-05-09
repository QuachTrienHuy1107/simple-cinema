/**
 *
 * Schedule
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Collapse, Tabs } from "antd";
import { Link } from "react-router-dom";
import { CinemaListResponse, CinemaListProps, MovieProps, TimerProps } from "./types";
import moment from "moment";
import { time } from "console";

interface IScheduleProps {
    cinemaList: CinemaListResponse | any;
}

const { TabPane } = Tabs;
const { Panel } = Collapse;

const renderCinema = (cinemaList: CinemaListResponse[]) => {
    return cinemaList?.map((item: CinemaListResponse) => (
        <TabContent
            tab={<img src={item.logo} alt={item.tenHeThongRap} width={40} />}
            key={item.maHeThongRap}
        >
            <Tabs tabPosition="left" style={{ color: "#fff" }}>
                {item.lstCumRap?.map((cinema: CinemaListProps) => (
                    <TabPane
                        key={cinema.maCumRap}
                        tab={
                            <TabLeft>
                                <h5 className="schedule__left--title">{cinema.tenCumRap}</h5>

                                <span className="schedule__left--address">{cinema.diaChi}</span>
                                <Link to="/">Chi tiet</Link>
                            </TabLeft>
                        }
                    >
                        {cinema.danhSachPhim?.map((movie: MovieProps) => (
                            <TabRight className="schedule__right" key={movie.maPhim}>
                                <div style={{ width: "100%" }}>
                                    <Collapse ghost expandIconPosition="right">
                                        <Panel
                                            header={
                                                <div className="schedule__right--header">
                                                    <div className="schedule__right--header-img">
                                                        <img
                                                            src={movie.hinhAnh}
                                                            alt={movie.tenPhim}
                                                            width={40}
                                                        />
                                                    </div>
                                                    <h5>{movie.tenPhim}</h5>
                                                </div>
                                            }
                                            key="1"
                                            style={{ fontSize: "1rem" }}
                                        >
                                            {movie.lstLichChieuTheoPhim
                                                .slice(0, 10)
                                                ?.map((timer: TimerProps) => (
                                                    <span
                                                        className="schedule__right--timer"
                                                        key={timer.maLichChieu}
                                                    >
                                                        {moment(timer.ngayChieuGioChieu).format(
                                                            "hh:MM A",
                                                        )}
                                                    </span>
                                                ))}
                                        </Panel>
                                    </Collapse>
                                </div>
                            </TabRight>
                        ))}
                    </TabPane>
                ))}
            </Tabs>
        </TabContent>
    ));
};

export const Schedule = memo(({ cinemaList }: IScheduleProps) => {
    const { t, i18n } = useTranslation();
    console.log("cinemaList", cinemaList);
    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" centered>
                {renderCinema(cinemaList)}
            </Tabs>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    margin: 80px 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    color: #fff;
    @media screen and(max-width: 956px) {
        width: 100%;
    }

    .ant-tabs-nav {
        .ant-tabs-nav-wrap {
            white-space: break-spaces !important;
        }
    }
`;

const TabContent = styled(TabPane)`
    .ant-tabs-nav-list {
        width: 300px;
    }

    height: 500px;
    overflow-y: scroll;
`;

const TabLeft = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;

    &--title {
        font-size: 1.2rem;
        color: $secondaryColor;
    }

    &--address {
        color: $infoColor;
    }
`;

const TabRight = styled.div`
    display: flex;
    padding-bottom: 0;
    &-img {
        width: 80px;
        height: 80px;
        margin-right: 10px;

        @media screen and (max-width: 576px) {
            width: 60px;
            height: 60px;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
`;
