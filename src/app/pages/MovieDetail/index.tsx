/**
 *
 * MovieDetail
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { BannerDetail } from "./components/BannerDetail";
import { Tabs } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { selectMovieDetail } from "./slice/selectors";
import { useMovieDetailSlice } from "./slice";
import { MovieDetailState, TheaterInfo, MovieInfo, MovieShowtime } from "./slice/types";
import moment from "moment";
import { useParams } from "react-router";
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from "@ant-design/icons";
import { Comment, Tooltip, Avatar } from "antd";

interface MovieDetailProps {}

// export const RenderComment = () => {
//     const [likes, setLikes] = React.useState(0);
//     const [dislikes, setDislikes] = React.useState(0);
//     const [action, setAction] = React.useState(null);

//     const like = () => {
//         setLikes(1);
//         setDislikes(0);
//         // setAction("liked");
//     };

//     const dislike = () => {
//         setLikes(0);
//         setDislikes(1);
//         // setAction("disliked");
//     };
//     const actions = [
//         <Tooltip key="comment-basic-like" title="Like">
//             <span onClick={like}>
//                 {React.createElement(action === "liked" ? LikeFilled : LikeOutlined)}
//                 <span className="comment-action">{likes}</span>
//             </span>
//         </Tooltip>,
//         <Tooltip key="comment-basic-dislike" title="Dislike">
//             <span onClick={dislike}>
//                 {React.createElement(action === "disliked" ? DislikeFilled : DislikeOutlined)}
//                 <span className="comment-action">{dislikes}</span>
//             </span>
//         </Tooltip>,
//         <span key="comment-basic-reply-to">Reply to</span>,
//     ];
//     return (
//         <Comment
//             actions={actions}
//             author={<a>Han Solo</a>}
//             avatar={
//                 <Avatar
//                     src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
//                     alt="Han Solo"
//                 />
//             }
//             content={
//                 <p>
//                     We supply a series of design principles, practical patterns and high quality
//                     design resources (Sketch and Axure), to help people create their product
//                     prototypes beautifully and efficiently.
//                 </p>
//             }
//             datetime={
//                 <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
//                     <span>{moment().fromNow()}</span>
//                 </Tooltip>
//             }
//         />
//     );
// };

export function MovieDetail(props: MovieDetailProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // Param
    const param = useParams();
    console.log(param);

    const { t, i18n } = useTranslation();
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(selectMovieDetail);
    const { actions } = useMovieDetailSlice();
    React.useEffect(() => {
        dispatch(actions.getMovieDetailData(param));
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
    // Styled Components
    const Wrapper = styled.div`
        .ant-tabs-nav {
            ::before {
                border: none;
            }
            .ant-tabs-tab {
                color: white;
                font-size: 1.25rem;
                .ant-tabs-tab-btn {
                    color: #e73e2c;
                }
            }
            .ant-tabs-ink-bar {
                background: #e73e2c;
            }
        }
        .ant-tabs-content-holder {
            .ant-tabs-tabpane {
                color: white;
                font-size: 1.5rem;
                margin-left: 50px;
            }
        }
    `;
    const TheaterWrapper = styled.div``;
    const TheaterTitle = styled.div`
        margin-left: 15px;
    `;
    const CinemaWrapper = styled.div``;
    const CinemaDetail = styled.div`
        margin-bottom: 20px;
        margin-left: 20px;

        font-size: 1.2rem;
        .cinema__description {
            color: #e73e2c;
        }
    `;
    const BackgroundWrapper = styled.div`
        line-height: 1em;
        background-color: white;
        margin: 0 250px;
        color: black;
        font-size: 1.2rem;
        padding: 0 20px;
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
    return (
        <Div>
            <BannerDetail />
            {t("")}
            {/*  {t(...messages.someThing())}  */}
            <Wrapper id="schedule">
                <Tabs centered defaultActiveKey="1" style={{ marginBottom: 32 }}>
                    <TabPane tab="Lịch Chiếu" key="1">
                        <>
                            <Tabs tabPosition="left">
                                {movieDetail.heThongRapChieu?.map((item: TheaterInfo) => {
                                    return (
                                        <TabPane
                                            tab={
                                                <TheaterWrapper>
                                                    <div className="theater__image">
                                                        <img src={item.logo} alt="" width={60} />
                                                    </div>
                                                    {/* <TheaterTitle>
                                                            {item.tenHeThongRap}
                                                        </TheaterTitle> */}
                                                </TheaterWrapper>
                                            }
                                            key="1"
                                        >
                                            {item.cumRapChieu.map((theater: MovieInfo) => (
                                                <CinemaWrapper>
                                                    <div className="cinema__image">
                                                        <p> {theater.tenCumRap}</p>
                                                    </div>
                                                    {movieDetail.cumRapChieu?.map(
                                                        (detail: MovieShowtime) => (
                                                            <CinemaDetail>
                                                                <p className="cinema__title">
                                                                    <span>{detail.tenRap}</span>
                                                                </p>
                                                                <p className="cinema__name">
                                                                    {movieDetail.tenPhim}
                                                                </p>
                                                                <p className="cinema__description">
                                                                    Thời Lượng : {detail.thoiLuong}{" "}
                                                                    mins | Giá vé : {detail.giaVe}{" "}
                                                                    VNĐ
                                                                </p>
                                                                <div className="time__start">
                                                                    Ngày chiếu:{" "}
                                                                    <span>
                                                                        {" "}
                                                                        {detail.ngayChieuGioChieu.substr(
                                                                            0,
                                                                            10,
                                                                        )}
                                                                    </span>
                                                                    <div>
                                                                        Thời gian:{" "}
                                                                        {moment(
                                                                            detail.ngayChieuGioChieu,
                                                                        ).format("hh:MM A")}
                                                                    </div>
                                                                </div>
                                                            </CinemaDetail>
                                                        ),
                                                    )}
                                                </CinemaWrapper>
                                            ))}
                                        </TabPane>
                                    );
                                })}
                            </Tabs>
                        </>
                    </TabPane>

                    <TabPane tab="Thông Tin" key="2">
                        {movieDetail.moTa}
                    </TabPane>
                    <TabPane tab="Đánh giá" key="3">
                        <BackgroundWrapper>
                            <Comment
                                actions={comments}
                                author={<a>Quang Minh</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Han Solo"
                                    />
                                }
                                content={<p>Website đỉnh của chóp</p>}
                                datetime={
                                    <Tooltip title={moment().format("YYYY-MM-DD HH:mm:ss")}>
                                        <span>{moment().fromNow()}</span>
                                    </Tooltip>
                                }
                            />
                            {/* <div className="wrapper">
                                <div className="left">
                                    <img
                                        src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
                                        alt=""
                                        width={40}
                                    />
                                    <div className="name_user">
                                        <strong>Hồ Quang Minh</strong>
                                        <div className="online__left"> 8 ngày trước </div>
                                    </div>
                                </div>
                                <div className="right">
                                    Đánh giá
                                    <div className="review__rate">
                                        <span>5</span> <i className="fa fa-star" />
                                    </div>
                                </div>
                            </div>
                            <div className="comment"> Website đỉnh của chóp</div> */}
                        </BackgroundWrapper>
                    </TabPane>
                </Tabs>
            </Wrapper>
        </Div>
    );
}

const Div = styled.div``;
