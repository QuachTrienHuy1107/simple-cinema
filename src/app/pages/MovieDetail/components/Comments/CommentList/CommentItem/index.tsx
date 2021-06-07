/**
 *
 * CommentItem
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Avatar, Button, Col, Divider, Rate, Row, Space } from "antd";
import { LikeFilled, UserOutlined } from "@ant-design/icons";

interface Props {
    binhLuan: any;
}

export const CommentItem = memo(({ binhLuan }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <UserComment>
                <Info>
                    <Avatar icon={<UserOutlined />} />
                    <div>
                        <h5>{binhLuan?.taiKhoan}</h5>
                        <span className="timer">{binhLuan?.ngayDang}</span>
                    </div>
                </Info>

                <Score>
                    <div>
                        <h5>{binhLuan?.danhGia}</h5>
                        <span>
                            <Rate disabled defaultValue={2} style={{ fontSize: "0.8rem" }} />
                        </span>
                    </div>
                </Score>
            </UserComment>
            <CommentDetail>
                <p>{binhLuan.binhLuan}</p>
            </CommentDetail>
            <Divider />
            <Rating>
                <Button icon={<LikeFilled />} style={{ border: "none" }}></Button>
                <span className="amount">0 Thích</span>
            </Rating>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    margin: 30px 0;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
`;

const UserComment = styled.div`
    display: flex;
    justify-content: space-between;

    h5 {
        margin-bottom: 0;
        font-size: 1.1rem;
    }
`;

const Info = styled(Space)`
    span.timer {
        font-size: 0.8rem;
        color: #929292;
    }
`;

const Score = styled.div`
    > div {
        text-align: center;
    }
`;

const Rating = styled.div`
    display: flex;
    align-items: center;
    span.amount {
        transform: translateY(3px);
        color: #737576;
        font-size: 14px;
    }
`;

const CommentDetail = styled.div`
    margin: 10px 0;
    padding: 0 5px;
    p {
        font-size: 1.1rem;
    }
`;
