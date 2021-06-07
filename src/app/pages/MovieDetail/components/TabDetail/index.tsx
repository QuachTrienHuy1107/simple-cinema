/**
 *
 * TabDetail
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import moment from "moment";
import { MovieInfo, MovieShowtime } from "../../slice/types";
import { Alert, Collapse, Divider, Space } from "antd";
import { useGetRangeTime } from "app/pages/HomePage/components/Schedule/hooks/useGetRangeTime";
import { TimePlay } from "app/pages/HomePage/components/Schedule/TimePlay";

interface Props {
    date: Date;
    cumRapChieu: Array<MovieInfo>;
}

const { Panel } = Collapse;
const imgCinema =
    "https://reviewphimaz.com/wp-content/uploads/2018/07/rap-chieu-phim-bhd-bitexco-tphcm.jpg";

export const TabDetail = memo(({ date, cumRapChieu }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const formatDate = moment(date).format("DD-MM-YYYY");
    const reFormatDate = formatDate.split("-");
    const filterDateTime = `${reFormatDate[2]}-${reFormatDate[1]}-${reFormatDate[0]}`;

    console.log("cumRapChieu", cumRapChieu);

    return (
        <Wrapper>
            {cumRapChieu?.map((movie: MovieInfo) => {
                const cinemaName = movie?.tenCumRap.split("-");

                const newArr = movie.lichChieuPhim.filter((timePlay: MovieShowtime) =>
                    timePlay.ngayChieuGioChieu.includes(filterDateTime),
                );

                console.log("newArr", newArr);
                console.log("movie", movie);

                return (
                    <>
                        {newArr.length !== 0 && (
                            <>
                                <TabRight className="schedule__right">
                                    <div
                                        style={{
                                            width: "100%",
                                        }}
                                    >
                                        <Collapse ghost expandIconPosition="right">
                                            <Panel
                                                header={
                                                    <Space>
                                                        <img src={imgCinema} alt="" width="60" />
                                                        <h5>{movie.tenCumRap}</h5>
                                                    </Space>
                                                }
                                                key={movie.maCumRap}
                                            >
                                                <TimePlay movie={newArr} />
                                            </Panel>
                                        </Collapse>
                                    </div>
                                </TabRight>
                                <Divider />
                            </>
                        )}
                    </>
                );
            })}
        </Wrapper>
    );
});

const Wrapper = styled.div``;

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
