/**
 *
 * Dashboard
 *
 */
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";

interface Props {}

export function Dashboard(props: Props) {
    const { t, i18n } = useTranslation();

    return <Div>Dashboard</Div>;
}

const Div = styled.div``;
