/**
 *
 * Schedule
 *
 */
import { Button, Collapse, Divider, Space, Tabs } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ROUTES } from "utils/constants/settings";
import bgTime from "./assets/movie-seat.png";
import { CinemaListProps, CinemaListResponse, MovieProps, TimerProps } from "./types";

interface IScheduleProps {
    cinemaList: CinemaListResponse | any;
}

const { TabPane } = Tabs;
const { Panel } = Collapse;

export const Schedule = memo(({ cinemaList }: IScheduleProps) => {
    const { t, i18n } = useTranslation();
    const { Mobile, Desktop } = useScreenType();
    const history = useHistory();

    const renderCinema = (cinemaList: CinemaListResponse[], Mobile: any, Desktop: any) => {
        return cinemaList?.map((item: CinemaListResponse) => (
            <TabContent
                tab={<img src={item.logo} alt={item.tenHeThongRap} width={40} />}
                key={item.maHeThongRap}
            >
                <Desktop>
                    <Tabs tabPosition="left">
                        {item.lstCumRap?.map((cinema: CinemaListProps) => (
                            <TabPane
                                key={cinema.maCumRap}
                                tab={
                                    <TabLeft>
                                        <h5 className="schedule__left--title">
                                            {cinema.tenCumRap}
                                        </h5>

                                        <span className="schedule__left--address">
                                            {cinema.diaChi}
                                        </span>
                                        <Link to="/">Chi tiet</Link>
                                    </TabLeft>
                                }
                            >
                                {cinema.danhSachPhim?.slice(0, 6).map((movie: MovieProps) => (
                                    <>
                                        <TabRight className="schedule__right">
                                            <div style={{ width: "100%" }}>
                                                <Collapse
                                                    ghost
                                                    expandIconPosition="right"
                                                    key={movie.maPhim}
                                                >
                                                    <Panel
                                                        header={
                                                            <Space className="schedule__right--header-img">
                                                                <img
                                                                    src={movie.hinhAnh}
                                                                    alt={movie.tenPhim}
                                                                    width={50}
                                                                    height={50}
                                                                />
                                                                <h5>{movie.tenPhim}</h5>
                                                            </Space>
                                                        }
                                                        key={movie.maPhim}
                                                        style={{ fontSize: "1rem" }}
                                                    >
                                                        {movie.lstLichChieuTheoPhim
                                                            .slice(0, 10)
                                                            ?.map((timer: TimerProps) => (
                                                                <Timer
                                                                    className="schedule__right--timer"
                                                                    key={timer.maLichChieu}
                                                                    onClick={() => {
                                                                        history.push(
                                                                            `${ROUTES.CHECKOUT}/${timer.maLichChieu}`,
                                                                        );
                                                                    }}
                                                                >
                                                                    {moment(
                                                                        timer.ngayChieuGioChieu,
                                                                    ).format("hh:MM A")}
                                                                </Timer>
                                                            ))}
                                                    </Panel>
                                                </Collapse>
                                            </div>
                                        </TabRight>
                                        <Divider />
                                    </>
                                ))}
                            </TabPane>
                        ))}
                    </Tabs>
                </Desktop>
                <Mobile>
                    <Collapse>
                        {item.lstCumRap?.map((cinemaList: CinemaListProps) => (
                            <Panel
                                showArrow={false}
                                header={cinemaList.tenCumRap}
                                key={cinemaList.maCumRap}
                            >
                                {cinemaList.danhSachPhim.map((movieList: MovieProps) => (
                                    <TabRight className="schedule__right" key={movieList.maPhim}>
                                        <div style={{ width: "100%" }}>
                                            <Collapse ghost expandIconPosition="right">
                                                <Panel
                                                    header={
                                                        <div className="schedule__right--header">
                                                            <Space className="schedule__right--header-img">
                                                                <img
                                                                    src={movieList.hinhAnh}
                                                                    alt={movieList.tenPhim}
                                                                    width={40}
                                                                />
                                                                <h5>{movieList.tenPhim}</h5>
                                                            </Space>
                                                        </div>
                                                    }
                                                    key={movieList.maPhim}
                                                    style={{ fontSize: "1rem" }}
                                                >
                                                    {movieList.lstLichChieuTheoPhim
                                                        .slice(0, 10)
                                                        ?.map((timer: TimerProps) => (
                                                            <Timer
                                                                className="schedule__right--timer"
                                                                key={timer.maLichChieu}
                                                                onClick={() => {
                                                                    history.push(
                                                                        `${ROUTES.CHECKOUT}/${timer.maLichChieu}`,
                                                                    );
                                                                }}
                                                            >
                                                                {moment(
                                                                    timer.ngayChieuGioChieu,
                                                                ).format("hh:MM A")}
                                                            </Timer>
                                                        ))}
                                                </Panel>
                                            </Collapse>
                                        </div>
                                    </TabRight>
                                ))}
                            </Panel>
                        ))}
                    </Collapse>
                </Mobile>
            </TabContent>
        ));
    };

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" centered style={{ transition: "all 0.5s" }}>
                {renderCinema(cinemaList, Mobile, Desktop)}
            </Tabs>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

    ${media.medium`
         width: 80%;
     `}

    @media screen and (max-width: 576px) {
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

    &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        background-color: transparent;
    }
    &::-webkit-scrollbar {
        width: 3px !important;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #bbb8b8;
        background-clip: content-box;
        border-radius: 20px;
    }
`;

const TabLeft = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;

    .schedule__left--title {
        font-size: 1rem;
        color: ${props => props.theme.titleColor};
    }

    .schedule__left--address {
        font-size: 0.8rem;
        color: #636363;
    }
`;

const TabRight = styled.div`
    margin-bottom: 10px;
    h5 {
        font-size: 1rem;
    }

    .ant-collapse-content-box {
        display: flex;
        flex-wrap: wrap;
        padding-top: 10px !important;
        padding-bottom: 0;
    }

    .ant-collapse-header {
        padding-top: 0 !important;
    }
`;

const Timer = styled.span`
    background-color: #ebebeb;
    border-radius: 5px;
    background-size: cover;
    font-size: 0.8rem;
    padding: 8px 10px;
    margin-right: 10px;
    margin-top: 10px;
    cursor: pointer;

    @media screen and (max-width: 576px) {
        font-size: $text6;
    }
`;
