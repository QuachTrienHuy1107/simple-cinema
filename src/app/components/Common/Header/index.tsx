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

interface Props {}

const { SubMenu } = Menu;

export function Header(props: Props) {
    const { t } = useTranslation();
    const { Desktop, Mobile } = useScreenType();
    const [navBackground, setNavBackground] = React.useState<boolean>(false);
    const [visible, setVisible] = React.useState<boolean>(false);
    const { credentials } = useSelector(selectAuth);
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
            <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            </Menu.Item>
            <Menu.Item icon={<DownOutlined />} disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item
                </a>
            </Menu.Item>
            <Menu.Item disabled>
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item
                </a>
            </Menu.Item>
            <Menu.Item danger>a danger item</Menu.Item>
        </Menu>
    );

    return (
        <Wrapper
            style={{
                backgroundColor: navBackground ? "#131720" : "transparent",
            }}
        >
            <Desktop>
                <Row justify="center" align="middle">
                    <Col lg={4}>
                        <img
                            src="https://dmitryvolkov.me/demo/flixtv/main/img/logo.svg"
                            alt=""
                            width={60}
                        />
                    </Col>

                    <ColStyled lg={12}>
                        <NavList />
                    </ColStyled>

                    <Col lg={6}>
                        <Space size={20}>
                            <InputStyled placeholder="Tìm phim" />
                            <Space>
                                {Object.keys(credentials).length === 0 ? (
                                    <Link to={ROUTES.LOGIN}>{t(messages.btnLogin())}</Link>
                                ) : (
                                    <Dropdown overlay={menu} trigger={["click"]}>
                                        <div>
                                            {credentials.hoTen}
                                            <DownOutlined
                                                style={{ transform: "translateY(-3px)" }}
                                            />
                                        </div>
                                    </Dropdown>
                                )}
                                {/* <Link to={ROUTES.LOGIN}>{t(messages.btnLogin())}</Link> */}
                                <LoginOutlined style={{ color: "#2f80ed" }} />
                            </Space>
                        </Space>
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
