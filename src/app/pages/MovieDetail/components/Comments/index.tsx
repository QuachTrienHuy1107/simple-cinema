/**
 *
 * Comment
 *
 */
import { Alert, Button, Collapse, Form, Input, Rate, Skeleton } from "antd";
import { selectAuth } from "app/pages/Form/slice/selectors";
import moment from "moment";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import { media } from "styles/media";
import Swal from "sweetalert2";
import { fakeApi, ROUTES } from "utils/constants/settings";
import img from "./assets/listStar.png";
import { CommentList } from "./CommentList";

interface ICommentProps {
    maPhim: any;
}

const { Panel } = Collapse;
const { TextArea } = Input;

function callback(key) {}

export const Comments = memo(({ maPhim }: ICommentProps) => {
    const { t, i18n } = useTranslation();
    const [commentList, setCommentList] = React.useState([]) as any;
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<Error | null>(null);
    const { credentials } = useSelector(selectAuth);
    const [commentDetail, setCommentDetail] = React.useState({}) as any;
    const [isPost, setPost] = React.useState(false);
    const history = useHistory();

    React.useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${fakeApi}/reviews/`);
                const data = await res.json();
                setCommentList(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
                // clearTimeout(waitTimer);
            }
        };
        fetchAll();
    }, []);

    React.useEffect(() => {
        if (commentList.length !== 0) {
            const index = commentList?.find((item: any) => item.maPhim === +maPhim);
            if (index) {
                const { maPhim } = index;
                const fetchReviewList = async (): Promise<void> => {
                    try {
                        setLoading(true);
                        const response = await fetch(`${fakeApi}/reviews/${maPhim}`, {
                            method: "GET",
                        });
                        const data = await response.json();

                        setCommentDetail(data);
                    } catch (err) {
                        setError(err);
                    } finally {
                        setLoading(false);
                    }
                };
                fetchReviewList();
            } else {
                setPost(true);
            }
        }
    }, [commentList, maPhim]);

    const onFinish = async (values: any) => {
        const id = Math.round(Math.random() * 10000000);

        if (Object.keys(credentials).length === 0) {
            Swal.fire({
                title: "????ng nh???p ????? ti???p t???c",

                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "H???y b???",
                confirmButtonText: "????ng nh???p",
            }).then(result => {
                if (result.isConfirmed) {
                    history.push(ROUTES.LOGIN);
                }
            });
            return;
        }
        try {
            setLoading(true);
            if (isPost) {
                const newComment = {
                    id,
                    maPhim: +maPhim,
                    danhSachBinhLuan: [
                        {
                            maNguoiDung: credentials?.taiKhoan,
                            taiKhoan: credentials?.hoTen,
                            ngayDang: moment().format("MMMM Do YYYY, h:mm:ss a"),
                            ...values,
                        },
                    ],
                };

                const request = await fetch(`${fakeApi}/reviews`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newComment),
                });
                const res = await request.json();
                setCommentDetail(res);
                setPost(false);
            } else {
                const newComment = {
                    id,
                    maNguoiDung: credentials?.taiKhoan,
                    taiKhoan: credentials?.hoTen,
                    ngayDang: moment().format("MMMM Do YYYY, h:mm:ss a"),

                    ...values,
                };
                const data = {
                    ...commentDetail,
                    danhSachBinhLuan: [...commentDetail?.danhSachBinhLuan, newComment],
                };

                const request = await fetch(`${fakeApi}/reviews/${maPhim}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
                const result = await request.json();
                setCommentDetail(result);
            }
        } catch (err) {
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {};

    return (
        <Wrapper>
            <Collapse onChange={callback} expandIconPosition="right">
                <Panel
                    header="B???n ngh?? g?? v??? phim n??y?"
                    key="1"
                    extra={<img src={img} alt="listStar" />}
                    showArrow={false}
                >
                    {(loading && <Skeleton />) ||
                        (error && (
                            <Alert
                                message="Network Error"
                                description="Please check your internet and comeback again!!"
                                type="error"
                                showIcon
                            />
                        )) || (
                            <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
                                <Form.Item
                                    name="danhGia"
                                    label="????nh gi??"
                                    rules={[{ required: true, message: "Kh??ng ???????c b??? tr???ng" }]}
                                >
                                    <Rate count={10} style={{ marginLeft: 5 }} />
                                </Form.Item>
                                <Form.Item
                                    name="binhLuan"
                                    label="B??nh lu???n"
                                    rules={[{ required: true, message: "Kh??ng ???????c b??? tr???ng" }]}
                                >
                                    <TextArea
                                        placeholder="N??i cho m???i ng?????i bi???t b???n ngh?? g?? v??? phim n??y ??i?"
                                        rows={4}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <div style={{ textAlign: "right" }}>
                                        <ButtonStyle htmlType="submit" loading={loading}>
                                            ????ng
                                        </ButtonStyle>
                                    </div>
                                </Form.Item>
                            </Form>
                        )}
                </Panel>
            </Collapse>
            <CommentList commentList={commentDetail} />
        </Wrapper>
    );
});

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background: #0a2029;
    position: relative;

    .ant-collapse-header {
        font-size: 1rem;
    }

    ${media.xsmall`
        width: 95%;
        margin: 0 auto;
    `}
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
