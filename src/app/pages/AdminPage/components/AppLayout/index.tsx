/**
 *
 * AppLayout
 *
 */
import { Layout } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import styled from "styled-components/macro";
import HeaderAdmin from "../common/HeaderAdmin";
import { Sidebar } from "../common/Sidebar";

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
