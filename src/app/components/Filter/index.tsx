/**
 *
 * SearchForm
 *
 */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Cascader, Col, Form, message, Row, Select } from "antd";
import { CinemaListProps, TimerProps } from "app/pages/HomePage/components/Schedule/types";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import { useMovieDetailSlice } from "app/pages/MovieDetail/slice";
import { selectMovieDetail } from "app/pages/MovieDetail/slice/selectors";
import { useGetMovieDetail } from "hooks/useGetMovieDetail";
import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ROUTES } from "utils/constants/settings";
import { Buttons } from "../Common/Buttons";

interface Props {
    movieList?: MovieResponse[];
}
const { Option } = Select;

export const Filter = memo(({ movieList }: Props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { actions } = useMovieDetailSlice();
    const history = useHistory();
    const [id, setId] = React.useState({});
    const { movieDetail, getMovieDetail } = useGetMovieDetail();
    const [arrMovie, setArrMovie] = React.useState([]) as any;
    const [cinemaKey, setCinemaKey] = React.useState("") as any;
    const [getDateTime, setDateTime] = React.useState(null);
    const [getTime, setTime] = React.useState("") as any;
    const [selected, setSelected] = React.useState(null) as any;
    const [selectedTime, setSelectedTime] = React.useState(null) as any;

    React.useEffect(() => {
        setArrMovie(movieDetail);
    }, [movieDetail]);

    const options = movieDetail?.heThongRapChieu?.map((item: any) => {
        return {
            key: item.maHeThongRap,
            value: item.maHeThongRap,
            label: item.tenHeThongRap,
            children: item.cumRapChieu?.map((cinema: any) => {
                return {
                    key: cinema.maCumRap,
                    value: cinema.maCumRap,
                    label: cinema.tenCumRap,
                };
            }),
        };
    });

    return (
        <Wrapper>
            <FormStyled size="large">
                <Row gutter={[12, 8]} justify="space-between" align="middle">
                    <ColStyle lg={5} md={24} sm={24}>
                        <FormSelect
                            placeholder="Chọn phim"
                            optionFilterProp="children"
                            onSelect={(id: any, option: any) => {
                                setId(id);
                                getMovieDetail(id);
                            }}
                        >
                            {movieList &&
                                movieList.map((movie: MovieResponse) => {
                                    return (
                                        <Option key={movie.maPhim} value={movie.maPhim}>
                                            {movie.tenPhim}
                                        </Option>
                                    );
                                })}
                        </FormSelect>
                    </ColStyle>

                    <ColStyle lg={7} md={24} sm={24}>
                        <FormItem name="date-picker" className="search__form--datetime">
                            <Cascader
                                placeholder="Chọn rạp"
                                options={options}
                                onChange={(value, selectedOptions) => {
                                    console.log("value", value);
                                    const newValue = [...value];
                                    const key = newValue.pop();
                                    console.log("key", key);
                                    setCinemaKey(key);
                                    setSelected(null);
                                    setSelectedTime(null);
                                }}
                            />
                        </FormItem>
                    </ColStyle>

                    <ColStyle lg={5} md={24} sm={24}>
                        <FormSelect
                            placeholder="Chọn ngày"
                            optionFilterProp="children"
                            onChange={(value: any, option: any) => {
                                const newDateString = option.children.split("-");
                                const format = `${newDateString[2]}-${newDateString[1]}-${newDateString[0]}`;
                                setTime(format);
                                setSelected(value);
                            }}
                            value={selected}
                        >
                            {arrMovie?.heThongRapChieu?.map((item: any) => {
                                const showTime = item.cumRapChieu?.find(
                                    (cinemaList: CinemaListProps) =>
                                        cinemaList.maCumRap === cinemaKey,
                                );

                                if (showTime) {
                                    const newArr = [...showTime.lichChieuPhim];
                                    const uniqueDate = newArr?.filter((item, index, arr) => {
                                        const formatDate =
                                            arr
                                                .map(i => {
                                                    return i.ngayChieuGioChieu.slice(0, 10);
                                                })
                                                .indexOf(item.ngayChieuGioChieu.slice(0, 10)) ===
                                            index;

                                        return formatDate;
                                    });

                                    return uniqueDate.map((timer: TimerProps) => {
                                        return (
                                            <Option value={timer.maLichChieu}>
                                                {moment(timer.ngayChieuGioChieu).format(
                                                    "DD-MM-YYYY",
                                                )}
                                            </Option>
                                        );
                                    });
                                }
                            })}
                        </FormSelect>
                    </ColStyle>

                    <ColStyle md={5}>
                        <FormSelect
                            placeholder="Chọn giờ"
                            optionFilterProp="children"
                            onChange={(value: any, option: any) => {
                                setDateTime(value);
                                setSelectedTime(option.children);
                            }}
                            value={selectedTime}
                        >
                            {movieDetail?.heThongRapChieu?.map((item: any) => {
                                const showTime = item.cumRapChieu?.find(
                                    (cinemaList: CinemaListProps) =>
                                        cinemaList.maCumRap === cinemaKey,
                                );
                                if (showTime) {
                                    if (getTime !== "") {
                                        const time = showTime.lichChieuPhim?.filter(item =>
                                            item.ngayChieuGioChieu?.includes(getTime),
                                        );

                                        if (time) {
                                            return time?.map((timer: any) => {
                                                return (
                                                    <Option value={timer.maLichChieu}>
                                                        {moment(timer.ngayChieuGioChieu).format(
                                                            "hh:MM A",
                                                        )}
                                                    </Option>
                                                );
                                            });
                                        } else {
                                            setSelectedTime(null);
                                        }
                                    }
                                }
                            })}
                        </FormSelect>
                    </ColStyle>

                    <Col md={2} style={{ textAlign: "center" }}>
                        <Buttons
                            shape="circle"
                            onClick={() => {
                                if (getDateTime) {
                                    history.push(`${ROUTES.CHECKOUT}/${getDateTime}`);
                                    dispatch(actions.clearData());
                                } else {
                                    message.warning("Vui lòng điền đầy đủ thông tin!");
                                }
                            }}
                        >
                            <SearchOutlined />
                        </Buttons>
                    </Col>
                </Row>
            </FormStyled>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    width: 70%;
    margin: 0 auto;
    box-shadow: 0px -1px 38px rgba(231, 231, 231, 0.3), 0px 0px 12px rgba(0, 0, 0, 0.22);

    transform: translateY(-70%);

    ${media.medium`
        display: none;
    `}
`;

const FormStyled = styled(Form)`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 30px;
    margin: 30px 0;
    width: 100%;

    .ant-form-item {
        margin-bottom: 0 !important;
    }
    .ant-select-arrow {
        color: #000;
    }
`;

const FormItem = styled(Form.Item)`
    .ant-cascader-picker {
        color: #000;

        input {
            box-shadow: 1px 5px 10px rgb(0, 0, 0, 10%);
            border: none;
            &::placeholder {
                color: #000;
                font-size: 1.05rem;
            }
        }

        .ant-cascader-picker-arrow {
            color: #000;
        }
    }
`;

const FormSelect = styled(Select)`
    width: 100%;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.1);
    background-color: #fff;

    .ant-select-selector {
        border: none !important;
        outline: none;
    }

    .ant-select-selection-item {
        color: #000;
    }
    .ant-select-selection-placeholder {
        color: #767676;
    }
`;

// const FormItems = styled(Cascader)``;
const ColStyle = styled(Col)`
    ${media.xsmall`
        width: 100%;
    `}
`;
