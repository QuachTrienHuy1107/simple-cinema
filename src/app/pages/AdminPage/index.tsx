/**
 *
 * AdminPage
 *
 */
import * as React from "react";
import { Helmet } from "react-helmet-async";
import { RouteProps } from "react-router";
import styled from "styled-components/macro";
import { AppLayout } from "./components/AppLayout";

interface Props {}

type AdminRouteProps = {
    component?: React.ComponentType;
} & RouteProps;

export function AdminPage({ children }: AdminRouteProps) {
    return (
        <Wrapper>
            <Helmet>
                <title>Admin page</title>
                <meta name="description" content="Adminpage" />
            </Helmet>
            <AppLayout>{children}</AppLayout>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
