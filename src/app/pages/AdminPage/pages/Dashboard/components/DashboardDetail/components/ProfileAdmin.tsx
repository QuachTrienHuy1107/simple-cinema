import { Avatar, Button, Spin } from "antd";
import { selectAuth } from "app/pages/Form/slice/selectors";
import React, { memo } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import bgUser from "../assets/user-background.png";

export interface ProfileProps {}

const ProfileAdmin: React.FC<ProfileProps> = memo(() => {
    const { credentials } = useSelector(selectAuth);
    return (
        <Wrapper>
            <div className="header">
                <div className="headerinner">
                    <Avatar
                        size="large"
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    />
                    <h5 className="name">{credentials?.hoTen}</h5>
                </div>
            </div>
            <div className="number">
                <div className="item">
                    <p>EARNING SALES</p>
                    <p style={{ color: "rgb(100, 234, 145)" }}>$3,241</p>
                </div>
                <div className="item">
                    <p>ITEM SOLD</p>
                    <p style={{ color: "rgb(143, 201, 251)" }}>3,556</p>
                </div>
            </div>
            <div className="footer">
                {/* <Button type="ghost" size="large">
                    View Profile
                </Button> */}
            </div>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    background-color: #fff;
    .header {
        display: flex;
        justify-content: center;
        text-align: center;
        color: #fff;
        height: 200px;
        background-size: cover;
        align-items: center;
        position: relative;

        .headerinner {
            z-index: 2;
        }

        &::after {
            content: "";
            background-image: url(${bgUser});
            background-size: cover;
            position: absolute;
            width: 100%;
            height: 200px;
            left: 0;
            top: 0;
            opacity: 0.4;
            z-index: 1;
        }

        .name {
            font-size: 16px;
            margin-top: 8px;
        }
    }

    .number {
        display: flex;
        height: 116px;
        justify-content: space-between;
        border-bottom: solid 1px #f5f5f5;

        .item {
            text-align: center;
            height: 116px;
            width: 100%;
            position: relative;
            padding: 30px 0;

            & + .item {
                &::before {
                    content: "";
                    display: block;
                    width: 1px;
                    height: 116px;
                    position: absolute;
                    background: #f5f5f5;
                    top: 0;
                }
            }

            p {
                color: #757575;

                &:first-child {
                    font-size: 16px;
                }

                &:last-child {
                    font-size: 20px;
                    font-weight: 700;
                }
            }
        }
    }

    .footer {
        height: 116px;
        display: flex;
        justify-content: center;
        align-items: center;

        :global .ant-btn {
            color: @purple;
            border-color: @purple;
            padding: 6px 16px;
        }
    }
`;

const Left = styled.div``;

const Right = styled.div``;

export default ProfileAdmin;
