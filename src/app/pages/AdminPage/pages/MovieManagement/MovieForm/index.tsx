/**
 *
 * MovieForm
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Card, Col, Form, Input, Row, Skeleton, Spin } from "antd";
import { formItemLayout } from "utils/helpers";
import { InputStyled } from "app/components/Common/InputStyled";
import { Buttons } from "app/components/Common/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useMovieManagementSlice } from "../slice";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { UploadImage } from "app/pages/AdminPage/components/UploadImage";
import { useAddEdit } from "app/pages/AdminPage/hooks/useAddEdit";
import { useUpload } from "app/pages/AdminPage/hooks/useUpload";
import { UploadOutlined } from "@ant-design/icons";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { Loading } from "app/components/Common/Loading";
import { ActionType } from "utils/constants/settings";

interface Props {}

interface LocationState {
    isEdit: boolean;
}

const { Meta } = Card;

export function MovieForm(props: Props) {
    const { t, i18n } = useTranslation();
    const formData = new FormData();
    const dispatch = useDispatch();
    const { actions } = useHomeSlice();
    const { isLoading, error, movie } = useSelector(selectHome) as any;

    const [form] = Form.useForm();
    const params = useParams() as any;
    const { maPhim } = params;
    const location = useLocation<LocationState>();
    const { onAddEdit, setEdit } = useAddEdit();
    const { hinhAnh, imgPreview, loading, handleFileChange, setImgUpload } = useUpload();
    const [isEdit, setIsEdit] = React.useState(false);

    React.useEffect(() => {
        if (location.state) {
            const { isEdit } = location.state;
            if (isEdit) {
                setIsEdit(true);
                for (let key in movie) {
                    form.setFieldsValue({
                        [key]: movie[key],
                    });
                }
            } else {
                setIsEdit(false);
            }
        }
    }, [actions, dispatch, form, location.state, movie, params]);

    console.log("params", params?.maPhim);

    React.useEffect(() => {
        if (isEdit) {
            dispatch(actions.getMovieDetail(params));
        }
    }, [actions, dispatch, isEdit, params]);

    const onFinish = (values: any) => {
        if (isEdit) {
            setEdit(true);
            onAddEdit({ ...values, hinhAnh, maPhim });
        } else {
            onAddEdit({ ...values, hinhAnh });
            setEdit(false);
        }
    };

    if (error) {
        alert(error);
    }

    return (
        <Form form={form} onFinish={onFinish} name="movie">
            {isLoading ? (
                <Skeleton />
            ) : (
                <>
                    <Row justify="space-around" gutter={[20, 35]}>
                        <Col md={6}>
                            <LeftPanel>
                                {imgPreview ? (
                                    <Card
                                        hoverable
                                        style={{ width: 240 }}
                                        cover={<img alt="example" src={imgPreview} />}
                                    />
                                ) : (
                                    <Form.Item>
                                        <Button loading={loading} icon={<UploadOutlined />}>
                                            Click to Upload
                                        </Button>
                                    </Form.Item>
                                )}

                                {isEdit ? <img width={100} src={movie?.hinhAnh} alt="" /> : ""}

                                <Input
                                    name="hinhAnh"
                                    type="file"
                                    onChange={handleFileChange}
                                    // style={{ display: "none" }}
                                />
                                {/* <UploadImage /> */}
                            </LeftPanel>
                        </Col>
                        <ColStyled md={16}>
                            <RightPanel>
                                <Row gutter={[24, 12]} justify="space-around">
                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Tên phim"
                                            name="tenPhim"
                                            rules={[{ required: true }]}
                                        >
                                            <Input
                                                size="large"
                                                placeholder="Mời bạn nhập tên phim"
                                            />
                                        </Form.Item>
                                    </Col>
                                    {/* <Col md={12}>
                                 <Input
                                     name="hinhAnh"
                                     onChange={handleFileChange}
                                     type="file"
                                     placeholder="Mời bạn nhập tên phim"
                                 />
                             </Col> */}
                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Bí danh"
                                            name="biDanh"
                                            rules={[{ required: true }]}
                                        >
                                            <InputStyled placeholder="Mời bạn nhập email" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Trailer"
                                            name="trailer"
                                            rules={[{ required: true }]}
                                        >
                                            <InputStyled placeholder="Mời bạn nhập họ tên" />
                                        </Form.Item>
                                    </Col>

                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Mô tả"
                                            name="moTa"
                                            rules={[{ required: true }]}
                                        >
                                            <InputStyled placeholder="Mời bạn nhập tài khoản" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Mã nhóm"
                                            name="maNhom"
                                            rules={[{ required: true }]}
                                        >
                                            <InputStyled placeholder="Mời bạn nhập tài khoản" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Ngày chiếu"
                                            name="ngayKhoiChieu"
                                            rules={[{ required: true }]}
                                        >
                                            <InputStyled placeholder="Mời bạn nhập tài khoản" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item
                                            {...formItemLayout}
                                            label="Đánh giá"
                                            name="danhGia"
                                            rules={[{ required: true }]}
                                        >
                                            <InputStyled placeholder="Mời bạn nhập tài khoản" />
                                        </Form.Item>
                                    </Col>
                                    <Col md={12}>
                                        <Form.Item style={{ textAlign: "center" }}>
                                            <Buttons
                                                type="primary"
                                                htmlType="submit"
                                                className="login__btn"
                                            >
                                                Submit
                                            </Buttons>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </RightPanel>
                        </ColStyled>
                    </Row>
                </>
            )}
        </Form>
    );
}

const Div = styled.div``;

const ColStyled = styled(Col)`
    // border: 1px solid black;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 10px;
    padding: 20px;
`;

const LeftPanel = styled.div`
    .ant-card-body {
        text-align: center;
    }
`;

const RightPanel = styled.div``;
