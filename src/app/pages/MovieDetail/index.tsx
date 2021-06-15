/**
 *
 * MovieDetail
 *
 */
import { Collapse, Divider, Space, Tabs } from "antd";
import { Banner } from "app/components/Banner";
import { Loading } from "app/components/Common/Loading";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ANCHOR } from "utils/constants/settings";
import { TimePlay } from "../HomePage/components/Schedule/components/TimePlay";
import { MovieDetailPayload } from "../HomePage/slice/types";
import { Comments } from "./components/Comments";
import { Detail } from "./components/Detail";
import { TabDetail } from "./components/TabDetail";
import { useBookingTicketWithDate } from "./hooks/useBookingTicketWithDate";
import { useMovieDetailSlice } from "./slice";
import { selectMovieDetail } from "./slice/selectors";
import { MovieDetailState, MovieInfo, TheaterInfo } from "./slice/types";

interface MovieDetailProps {}

const { Panel } = Collapse;
const { TabPane } = Tabs;

export const MovieDetail: React.FC = (props: MovieDetailProps) => {
    const { Mobile, Desktop } = useScreenType();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { movieDetail, isLoading } = useSelector(selectMovieDetail) as MovieDetailState;
    const { arrayDate } = useBookingTicketWithDate(movieDetail?.ngayKhoiChieu);
    const { actions } = useMovieDetailSlice();
    const { maPhim } = useParams() as MovieDetailPayload;
    const location = useLocation() as any;

    React.useEffect(() => {
        dispatch(actions.getMovieDetailAction({ maPhim }));
        return () => {
            dispatch(actions.clearData());
        };
    }, [actions, dispatch, maPhim]);

    return (
        <>
            {isLoading && <Loading />}
            <Banner movieDetail={movieDetail} />
            <Wrapper id={ANCHOR.SCHEDULETO}>
                <Content>
                    <TabStyle centered defaultActiveKey="1" style={{ marginBottom: 32 }}>
                        {(location?.state && !location.state.isComming && (
                            <TabContent tab="Lịch Chiếu" key="schedule">
                                <Desktop>
                                    <Tabs tabPosition="left">
                                        {movieDetail.heThongRapChieu?.map((item: TheaterInfo) => {
                                            return (
                                                <TabPane
                                                    key={item.maHeThongRap}
                                                    tab={
                                                        <img
                                                            src={item.logo}
                                                            alt={item.tenHeThongRap}
                                                            width="50"
                                                        />
                                                    }
                                                >
                                                    <Tabs defaultActiveKey="1" tabPosition="top">
                                                        {arrayDate.map(
                                                            (date: Date, index: number) => {
                                                                const getDate = moment(date).format(
                                                                    "DD-MM",
                                                                );
                                                                const getWeek = moment(date).format(
                                                                    "dddd",
                                                                );

                                                                return (
                                                                    <TabPane
                                                                        tab={
                                                                            <>
                                                                                <h3
                                                                                    style={{
                                                                                        marginBottom: 0,
                                                                                    }}
                                                                                >
                                                                                    {getWeek}
                                                                                </h3>
                                                                                <span>
                                                                                    {getDate}
                                                                                </span>
                                                                            </>
                                                                        }
                                                                        key={index}
                                                                    >
                                                                        <TabDetail
                                                                            date={date}
                                                                            cumRapChieu={
                                                                                item.cumRapChieu
                                                                            }
                                                                        />
                                                                    </TabPane>
                                                                );
                                                            },
                                                        )}
                                                    </Tabs>
                                                </TabPane>
                                            );
                                        })}
                                    </Tabs>
                                </Desktop>
                                <Mobile>
                                    <Collapse>
                                        {movieDetail.heThongRapChieu?.map((item: TheaterInfo) => {
                                            return (
                                                <Panel
                                                    showArrow={false}
                                                    header={
                                                        <Space>
                                                            <img
                                                                src={item.logo}
                                                                alt={item.tenHeThongRap}
                                                                width={50}
                                                            />
                                                            <span>{item.tenHeThongRap}</span>
                                                        </Space>
                                                    }
                                                    key={item.maHeThongRap}
                                                >
                                                    {item.cumRapChieu?.map((movie: MovieInfo) => {
                                                        return (
                                                            <>
                                                                <TabRight className="schedule__right">
                                                                    <div style={{ width: "100%" }}>
                                                                        <Collapse
                                                                            ghost
                                                                            expandIconPosition="right"
                                                                        >
                                                                            <Panel
                                                                                header={
                                                                                    <Space>
                                                                                        <img
                                                                                            src="https://reviewphimaz.com/wp-content/uploads/2018/07/rap-chieu-phim-bhd-bitexco-tphcm.jpg"
                                                                                            alt=""
                                                                                            width="60"
                                                                                        />
                                                                                        <h5>
                                                                                            {
                                                                                                movie.tenCumRap
                                                                                            }
                                                                                        </h5>
                                                                                    </Space>
                                                                                }
                                                                                key={movie.maCumRap}
                                                                            >
                                                                                <TimePlay
                                                                                    movie={
                                                                                        movie.lichChieuPhim
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
                                                </Panel>
                                            );
                                        })}
                                    </Collapse>
                                </Mobile>
                            </TabContent>
                        )) ||
                            ""}

                        <TabPane tab="Thông Tin" key="info" style={{ padding: 20, color: "#fff" }}>
                            <Detail movieDetail={movieDetail} />
                        </TabPane>
                        <TabPane tab="Đánh giá" key="review">
                            <Comments maPhim={maPhim} />
                        </TabPane>
                    </TabStyle>
                </Content>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.div`
    background-color: rgb(10, 32, 41);
    padding: 10px 0;

    min-height: 800px;
    ${media.medium`
        width: 100%;
    `}

    .ant-tabs-nav-wrap .ant-tabs-nav-wrap-ping-right {
        white-space: break-spaces !important;
    }
`;

const TabStyle = styled(Tabs)`
    > .ant-tabs-nav {
        .ant-tabs-tab {
            color: #fff;
            font-size: 1.3rem;
        }

        .ant-tabs-tab.ant-tabs-tab-active {
            .ant-tabs-tab-btn {
                color: #fb4226 !important;
            }
        }

        .ant-tabs-ink-bar.ant-tabs-ink-bar-animated {
            background: transparent;
        }

        &:before {
            border: none;
        }
    }
`;

const Content = styled.div`
    width: 50%;
    margin: 0 auto;
    margin-top: 60px;

    ${media.large`
        width: 80%;
    `}

    @media screen and (max-width: 576px) {
        width: 100%;
    }
`;

const TabContent = styled(TabPane)`
    height: 500px;
    overflow-y: scroll;
    background-color: #fff;
    h3 {
        font-size: 1rem;
    }
    span {
        color: #000;
    }

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
