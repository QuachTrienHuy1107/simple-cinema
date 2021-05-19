/**
 *
 * Form
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { useDispatch, useSelector } from "react-redux";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { useLocation, useParams } from "react-router";
import { useAddEdit } from "app/pages/AdminPage/hooks/useAddEdit";
import { Button, Card, Col, Form, Input, Row, Skeleton } from "antd";
import { useUpload } from "app/pages/AdminPage/hooks/useUpload";
import { formItemLayout } from "utils/helpers";
import { InputStyled } from "app/components/Common/InputStyled";
import { UploadOutlined } from "@ant-design/icons";
import { Buttons } from "app/components/Common/Buttons";

interface Props {}

interface LocationState {
    isEdit: boolean;
}

export const MovieFormAdmin = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    const { t, i18n } = useTranslation();
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
        <Wrapper>
            <Form form={form} onFinish={onFinish} name="movie">
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <>
                        <Row justify="space-around" gutter={[20, 35]}>
                            <ColStyled md={15}>
                                <LeftPanel>
                                    <Row gutter={[24, 12]} justify="space-around">
                                        <Col md={12}>
                                            <Form.Item
                                                {...formItemLayout}
                                                label="Tên phim"
                                                name="tenPhim"
                                                rules={[{ required: true }]}
                                            >
                                                <InputStyled
                                                    size="large"
                                                    placeholder="Mời bạn nhập tên phim"
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
                                </LeftPanel>
                            </ColStyled>
                            <ColStyled md={6}>
                                <RightPanel>
                                    {imgPreview ? (
                                        <Card
                                            hoverable
                                            style={{ width: 240 }}
                                            cover={<img alt="example" src={imgPreview} />}
                                        />
                                    ) : (
                                        <Form.Item>
                                            <Input
                                                name="hinhAnh"
                                                type="file"
                                                onChange={handleFileChange}
                                                // style={{ display: "none" }}
                                            />
                                        </Form.Item>
                                    )}

                                    {isEdit ? <img width={250} src={movie?.hinhAnh} alt="" /> : ""}
                                </RightPanel>
                            </ColStyled>
                        </Row>
                    </>
                )}
            </Form>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    background-color: #131720;
    border-radius: 16px;
    position: relative;
    width: 100%;
    border: 1px solid #151f30;
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
