/**
 *
 * Sidebar
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Logo } from "../Logo";
import { Layout, Menu } from "antd";
import {
    AppstoreOutlined,
    ContainerOutlined,
    MailOutlined,
    PieChartOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/constants/settings";

interface ISideBarProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const { Sider } = Layout;
const { SubMenu } = Menu;

export const Sidebar = memo(({ collapsed, onCollapse }: ISideBarProps) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper style={{ width: collapsed ? 80 : 200 }}>
            <Sider
                theme="light"
                collapsible
                collapsed={collapsed}
                onCollapse={() => onCollapse(collapsed)}
                collapsedWidth="80"
                breakpoint="lg"
            >
                <Logo />
                <Menu defaultSelectedKeys={[window.location.pathname]} mode="inline">
                    <Menu.Item key={ROUTES.DASHBOARD} icon={<PieChartOutlined />}>
                        <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key={ROUTES.USERMANAGEMENT} icon={<TeamOutlined />}>
                        <Link to={ROUTES.USERMANAGEMENT}>UserManagement</Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<ContainerOutlined />} title="Movie Management">
                        <Menu.Item key={ROUTES.MOVIEMANAGEMENT} icon={<ContainerOutlined />}>
                            <Link to={ROUTES.MOVIEMANAGEMENT}>Movie Management</Link>
                        </Menu.Item>
                        <Menu.Item key={ROUTES.SHOWTIME} icon={<ContainerOutlined />}>
                            <Link to={ROUTES.SHOWTIME}>Add Showtime</Link>
                        </Menu.Item>
                    </SubMenu>

                    <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                </Menu>
            </Sider>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    position: relative;

    aside {
        height: 100%;
        position: fixed;
        height: 100%;
        z-index: 20;
        top: 0;
        left: 0;
    }

    @media screen and (max-width: 956px) {
        aside {
            position: fixed;
            height: 100%;
            z-index: 11;
        }
    }
`;

const Div = styled.div``;
