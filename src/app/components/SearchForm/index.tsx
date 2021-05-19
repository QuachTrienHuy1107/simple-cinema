/**
 *
 * SearchForm
 *
 */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Cascader, Col, DatePicker, Form, Row, Select } from "antd";
import { TimerProps, CinemaListProps } from "app/pages/HomePage/components/Schedule/types";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import { useMovieDetailSlice } from "app/pages/MovieDetail/slice";
import { selectMovieDetail } from "app/pages/MovieDetail/slice/selectors";
import { useGetDate } from "hooks/useGetDate";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { media } from "styles/media";
import { ROUTES } from "utils/constants/settings";
import { Buttons } from "../Common/Buttons";

interface Props {
    movieList: MovieResponse[];
}
const { Option } = Select;

export const SearchForm = memo(({ movieList }: Props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const { actions } = useMovieDetailSlice();
    const { movieDetail, isLoading } = useSelector(selectMovieDetail);
    const [arrMovie, setArrMovie] = React.useState([]) as any;
    const [cinemaKey, setCinemaKey] = React.useState("") as any;
    const [getTime, setTime] = React.useState(null);

    React.useEffect(() => {
        setArrMovie(movieDetail);
    }, [movieDetail]);

    console.log("arrMovie", arrMovie);

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
                <Row gutter={[24, 8]} justify="center" align="middle">
                    <ColStyle lg={6} md={24} sm={24}>
                        <FormSelect
                            loading={isLoading}
                            placeholder="Chọn phim"
                            optionFilterProp="children"
                            onSelect={(maPhim: any, option: any) => {
                                dispatch(actions.getMovieDetailData({ maPhim }));
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

                    <ColStyle lg={10} md={24} sm={24}>
                        <FormItem name="date-picker" className="search__form--datetime">
                            <Cascader
                                placeholder="Chọn rạp"
                                options={options}
                                onChange={(value, selectedOptions) => {
                                    const newValue = [...value];
                                    const key = newValue.pop();
                                    setCinemaKey(key);
                                }}
                            />
                        </FormItem>
                    </ColStyle>

                    <ColStyle lg={6} md={24} sm={24}>
                        <FormSelect
                            placeholder="Chọn ngày"
                            optionFilterProp="children"
                            onChange={(value: any) => {
                                setTime(value);
                            }}
                        >
                            {arrMovie?.heThongRapChieu?.map((item: any) => {
                                console.log("item", item);
                                const showTime = item.cumRapChieu?.find(
                                    (cinemaList: CinemaListProps) =>
                                        cinemaList.maCumRap === cinemaKey,
                                );
                                if (showTime) {
                                    return showTime.lichChieuPhim?.map((timer: TimerProps) => {
                                        return (
                                            <Option value={timer.maLichChieu}>
                                                {timer.ngayChieuGioChieu}
                                            </Option>
                                        );
                                    });
                                }
                            })}
                        </FormSelect>
                    </ColStyle>

                    <Col lg={1} md={24}>
                        <Buttons
                            shape="circle"
                            onClick={() => {
                                history.push(`${ROUTES.CHECKOUT}/${getTime}`);
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
    width: 80%;
    margin: 0 auto;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 10px;
`;

const FormStyled = styled(Form)`
    background-color: #fff;
    border-radius: 16px;
    padding: 30px 30px;
    margin: 30px 0;

    .ant-form-item {
        margin-bottom: 0 !important;
    }
    .ant-select-arrow {
        color: #000;
    }
`;

const FormItem = styled(Form.Item)`
    .ant-cascader-picker {
        color: #000 !important;

        input {
            box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.1);
            border: none;
            &::placeholder {
                color: #000;
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

    .ant-select-selection-item,
    .ant-select-selection-placeholder {
        color: #000 !important;
    }
`;

// const FormItems = styled(Cascader)``;
const ColStyle = styled(Col)`
    ${media.xsmall`
        width: 100%;
    `}
`;
