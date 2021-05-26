/**
 *
 * MovieDetail
 *
 */
import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from "@ant-design/icons";
import { Avatar, Collapse, Comment, Divider, Space, Tabs, Tooltip } from "antd";
import { Banner } from "app/components/Banner";
import { useScreenType } from "hooks/useScreenType";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { useMovieDetailSlice } from "./slice";
import { selectMovieDetail } from "./slice/selectors";
import { MovieInfo, TheaterInfo } from "./slice/types";
import { Comments } from "./components/Comments";
import { MovieDetailPayload } from "../HomePage/slice/types";

interface MovieDetailProps {}

const { Panel } = Collapse;
const { TabPane } = Tabs;

export const MovieDetail: React.FC = (props: MovieDetailProps) => {
    const param = useParams();
    console.log(param);
    const { Mobile, Desktop } = useScreenType();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(selectMovieDetail);
    const { actions } = useMovieDetailSlice();
    const { maPhim } = useParams() as MovieDetailPayload;

    React.useEffect(() => {
        dispatch(actions.getMovieDetailAction({ maPhim }));
    }, [dispatch]);

    // Comment
    const [likes, setLikes] = React.useState(0);
    const [dislikes, setDislikes] = React.useState(0);
    const [action, setAction] = React.useState(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        // setAction("liked");
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        // setAction("disliked");
    };
    const comments = [
        <Tooltip key="comment-basic-like" title="Like">
            <span onClick={like}>
                {React.createElement(action === "liked" ? LikeFilled : LikeOutlined)}
                <span className="comment-action">{likes}</span>
            </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
            <span onClick={dislike}>
                {React.createElement(action === "disliked" ? DislikeFilled : DislikeOutlined)}
                <span className="comment-action">{dislikes}</span>
            </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    console.log("movieDetail", movieDetail);

    const handleTabChange = activeKey => {
        console.log("activeKey", activeKey);
        if (activeKey === "review") {
            console.log("1");
        }
    };

    return (
        <>
            <Banner movieDetail={movieDetail} />
            <Wrapper>
                <Content>
                    <Tabs
                        centered
                        defaultActiveKey="1"
                        style={{ marginBottom: 32 }}
                        onChange={handleTabChange}
                    >
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
                                                                            {movie.lichChieuPhim
                                                                                ?.slice(0, 6)
                                                                                .map(
                                                                                    (
                                                                                        timer: any,
                                                                                    ) => {
                                                                                        return (
                                                                                            <Timer>
                                                                                                {moment(
                                                                                                    timer.ngayChieuGioChieu,
                                                                                                ).format(
                                                                                                    "hh:MM A",
                                                                                                )}
                                                                                            </Timer>
                                                                                        );
                                                                                    },
                                                                                )}
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
                                                                            {movie.lichChieuPhim
                                                                                ?.slice(0, 6)
                                                                                .map(
                                                                                    (
                                                                                        timer: any,
                                                                                    ) => {
                                                                                        return (
                                                                                            <Timer>
                                                                                                {moment(
                                                                                                    timer.ngayChieuGioChieu,
                                                                                                ).format(
                                                                                                    "hh:MM A",
                                                                                                )}
                                                                                            </Timer>
                                                                                        );
                                                                                    },
                                                                                )}
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
                            {movieDetail.moTa}
                        </TabPane>
                        <TabPane tab="Đánh giá" key="review">
                            <Comments maPhim={maPhim} />
                        </TabPane>
                    </Tabs>
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

    .ant-tabs-nav {
        .ant-tabs-nav-wrap {
            white-space: break-spaces !important;
        }
    }
`;

const Content = styled.div`
    width: 50%;
    margin: 0 auto;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    background-color: #fff;

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

const BackgroundWrapper = styled.div`
    line-height: 1em;
    background-color: white;
    margin: 0 250px;
    color: black;
    font-size: 1.2rem;
    height: auto;
    .wrapper {
        padding: 15px 25px;
        display: flex;
        justify-content: space-between;
        .left {
            display: flex;
            img {
                border-radius: 50%;
            }
            .name_user {
                font-weight: 700;
                margin-left: 10px;
                .online__left {
                    font-weight: normal;
                    font-size: 0.785rem;
                }
            }
        }
        .right {
            text-align: center;
            .review__rate {
                margin-top: 5px;
                span {
                    color: #5ec51c;
                }
                i {
                    color: #e73e2c;
                }
            }
        }
    }
    .comment {
        padding: 15px 25px;
    }
`;
