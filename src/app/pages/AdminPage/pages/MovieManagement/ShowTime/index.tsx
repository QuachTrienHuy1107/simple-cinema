/**
 *
 * ShowTime
 *
 */
import {
    Cascader,
    Col,
    DatePicker,
    Form,
    InputNumber,
    message,
    Row,
    Select,
    Skeleton,
    Tabs,
} from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { HomeState, MovieResponse } from "app/pages/HomePage/slice/types";
import { useGetMovieDetail } from "hooks/useGetMovieDetail";
import moment from "moment";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { formItemLayout } from "utils/helpers";
import { useMovieManagementSlice } from "../slice";
import { selectMovieManagement } from "../slice/selectors";
import CinemaDetail from "./CinemaDetail";

/**
 *  Payload create Showtime
 *  {
        maPhim: 1329,
        ngayChieuGioChieu:
            "06/07/2021 12:10:00",
        maRap: 482,
        giaVe: 75000,
    },
 */

const { Option } = Select;

interface Props {}

export const ShowTime = React.memo((props: Props) => {
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const { actions } = useHomeSlice();
    const [movieSelected, setMovieSelected] = React.useState<any>({});
    const [timer, setTimer] = React.useState("");
    const [cinemaSelected, setCinemaSelected] = React.useState<any>({});
    const [price, setPrice] = React.useState<number>(0);
    const { movieDetail, getMovieDetail } = useGetMovieDetail();
    const { movieManagementActions } = useMovieManagementSlice();
    const { movies, cinemaList, cinemaInfo } = useSelector(selectHome) as HomeState;
    const { successMessage, error, isLoading } = useSelector(selectMovieManagement);

    React.useEffect(() => {
        dispatch(actions.getAllMovieAction());
    }, []);

    const options = cinemaInfo?.map((item: any) => {
        return {
            key: item.maCumRap,
            value: item.maCumRap,
            label: item.tenCumRap,
            children: item.danhSachRap?.map((cinema: any) => {
                return {
                    key: cinema.maRap,
                    value: cinema.maRap,
                    label: cinema.tenRap,
                };
            }),
        };
    });

    const onFinish = async (value: any) => {
        const data = {
            maPhim: movieSelected.value,
            ngayChieuGioChieu: timer,
            maRap: cinemaSelected[1].value,
            giaVe: price,
        };
        await dispatch(movieManagementActions.createShowTimeAction(data));
        form.resetFields();
    };

    React.useEffect(() => {
        if (successMessage !== "") {
            message.success({ content: successMessage, duration: 0.8 }).then(async () => {
                await getMovieDetail(movieSelected.value);
                dispatch(movieManagementActions.clearData());
            });
        }
        if (error) {
            message.error(error);
        }
    }, [successMessage, error]);

    return (
        <Wrapper>
            <Form form={form} name="showtime" onFinish={onFinish}>
                <Row justify="space-around" gutter={[20, 35]}>
                    <ColStyled md={15}>
                        <LeftPanel>
                            <Row gutter={[24, 12]} justify="space-around">
                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Chọn phim"
                                        name="tenPhim"
                                        rules={[{ required: true }]}
                                    >
                                        <Select
                                            size="large"
                                            onChange={(maPhim: any, value: any) => {
                                                setMovieSelected(value);
                                                getMovieDetail(maPhim);
                                                dispatch(actions.getAllCinemaListAction());
                                            }}
                                        >
                                            {movies?.map((movie: MovieResponse) => {
                                                return (
                                                    <Option key={movie.maPhim} value={movie.maPhim}>
                                                        {movie.tenPhim}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Chọn hệ thống rạp"
                                        rules={[{ required: true }]}
                                        name="heThongRap"
                                    >
                                        <Select
                                            loading={isLoading}
                                            size="large"
                                            onChange={maHeThongRap => {
                                                dispatch(
                                                    actions.getAllCinemaInfoAction({
                                                        maHeThongRap,
                                                    }),
                                                );
                                            }}
                                        >
                                            {cinemaList?.map(item => {
                                                return (
                                                    <Option
                                                        key={item.maHeThongRap}
                                                        value={item.maHeThongRap}
                                                    >
                                                        {item.tenHeThongRap}
                                                    </Option>
                                                );
                                            })}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Chọn rạp"
                                        name="maRap"
                                        rules={[{ required: true }]}
                                    >
                                        <Cascader
                                            size="large"
                                            options={options}
                                            onChange={(value: any, selectedOptions) => {
                                                const newValue = [...value];
                                                const id = newValue.pop();
                                                setCinemaSelected(selectedOptions);
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <FormItem
                                        {...formItemLayout}
                                        label="Chọn ngày giờ"
                                        name="ngayChieuGioChieu"
                                        rules={[{ required: true }]}
                                    >
                                        <DatePicker
                                            format="DD-MM-YYYY HH:mm"
                                            showTime={{
                                                defaultValue: moment("00:00:00", "HH:mm"),
                                                format: "HH:mm",
                                            }}
                                            size="large"
                                            onChange={(date: any, dateTime: string) => {
                                                const data = `${dateTime}:00`;

                                                setTimer(data);
                                            }}
                                        />
                                    </FormItem>
                                </Col>

                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Nhập giá vé"
                                        name="giaVe"
                                        rules={[{ required: true }]}
                                        initialValue={75000}
                                    >
                                        <InputNumberStyle
                                            size="large"
                                            step={10000}
                                            min={75000}
                                            max={200000}
                                            formatter={value =>
                                                `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                                            }
                                            parser={(value: any) =>
                                                value.replace(/\$\s?|(,*)/g, "")
                                            }
                                            onChange={(value: any): void => setPrice(value)}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col md={12} style={{ alignSelf: "center" }}>
                                    <Form.Item {...formItemLayout} style={{ marginBottom: 0 }}>
                                        <ButtonStyle htmlType="submit" loading={isLoading}>
                                            Tạo lịch chiếu
                                        </ButtonStyle>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </LeftPanel>
                    </ColStyled>
                    <ColStyled md={8}>
                        <RightPanel>
                            <TableStyle>
                                <thead>
                                    <tr>
                                        <th>Tên phim</th>
                                        <th>{movieSelected.children}</th>
                                    </tr>
                                    <tr>
                                        <th>Hệ thống rạp</th>
                                        <th>
                                            {cinemaSelected[0]?.label
                                                ? cinemaSelected[0]?.label
                                                : "Vui lòng chọn hệ thống rạp"}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Ngày giờ</th>
                                        <th>{timer}</th>
                                    </tr>
                                    <tr>
                                        <th>Giá vé</th>
                                        <th>{price.toLocaleString()}</th>
                                    </tr>
                                </thead>
                            </TableStyle>
                        </RightPanel>
                    </ColStyled>
                    <Col span={24}>
                        <CinemaDetail movieDetail={movieDetail} />
                    </Col>
                </Row>
            </Form>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    border-radius: 16px;
    position: relative;
    width: 100%;
`;

const ColStyled = styled(Col)`
    border-radius: 10px;
    padding: 20px;
`;

const LeftPanel = styled.div`
    .ant-card-body {
        text-align: center;
    }
`;

const RightPanel = styled.div``;

const ButtonStyle = styled(Buttons)`
    width: 100%;
    height: 50px;
    transform: translateY(7px);
`;

const FormItem = styled(Form.Item)`
    .ant-picker {
        width: 100%;
    }
`;

const InputNumberStyle = styled(InputNumber)`
    width: 100%;
`;

const TableStyle = styled.table`
    width: 100%;
    td,
    th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }
`;
