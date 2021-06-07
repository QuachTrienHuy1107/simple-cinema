/**
 *
 * Footer
 *
 */
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import logo from "../../../assets/img/logo.png";

import { messages } from "./messages";

interface Props {}

export function Footer(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Top>
                <Img>
                    <img src={logo} alt="" />
                </Img>
                <SocialUrl>
                    <ul>
                        <li>
                            <a href="/">
                                <i className="fab fa-facebook-f" />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fab fa-twitter" />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fab fa-pinterest-p" />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fab fa-google" />
                            </a>
                        </li>
                        <li>
                            <a href="/">
                                <i className="fab fa-instagram" />
                            </a>
                        </li>
                    </ul>
                </SocialUrl>
            </Top>
            <Bot>
                <Left>
                    <p>Copyright © 2020.All Rights Reserved By Boleto</p>
                </Left>
                <Right>
                    <ul>
                        <li>
                            <a href="/">About</a>
                        </li>
                        <li>
                            <a href="/">Terms of use</a>
                        </li>
                        <li>
                            <a href="/">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="/">FAQ</a>
                        </li>
                        <li>
                            <a href="/">Feedback</a>
                        </li>
                    </ul>
                </Right>
            </Bot>
        </Wrapper>
    );
}

const Wrapper = styled.footer`
    background-color: #222;
    padding-top: 20px;
    padding-bottom: 20px;
    color: #fff;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 10px;
    width: 80%;
    margin: 0 auto;

    @media screen and (max-width: 280px) {
        width: 90%;
    }
`;

const Img = styled.div`
    align-self: center;
`;

const SocialUrl = styled.div`
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            margin: 8px;
            a {
                padding: 8px;
                width: 36px;
                height: 36px;
                line-height: 36px;
                text-align: center;
                border-radius: 50%;
                border: 1px solid rgba(255, 255, 255, 0.1);

                font-size: 14px;
                &:hover {
                    background-color: #69d7aa;
                    transition: all ease 0.3s;
                }
                i {
                    width: 15px;
                    height: 15px;
                }
            }
        }
    }
`;

const Bot = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
`;

const Left = styled.div`
    align-self: center;
`;

const Right = styled.div`
    ul {
        display: flex;
        flex-wrap: wrap;
        li {
            margin: 20px;
        }
    }
`;
