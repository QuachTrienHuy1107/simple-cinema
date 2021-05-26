/**
 *
 * Comment
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Collapse, Form, Input, message, Rate, Skeleton, Space } from "antd";
import img from "./assets/listStar.png";
import { HeartOutlined } from "@ant-design/icons";
import { CommentList } from "./CommentList";
import axios from "axios";
import { fakeApi } from "utils/constants/settings";
import { MovieDetailPayload } from "app/pages/HomePage/slice/types";
import { Buttons } from "app/components/Common/Buttons";

interface ICommentProps {
    maPhim: any;
}

const { Panel } = Collapse;
const { TextArea } = Input;

function callback(key) {
    console.log(key);
}

export const Comments = memo(({ maPhim }: ICommentProps) => {
    const { t, i18n } = useTranslation();
    const [commentList, setCommentList] = React.useState([]) as any;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    console.log("maPhim", maPhim);

    React.useEffect(() => {
        const fetchReviewList = async (): Promise<void> => {
            try {
                const response = await fetch(`${fakeApi}/reviews/${maPhim}`, {
                    method: "GET",
                });
                const data = await response.json();
                console.log("responsezzzzzz", data);
                setCommentList(data);
            } catch (error) {
                console.log("err", error);
            }
        };
        fetchReviewList();
        console.log("www");
    }, [maPhim]);

    console.log("arrReviews", commentList);

    const onFinish = async (values: any) => {
        console.log(values);
        const newComment = {
            maNguoiDung: "11",
            taiKhoan: "zzz",
            ...values,
        };
        const data = {
            ...commentList,
            danhSachBinhLuan: [...commentList?.danhSachBinhLuan, newComment],
        };
        console.log("data", data);
        try {
            setLoading(true);
            const request = await fetch(`${fakeApi}/reviews/${maPhim}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const result = await request.json();
            setCommentList(result);
        } catch (error) {
            setError(error);
            message.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Wrapper>
            <Collapse onChange={callback} expandIconPosition="right">
                <Panel
                    header="Bạn nghĩ gì về phim này dợ?"
                    key="1"
                    extra={<img src={img} alt="listStar" />}
                    showArrow={false}
                >
                    {loading ? (
                        <Skeleton />
                    ) : (
                        <Form onFinish={onFinish}>
                            <Form.Item
                                name="danhGia"
                                label="Đánh giá"
                                rules={[{ required: true, message: "Please pick an item!" }]}
                            >
                                <Rate style={{ marginLeft: 5 }} />
                            </Form.Item>
                            <Form.Item
                                name="binhLuan"
                                label="Comment"
                                rules={[{ required: true, message: "Không được bỏ trống" }]}
                            >
                                <TextArea
                                    placeholder="Nói cho mọi người biết bạn nghĩ gì về phim này đi?"
                                    rows={4}
                                />
                            </Form.Item>
                            <Form.Item>
                                <div style={{ textAlign: "right" }}>
                                    <ButtonStyle htmlType="submit">Đăng</ButtonStyle>
                                </div>
                            </Form.Item>
                        </Form>
                    )}
                </Panel>
            </Collapse>
            <CommentList commentList={commentList} />
        </Wrapper>
    );
});

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #0a2029;

    .ant-collapse-header {
        font-size: 1rem;
    }
`;

const Rating = styled(Space)`
    .rating {
        &__score {
            font-size: 2rem;
            color: #7ed321;
        }
    }
`;

const ButtonStyle = styled(Button)`
    margin-top: 20px;
    padding-left: 29px;
    padding-right: 29px;
    background-color: #fb4226 !important;

    border-color: #fb4226 !important;
    color: #fff !important;
    background-image: linear-gradient(-226deg, #fb4226 11%, #be2912 100%);
`;
