/**
 *
 * MovieDetail
 *
 */
import { Alert, Collapse, Divider, Space, Tabs } from "antd";
import { Banner } from "app/components/Banner";
import { Loading } from "app/components/Common/Loading";
import { useGetDate } from "hooks/useGetDate";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ANCHOR, ROUTES } from "utils/constants/settings";
import { TimePlay } from "../HomePage/components/Schedule/TimePlay";
import { MovieDetailPayload } from "../HomePage/slice/types";
import { Comments } from "./components/Comments";
import { Detail } from "./components/Detail";
import { TabDetail } from "./components/TabDetail";
import { useBookingTicketWithDate } from "./hooks/useBookingTicketWithDate";
import { useMovieDetailSlice } from "./slice";
import { selectMovieDetail } from "./slice/selectors";
import { MovieDetailState, MovieInfo, TheaterInfo, MovieShowtime } from "./slice/types";

interface MovieDetailProps {}

const { Panel } = Collapse;
const { TabPane } = Tabs;

let arr = [];

export const MovieDetail: React.FC = (props: MovieDetailProps) => {
    const param = useParams();

    const { Mobile, Desktop } = useScreenType();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { movieDetail, isLoading } = useSelector(selectMovieDetail) as MovieDetailState;
    const { arrayDate } = useBookingTicketWithDate(movieDetail?.ngayKhoiChieu);
    const { actions } = useMovieDetailSlice();
    const [isFull, setIsFull] = React.useState(false);
    const { maPhim } = useParams() as MovieDetailPayload;

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
                                                <TabStyle defaultActiveKey="1" tabPosition="top">
                                                    {arrayDate.map((date: Date, index: number) => {
                                                        const getDate = moment(date).format(
                                                            "DD-MM",
                                                        );
                                                        const getWeek = moment(date).format("dddd");

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
                                                                        <span>{getDate}</span>
                                                                    </>
                                                                }
                                                                key={index}
                                                            >
                                                                <TabDetail
                                                                    date={date}
                                                                    cumRapChieu={item.cumRapChieu}
                                                                />
                                                            </TabPane>
                                                        );
                                                    })}
                                                </TabStyle>
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

                        <TabPane tab="Thông Tin" key="info" style={{ padding: 20 }}>
                            <Detail movieDetail={movieDetail} />
                            {/* {movieDetail.moTa} */}
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
    padding: 50px 0;
    // height: 500px;
    min-height: 800px;
    ${media.medium`
        width: 100%;
    `}

    .ant-tabs-nav-wrap .ant-tabs-nav-wrap-ping-right {
        white-space: break-spaces !important;
    }
`;

const TabStyle = styled(Tabs)`
    /*  background-color: #0a2029;
    color: #fff !important;

    h3 {
        color: #fff !important;
    }

    .ant-tabs-tabpane-active {
        color: #fff;
        font-weight: 500;
    } */
`;

const Content = styled.div`
    width: 50%;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    margin-top: 60px;

    ${media.small`
        width: 80%;
    `}

    @media screen and (max-width: 576px) {
        width: 100%;
    }
`;

const TabContent = styled(TabPane)`
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

const CinemaName = styled.div`
.schedule__left {
    &--title {
        font-size: 1rem;
        font-weight: 500;
        display: inline;

        &-left {
            color: ${props => props.theme.titleColor};
        }
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
