/**
 *
 * AppLayout
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Layout } from "antd";
import { Sidebar } from "../common/Sidebar";
import HeaderAdmin from "../common/HeaderAdmin";
import { Link, useHistory } from "react-router-dom";
import { ROUTES } from "utils/constants/settings";

interface Props {}

const { Content, Footer } = Layout;

export function AppLayout({ children }) {
    const { t, i18n } = useTranslation();
    const [collapsed, setCollapsed] = React.useState(false);
    const history = useHistory();

    const onCollapse = (collapsed: boolean): void => {
        setCollapsed(!collapsed);
    };

    return (
        <Wrapper>
            <Layout style={{ minHeight: "100vh" }}>
                <Sidebar collapsed={collapsed} onCollapse={onCollapse} />
                <Layout className="site-layout">
                    <HeaderAdmin collapsed={collapsed} onCollapse={onCollapse} />

                    <Content style={{ margin: "0 16px" }}>
                        <div
                            className="site-layout-background"
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            {children}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: "center",
                            borderTop: "1px solid #d8dbe0",
                            padding: "13px 50px",
                        }}
                    >
                        Simple Movie
                    </Footer>
                </Layout>
            </Layout>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
