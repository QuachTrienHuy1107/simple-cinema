/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Header
 *
 */
import { AlignRightOutlined, DownOutlined } from "@ant-design/icons";
import { Button, Col, Drawer, Dropdown, Menu, Row, Steps } from "antd";
import { useAuthSlice } from "app/pages/Form/slice";
import { selectAuth } from "app/pages/Form/slice/selectors";
import { useScreenType } from "hooks/useScreenType";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components/macro";
import { ROUTES } from "utils/constants/settings";
import { Buttons } from "../Buttons";
import { Logo } from "../Logo";
import { NavList } from "../NavList";

interface IHeaderProps {}

const { SubMenu } = Menu;

const { Step } = Steps;

export const Header: React.FC = (props: IHeaderProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { Desktop, Mobile } = useScreenType();
    const [navBackground, setNavBackground] = React.useState<boolean>(false);
    const [visible, setVisible] = React.useState<boolean>(false);
    const { credentials } = useSelector(selectAuth);
    const location = useLocation();
    const { actions } = useAuthSlice();

    const isCheckout = location.pathname.includes("checkout");

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
                        <Link to={ROUTES.DASHBOARD}>Quản trị</Link>
                    </Menu.Item>

                    <Menu.Item
                        key="2"
                        onClick={() => {
                            dispatch(actions.checkLogoutAction());
                            localStorage.clear();
                        }}
                    >
                        Đăng xuất
                    </Menu.Item>
                </>
            )) || (
                <>
                    <Menu.Item
                        key="1"
                        onClick={() => {
                            localStorage.clear();
                            dispatch(actions.checkLogoutAction());
                        }}
                    >
                        Đăng xuất
                    </Menu.Item>
                </>
            )}
        </Menu>
    );

    return (
        <Wrapper
            style={{
                backgroundColor: navBackground ? "rgba(255,255,255,0.95)" : "transparent",
                position: isCheckout ? "relative" : "sticky",
                zIndex: isCheckout ? 0 : 10,
            }}
        >
            <Desktop>
                <Row align="middle" justify="space-between">
                    <Col span={4}>
                        <Logo />
                    </Col>
                    <Col span={12} offset={2}>
                        <NavList />
                    </Col>
                    <Col span={6} style={{ paddingRight: 20, textAlign: "right" }}>
                        {Object.keys(credentials).length === 0 ? (
                            <Buttons className="header__button--joinus">
                                <Link to={ROUTES.LOGIN}>Đăng nhập</Link>
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
                <Row justify="space-between" align="middle" style={{ padding: "0 15px" }}>
                    <Col span={8}>
                        <Logo />
                    </Col>

                    <Col span={8} style={{ textAlign: "right" }}>
                        <ButtonStyle
                            onClick={() => {
                                setVisible(!visible);
                            }}
                        >
                            <AlignRightOutlined />
                        </ButtonStyle>
                    </Col>
                </Row>
                <DrawerStyle
                    title={
                        Object.keys(credentials).length === 0 ? (
                            <Buttons className="header__button--joinus">
                                <Link to={ROUTES.LOGIN}>Đăng nhập</Link>
                            </Buttons>
                        ) : (
                            <Dropdown overlay={menu} trigger={["click"]}>
                                <a
                                    className="ant-dropdown-link"
                                    style={{ color: "#000" }}
                                    onClick={e => e.preventDefault()}
                                >
                                    {credentials.hoTen} <DownOutlined />
                                </a>
                                {/* <Buttons
                                    className="header__button--joinus"
                                    style={{ paddingLeft: 0 }}
                                >
                                    {credentials.hoTen}
                                </Buttons> */}
                            </Dropdown>
                        )
                    }
                    placement="right"
                    closable={false}
                    onClose={() => {
                        setVisible(!visible);
                    }}
                    visible={visible}
                    key="left"
                >
                    <NavList />
                    {/* <Menu
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        defaultOpenKeys={["sub1"]}
                        style={{ height: "100%", borderRight: 0 }}
                    >
                        <Menu.Item>
                            <Link to={ROUTES.HOME}>{t(navListMessages.HomePage())}</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={ROUTES.MOVIELIST}>{t(navListMessages.MovieList())}</Link>
                        </Menu.Item>
                        <Menu.Item>
                            <Link to={ROUTES.ABOUT}>{t(navListMessages.CinemaList())}</Link>
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
                    </Menu> */}
                </DrawerStyle>
            </Mobile>
        </Wrapper>
    );
};

const Wrapper = styled.header`
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 0 20px;

    box-shadow: 1px 1px 1px 0 rgba(239, 239, 239, 0.14);
    transition: 0.6s ease;

    a {
        color: ${props => props.theme.primaryColor};
        font-weight: 500;
    }
`;

const DrawerStyle = styled(Drawer)`
    .ant-drawer-body {
        padding-top: 0;
        padding-left: 0;
    }
`;

const ButtonStyle = styled(Button)`
    border: none;
    background: transparent;
    span {
        font-size: 1.8rem;
    }
`;
