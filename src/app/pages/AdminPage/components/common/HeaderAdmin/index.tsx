/**
 *
 * HeaderAdmin
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { LineChartOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Nav } from "../Nav";
import NavItem from "../Nav/NavItem";
import { Link } from "react-router-dom";
import { Logo } from "../Logo";
import { BadgeList } from "../BadgeList";
import { Breadcrumb } from "antd";

interface IHeaderAdminProps {
    collapsed: boolean;
    onCollapse: (collapsed: boolean) => void;
}

const HeaderAdmin = memo(({ collapsed, onCollapse }: IHeaderAdminProps) => {
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <PageWrapper>
                <div style={{ display: "flex" }}>
                    <IconToggle>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: "trigger",
                            onClick: () => {
                                onCollapse(collapsed);
                            },
                        })}
                    </IconToggle>
                    <Nav>
                        <NavItem />
                    </Nav>
                </div>
                <LogoHeader>
                    <Logo />
                </LogoHeader>

                <BadgeList />
            </PageWrapper>

            <SubHeader>
                <Breadcrumb style={{ margin: "16px 0" }}>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>{window.location.pathname.substr(1)}</Breadcrumb.Item>
                </Breadcrumb>
                <Nav>
                    <NavItem />
                </Nav>
            </SubHeader>
        </Wrapper>
    );
});

const Wrapper = styled.header`
    box-shadow: 0 2px 2px 0 rgba(60, 75, 100, 0.14);
    width: 100%;
    span {
        color: ${p => p.theme.secondaryColor} !important;
    }
`;

const LogoHeader = styled.div`
    width: 250px;
    display: none;

    @media screen and (max-width: 756px) {
        display: block;
    }

    @media screen and (max-width: 480px) {
        flex: 1;
    } ;
`;

const SubHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    width: 100%;
`;

const PageWrapper = styled.div`
    margin-bottom: -1px;
    border-bottom: 1px solid #d8dbe0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const IconToggle = styled.div`
    .trigger {
        padding: 0 24px;
        font-size: 18px;
        line-height: 64px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .trigger:hover {
        color: #1890ff;
    }

    .logo {
        height: 32px;
        margin: 16px;
        background: rgba(255, 255, 255, 0.3);
    }

    .site-layout .site-layout-background {
        background: #fff;
    }
`;

const Icon = styled.div`
    transform: translate(-4px, -3px);
    display: inline-block;
`;

export default HeaderAdmin;
