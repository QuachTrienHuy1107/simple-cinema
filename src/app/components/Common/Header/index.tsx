/**
 *
 * Header
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import logo from "./assets/logo.png";
import { NavList } from "../NavList";
import { Buttons } from "../Buttons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Button, Col, Drawer, Dropdown, Menu, Row, Space } from "antd";
import {
    DownOutlined,
    LaptopOutlined,
    LoginOutlined,
    NotificationOutlined,
    UserOutlined,
} from "@ant-design/icons";

import { InputStyled } from "../InputStyled";
import { useScreenType } from "hooks/useScreenType";
import { selectAuth } from "app/pages/Form/slice/selectors";
import { ROUTES } from "utils/constants/settings";
import useLocalStorage from "hooks/useLocalStorage";
import { useIdentity } from "hooks/useIdentity";
import { useAuthSlice } from "app/pages/Form/slice";

interface Props {}

const { SubMenu } = Menu;

export function Header(props: Props) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { Desktop, Mobile } = useScreenType();

    const [navBackground, setNavBackground] = React.useState<boolean>(false);
    const [visible, setVisible] = React.useState<boolean>(false);
    const { credentials } = useSelector(selectAuth);
    // const { user, isAuth } = useIdentity();
    const { actions } = useAuthSlice();

    const navRef = React.useRef<undefined | boolean>();
    navRef.current = navBackground;
    React.useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 50;
            if (navRef.current !== show) {
                setNavBackground(show);
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const menu = (
        <Menu>
            {(credentials.maLoaiNguoiDung === "QuanTri" && (
                <>
                    <Menu.Item key="0">
                        <Link to={ROUTES.DASHBOARD}>Admin</Link>
                    </Menu.Item>

                    <Menu.Item
                        key="2"
                        onClick={() => {
                            dispatch(actions.checkLogoutAction());
                            localStorage.clear();
                        }}
                    >
                        Logout
                    </Menu.Item>
                </>
            )) || (
                <>
                    <Menu.Item key="0">
                        <Link to={`profile/${credentials.taiKhoan}`}>Thông tin</Link>
                    </Menu.Item>
                    <Menu.Item
                        key="1"
                        onClick={() => {
                            localStorage.clear();
                            dispatch(actions.checkLogoutAction());
                        }}
                    >
                        Logout
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <Wrapper
            style={{
                backgroundColor: navBackground ? "#131720" : "transparent",
                padding: "20px 0",
            }}
        >
            <Desktop>
                <Row align="middle" justify="center">
                    <Col span={4} style={{ textAlign: "right" }}>
                        <img
                            src="https://dmitryvolkov.me/demo/flixtv/main/img/logo.svg"
                            alt=""
                            width={60}
                        />
                    </Col>

                    <ColStyled span={10} offset={2}>
                        <NavList />
                    </ColStyled>

                    <Col span={6} offset={1}>
                        {Object.keys(credentials).length === 0 ? (
                            <Buttons className="header__button--joinus">
                                <Link to="/login">Đăng nhập</Link>
                            </Buttons>
                        ) : (
                            <Dropdown overlay={menu} trigger={["click"]}>
                                <Buttons className="header__button--joinus">
                                    {credentials.hoTen}
                                    <DownOutlined style={{ transform: "translateY(-3px)" }} />
                                </Buttons>
                            </Dropdown>
                        )}
                    </Col>
                </Row>
            </Desktop>
            <Mobile>
                <Row justify="space-around" align="middle">
                    <Col span={6}>
                        <img
                            src="https://dmitryvolkov.me/demo/flixtv/main/img/logo.svg"
                            alt=""
                            width={60}
                        />
                    </Col>
                    <Col span={6} offset={8}>
                        <Button
                            onClick={() => {
                                setVisible(!visible);
                            }}
                        >
                            123
                        </Button>
                    </Col>
                </Row>
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    closable={false}
                    onClose={() => {
                        setVisible(!visible);
                    }}
                    visible={visible}
                    key="left"
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <SubMenu key="sub1" icon={<UserOutlined />} title="subnav 1">
                            <Menu.Item key="1">option1</Menu.Item>
                            <Menu.Item key="2">option2</Menu.Item>
                            <Menu.Item key="3">option3</Menu.Item>
                            <Menu.Item key="4">option4</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub2" icon={<LaptopOutlined />} title="subnav 2">
                            <Menu.Item key="5">option5</Menu.Item>
                            <Menu.Item key="6">option6</Menu.Item>
                            <Menu.Item key="7">option7</Menu.Item>
                            <Menu.Item key="8">option8</Menu.Item>
                        </SubMenu>
                        <SubMenu key="sub3" icon={<NotificationOutlined />} title="subnav 3">
                            <Menu.Item key="9">option9</Menu.Item>
                            <Menu.Item key="10">option10</Menu.Item>
                            <Menu.Item key="11">option11</Menu.Item>
                            <Menu.Item key="12">option12</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Drawer>
            </Mobile>

            {/*  {Object.keys(credentials).length === 0 ? (
                <Buttons>
                    <Link to={ROUTES.LOGIN}>{t(messages.btnLogin())}</Link>
                </Buttons>
            ) : (
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Buttons>
                        {credentials.hoTen}
                        <DownOutlined style={{ transform: "translateY(-3px)" }} />
                    </Buttons>
                </Dropdown>
            )} */}
        </Wrapper>
    );
}

const Wrapper = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 10px 0px;

    box-shadow: 1px 1px 1px 0 rgba(239, 239, 239, 0.14);
    transition: 0.6s ease;
`;

const ColStyled = styled(Col)`
    display: flex;
    justify-content: center;
`;
