/**
 *
 * Schedule
 *
 */
import { Button, Collapse, Divider, Space, Tabs, Tag } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ANCHOR, ROUTES } from "utils/constants/settings";
import bgTime from "./assets/movie-seat.png";
import { useGetRangeTime } from "./hooks/useGetRangeTime";
import { TimePlay } from "./TimePlay";
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
    const { getRangeTime } = useGetRangeTime();

    console.log("cinemaList", cinemaList);

    const renderCinema = (cinemaList: CinemaListResponse[], Mobile: any, Desktop: any) => {
        return cinemaList?.map((item: CinemaListResponse) => (
            <TabContent
                tab={<img src={item.logo} alt={item.tenHeThongRap} width={40} />}
                key={item.maHeThongRap}
            >
                <Desktop>
                    <Tabs tabPosition="left">
                        {item.lstCumRap?.map((cinema: CinemaListProps) => {
                            const cinemaName = cinema?.tenCumRap.split("-");
                            return (
                                <TabPane
                                    key={cinema.maCumRap}
                                    tab={
                                        <TabLeft>
                                            <div>
                                                <h5 className="schedule__left--title schedule__left--title-left">
                                                    {cinemaName[0]}
                                                </h5>
                                                {" - "}
                                                <h5 className="schedule__left--title schedule__left--title-right">
                                                    {cinemaName[1]}
                                                </h5>
                                            </div>

                                            <span className="schedule__left--address">
                                                {cinema.diaChi}
                                            </span>
                                            <Link to="/">Chi tiet</Link>
                                        </TabLeft>
                                    }
                                >
                                    {cinema.danhSachPhim?.slice(0, 3).map((movie: MovieProps) => {
                                        return (
                                            <>
                                                {movie.lstLichChieuTheoPhim.length === 0 && (
                                                    <p>Khong co</p>
                                                )}
                                                <TabRight className="schedule__right">
                                                    <div style={{ width: "100%" }}>
                                                        <Collapse
                                                            ghost
                                                            expandIconPosition="right"
                                                            key={movie.maPhim}
                                                        >
                                                            <Panel
                                                                header={
                                                                    <>
                                                                        <Space className="schedule__right--header-img">
                                                                            <img
                                                                                src={movie.hinhAnh}
                                                                                alt={movie.tenPhim}
                                                                                width={50}
                                                                                height={50}
                                                                            />
                                                                            <MovieInfo>
                                                                                <div
                                                                                    style={{
                                                                                        display:
                                                                                            "flex",
                                                                                    }}
                                                                                >
                                                                                    <Tag
                                                                                        color="#f50"
                                                                                        style={{
                                                                                            lineHeight:
                                                                                                "24px",
                                                                                        }}
                                                                                    >
                                                                                        C13
                                                                                    </Tag>
                                                                                    {" - "}
                                                                                    <h5>
                                                                                        {
                                                                                            movie.tenPhim
                                                                                        }
                                                                                    </h5>
                                                                                </div>
                                                                                <div>
                                                                                    <span className="info__score">
                                                                                        116p - TIX
                                                                                        8.6 - IMDb
                                                                                        10
                                                                                    </span>
                                                                                </div>
                                                                            </MovieInfo>
                                                                        </Space>
                                                                    </>
                                                                }
                                                                key={movie.maPhim}
                                                                style={{ fontSize: "1rem" }}
                                                            >
                                                                <p
                                                                    style={{
                                                                        margin: "15px 0 5px 5px",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    2D Digital
                                                                </p>

                                                                <TimePlay
                                                                    movie={
                                                                        movie.lstLichChieuTheoPhim
                                                                    }
                                                                />
                                                            </Panel>
                                                        </Collapse>
                                                    </div>
                                                </TabRight>
                                                <Divider />
                                            </>
                                        );
                                    })}
                                </TabPane>
                            );
                        })}
                    </Tabs>
                </Desktop>
                <Mobile>
                    <Collapse>
                        {item.lstCumRap?.map((cinemaList: CinemaListProps) => {
                            const cinemaName = cinemaList.tenCumRap.split("-");
                            return (
                                <Panel
                                    showArrow={false}
                                    header={
                                        <TabLeft>
                                            <div>
                                                <h5 className="schedule__left--title schedule__left--title-left">
                                                    {cinemaName[0]}
                                                </h5>
                                                {" - "}
                                                <h5 className="schedule__left--title schedule__left--title-right">
                                                    {cinemaName[1]}
                                                </h5>
                                            </div>

                                            <span className="schedule__left--address">
                                                {cinemaList.diaChi}
                                            </span>
                                        </TabLeft>
                                    }
                                    key={cinemaList.maCumRap}
                                >
                                    {cinemaList.danhSachPhim.map((movieList: MovieProps) => (
                                        <>
                                            <TabRight key={movieList.maPhim}>
                                                <div style={{ width: "100%" }}>
                                                    <Collapse ghost expandIconPosition="right">
                                                        <Panel
                                                            header={
                                                                <>
                                                                    <Space className="schedule__right--header-img">
                                                                        <img
                                                                            src={movieList.hinhAnh}
                                                                            alt={movieList.tenPhim}
                                                                            width={50}
                                                                            height={50}
                                                                        />
                                                                        <MovieInfo>
                                                                            <div
                                                                                style={{
                                                                                    display: "flex",
                                                                                    alignItems:
                                                                                        "center",
                                                                                }}
                                                                            >
                                                                                <Tag
                                                                                    color="#f50"
                                                                                    style={{
                                                                                        lineHeight:
                                                                                            "24px",
                                                                                    }}
                                                                                >
                                                                                    C13
                                                                                </Tag>
                                                                                {" - "}
                                                                                <h5>
                                                                                    {
                                                                                        movieList.tenPhim
                                                                                    }
                                                                                </h5>
                                                                            </div>
                                                                            <div>
                                                                                <span className="info__score">
                                                                                    116p - TIX 8.6 -
                                                                                    IMDb 10
                                                                                </span>
                                                                            </div>
                                                                        </MovieInfo>
                                                                    </Space>
                                                                </>
                                                            }
                                                            key={movieList.maPhim}
                                                            style={{ fontSize: "1rem" }}
                                                        >
                                                            <p
                                                                style={{
                                                                    margin: "5px 0 5px 5px",
                                                                    fontWeight: 600,
                                                                }}
                                                            >
                                                                2D Digital
                                                            </p>
                                                            <TimePlay
                                                                movie={
                                                                    movieList.lstLichChieuTheoPhim
                                                                }
                                                            />
                                                        </Panel>
                                                    </Collapse>
                                                </div>
                                            </TabRight>
                                            <Divider />
                                        </>
                                    ))}
                                </Panel>
                            );
                        })}
                    </Collapse>
                </Mobile>
            </TabContent>
        ));
    };

    return (
        <Wrapper id={ANCHOR.CINEMATO}>
            <Tabs defaultActiveKey="1" centered style={{ transition: "all 0.5s" }} size="large">
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

    .schedule__left {
        &--title {
            font-size: 1rem;
            font-weight: 500;
            display: inline;

            &-left {
                color: ${props => props.theme.titleColor};
            }
        }

        &--address {
            font-size: 0.8rem;
            color: #636363;
        }
    }
`;

const TabRight = styled.div`
    margin-bottom: 10px;
    h5 {
        font-size: 1rem;
    }

    .ant-collapse-content-box {
        /*  display: flex;
        flex-wrap: wrap; */
        padding-top: 10px !important;
        padding-bottom: 0;
    }

    .ant-collapse-header {
        padding-top: 0 !important;
    }
`;

const MovieInfo = styled.div`
    h5 {
        margin-bottom: 0;
        margin-left: 5px;
        font-weight: 700;
    }

    > span {
        line-height: 21px;
    }

    .info {
        &__score {
            font-size: 0.75rem;
            color: #b7b3b3;
            font-weight: 500;
        }
    }
`;
