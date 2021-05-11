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
import { selectAuth } from "app/pages/Form/slice/selectors";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useAuthSlice } from "app/pages/Form/slice";
import { ROUTES } from "config";

interface Props {}

export function Header(props: Props) {
    const { t } = useTranslation();
    const { credentials, isLoading, isError } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const { actions } = useAuthSlice();
    const [navBackground, setNavBackground] = React.useState<boolean>(false);
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
        <Menu mode="horizontal">
            {(credentials.maLoaiNguoiDung === "QuanTri" && (
                <>
                    <Menu.Item key="0">
                        <Link to={ROUTES.DASHBOARD}>Admin page</Link>
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
                            dispatch(actions.checkLogoutAction());
                            localStorage.clear();
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
            }}
        >
            <Logo>
                <img src={logo} alt="" width={60} />
            </Logo>
            <NavList />
            {Object.keys(credentials).length === 0 ? (
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
            )}
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
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 1px 1px 1px 0 rgba(239, 239, 239, 0.14);
    transition: 0.6s ease;
`;

const Logo = styled.div``;
