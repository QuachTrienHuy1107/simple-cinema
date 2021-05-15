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
import moment from "moment";

interface MovieDetailProps {}

export function MovieDetail(props: MovieDetailProps) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const { TabPane } = Tabs;
    const dispatch = useDispatch();
    const { movieDetail } = useSelector(selectMovieDetail);
    const { actions } = useMovieDetailSlice();
    React.useEffect(() => {
        dispatch(actions.getMovieDetailData());
    }, [dispatch]);
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
    const TheaterWrapper = styled.div`
        display: flex;
    `;
    const TheaterTitle = styled.div`
        margin-left: 15px;
    `;
    const CinemaWrapper = styled.div`
        display: flex;
    `;
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
                        {movieDetail.lichChieu?.slice(0, 8).map((item: any) => (
                            <>
                                <Tabs tabPosition="left">
                                    <TabPane
                                        tab={
                                            <TheaterWrapper>
                                                <div className="theater__image">
                                                    <img
                                                        src="https://s3img.vcdn.vn/123phim/2021/01/bhd-star-bitexco-16105952137769.png"
                                                        alt=""
                                                        width={60}
                                                    />
                                                </div>

                                                <TheaterTitle>
                                                    {item.thongTinRap.tenCumRap}
                                                </TheaterTitle>
                                            </TheaterWrapper>
                                        }
                                        key="1"
                                    >
                                        <div>
                                            <CinemaWrapper>
                                                <div className="cinema__image">
                                                    <img
                                                        src="https://s3img.vcdn.vn/mobile/123phim/2021/03/godzilla-vs-kong-16150074733397_60x60.jpg"
                                                        alt=""
                                                        width={60}
                                                    />
                                                </div>
                                                <CinemaDetail>
                                                    <p className="cinema__title">
                                                        <span>{item.thongTinRap.tenCumRap}</span>
                                                    </p>
                                                    <p className="cinema__name">{item.tenPhim}</p>
                                                    <p className="cinema__description">
                                                        Thời Lượng : {item.thoiLuong} mins | Giá vé
                                                        : {item.giaVe} VNĐ
                                                    </p>
                                                    <div className="time__start">
                                                        Ngày chiếu:{" "}
                                                        <span>
                                                            {" "}
                                                            {item.ngayChieuGioChieu.substr(0, 10)}
                                                        </span>
                                                        <div>
                                                            Thời gian:{" "}
                                                            {moment(item.ngayKhoiChieu).format(
                                                                "hh:MM A",
                                                            )}
                                                        </div>
                                                    </div>
                                                </CinemaDetail>
                                            </CinemaWrapper>
                                        </div>
                                    </TabPane>
                                </Tabs>
                            </>
                        ))}
                    </TabPane>
                    <TabPane tab="Thông Tin" key="2">
                        {movieDetail.moTa}
                    </TabPane>
                    <TabPane tab="Đánh giá" key="3">
                        <BackgroundWrapper>
                            <div className="wrapper">
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
                            <div className="comment"> Website đỉnh của chóp</div>
                        </BackgroundWrapper>
                    </TabPane>
                </Tabs>
            </Wrapper>
        </Div>
    );
}

const Div = styled.div``;
