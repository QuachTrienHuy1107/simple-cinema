/**
 *
 * Form
 *
 */
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, message, Row } from "antd";
import { useAddEdit } from "app/pages/AdminPage/hooks/useAddEdit";
import { useUpload } from "app/pages/AdminPage/hooks/useUpload";
import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { formItemLayout } from "utils/helpers";
import { selectMovieManagement } from "../../slice/selectors";

interface Props {
    movieDetail?: any;
    isEdit: boolean | undefined;
}
/*
interface LocationState {
    isEdit: boolean;
} */

export const MovieFormAdmin = ({ movieDetail, isEdit }: Props) => {
    const [form] = Form.useForm();

    const { onAddEdit, setEdit } = useAddEdit();
    const { hinhAnh, imgPreview, handleFileChange, setImgUpload } = useUpload();
    const { isLoading } = useSelector(selectMovieManagement);
    const { t, i18n } = useTranslation();
    const [ngayKhoiChieu, setDate] = React.useState("");

    React.useEffect(() => {
        setEdit(isEdit);
    }, [isEdit, setEdit]);

    React.useEffect(() => {
        if (isEdit) {
            for (let key in movieDetail) {
                form.setFieldsValue({
                    // key: movieDetail[key],
                    tenPhim: movieDetail.tenPhim,
                    biDanh: movieDetail.biDanh,
                    danhGia: movieDetail.danhGia,
                    trailer: movieDetail.trailer,
                    moTa: movieDetail.moTa,
                    ngayKhoiChieu: moment(movieDetail?.ngayKhoiChieu),
                });
            }
            setDate(moment(movieDetail?.ngayKhoiChieu).format("DD-MM-YYYY"));
        }
    }, [form, isEdit, movieDetail]);

    const onFinish = (values: any) => {
        if (isEdit) {
            const { maPhim } = movieDetail;
            onAddEdit({ ...values, hinhAnh, maPhim, ngayKhoiChieu, maNhom: "GP01" });
        } else {
            // setEdit(false);
            onAddEdit({ ...values, hinhAnh, ngayKhoiChieu, maNhom: "GP01" });
        }
    };

    return (
        <Wrapper>
            <Form form={form} onFinish={onFinish} name="movie">
                <Row justify="space-around" gutter={[20, 0]}>
                    <ColStyled md={24}>
                        <LeftPanel>
                            <Row gutter={[24, 0]} justify="space-around">
                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Tên phim"
                                        name="tenPhim"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="Mời bạn nhập tên phim" />
                                    </Form.Item>
                                </Col>

                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Ngày chiếu"
                                        name="ngayKhoiChieu"
                                        rules={[{ required: true }]}
                                    >
                                        <DatePicker
                                            // value={moment(movieDetail?.ngayKhoiChieu)}
                                            style={{ width: "100%" }}
                                            format="DD-MM-YYYY"
                                            onChange={(date: any, dateTime: string) => {
                                                const data = `${dateTime}`;
                                                setDate(data);
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Bí danh"
                                        name="biDanh"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="Mời bạn nhập email" />
                                    </Form.Item>
                                </Col>

                                <Col md={12}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Đánh giá"
                                        name="danhGia"
                                        rules={[{ required: true }]}
                                    >
                                        <InputNumber
                                            style={{ width: "100%" }}
                                            defaultValue={movieDetail?.danhGia}
                                            value={movieDetail?.danhGia}
                                            min={1}
                                            max={10}
                                        />
                                    </Form.Item>
                                </Col>
                                <Col md={24}>
                                    <Form.Item
                                        {...formItemLayout}
                                        label="Mô tả"
                                        name="moTa"
                                        rules={[{ required: true }]}
                                    >
                                        <Input.TextArea
                                            rows={4}
                                            placeholder="please enter url description"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </LeftPanel>
                    </ColStyled>
                    <ColStyled md={24}>
                        <RightPanel>
                            {imgPreview ? (
                                <Card
                                    hoverable
                                    style={{ width: 240 }}
                                    cover={<img alt="example" src={imgPreview} />}
                                />
                            ) : (
                                <>
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img alt="example" src={imgPreview} />}
                                    />
                                    <Form.Item>
                                        <Input
                                            name="hinhAnh"
                                            type="file"
                                            onChange={handleFileChange}
                                            // style={{ display: "none" }}
                                        />
                                    </Form.Item>
                                </>
                            )}

                            {isEdit ? <img width={250} src={movieDetail?.hinhAnh} alt="" /> : ""}
                            <Form.Item {...formItemLayout} label="Trailer" name="trailer">
                                <Input placeholder="Mời bạn nhập tên phim" />
                                {/* <a href={movieDetail?.trailer} target="_blank" rel="noreferrer">
                                    {movieDetail?.trailer}
                                </a> */}
                            </Form.Item>
                        </RightPanel>
                    </ColStyled>
                </Row>
                <ButtonStyle type="primary" htmlType="submit" /*  loading={isLoading} */>
                    Submit
                </ButtonStyle>
            </Form>
        </Wrapper>
    );
};

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

const ButtonStyle = styled(Button)`
    position: fixed;
    right: 25px;
    bottom: 10px;
    z-index: 100;
`;
