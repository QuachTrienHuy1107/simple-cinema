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
import bgTime from "./assets/movie-seat.png";
import { useScreenType } from "hooks/useScreenType";
import { media } from "styles/media";

interface IScheduleProps {
    cinemaList: CinemaListResponse | any;
}

const { TabPane } = Tabs;
const { Panel } = Collapse;

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
                                    <h5 className="schedule__left--title">{cinema.tenCumRap}</h5>

                                    <span className="schedule__left--address">{cinema.diaChi}</span>
                                    <Link to="/">Chi tiet</Link>
                                </TabLeft>
                            }
                        >
                            {cinema.danhSachPhim?.slice(0, 6).map((movie: MovieProps) => (
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
                                                key={movie.maPhim}
                                                style={{ fontSize: "1rem" }}
                                            >
                                                {movie.lstLichChieuTheoPhim
                                                    .slice(0, 10)
                                                    ?.map((timer: TimerProps) => (
                                                        <Timer
                                                            className="schedule__right--timer"
                                                            key={timer.maLichChieu}
                                                        >
                                                            {moment(timer.ngayChieuGioChieu).format(
                                                                "hh:MM A",
                                                            )}
                                                        </Timer>
                                                    ))}
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </TabRight>
                            ))}
                        </TabPane>
                    ))}
                </Tabs>
            </Desktop>
            <Mobile>
                <Collapse style={{ background: "red" }}>
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
                                                        <div className="schedule__right--header-img">
                                                            <img
                                                                src={movieList.hinhAnh}
                                                                alt={movieList.tenPhim}
                                                                width={40}
                                                            />
                                                        </div>
                                                        <h5>{movieList.tenPhim}</h5>
                                                    </div>
                                                }
                                                key="1"
                                                style={{ fontSize: "1rem" }}
                                            >
                                                {movieList.lstLichChieuTheoPhim
                                                    .slice(0, 10)
                                                    ?.map((timer: TimerProps) => (
                                                        <Timer
                                                            className="schedule__right--timer"
                                                            key={timer.maLichChieu}
                                                        >
                                                            {moment(timer.ngayChieuGioChieu).format(
                                                                "hh:MM A",
                                                            )}
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

export const Schedule = memo(({ cinemaList }: IScheduleProps) => {
    const { t, i18n } = useTranslation();
    const { Mobile, Desktop } = useScreenType();
    console.log("cinemaList", cinemaList);
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
    color: #fff;

    ${media.medium`
         width: 100%;
     `}

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
        background-color: #eeebeb;
        background-clip: content-box;
        border-radius: 20px;
    }

    span {
        color: #fff !important;
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
        color: ${props => props.theme.titleColor};
    }

    a {
        color: ${props => props.theme};
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
    .ant-collapse-content-box {
        display: flex;
        flex-wrap: wrap;
        padding-top: 20px !important;
        padding-bottom: 0;
    }
`;

const Timer = styled.span`
    background-image: url(${bgTime});
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
