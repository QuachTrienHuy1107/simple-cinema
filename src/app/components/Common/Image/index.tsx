/**
 *
 * Image
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";

export function Img({ ...rest }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return <Wrapper {...rest} />;
}

const Wrapper = styled.img`
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    width: 100%;
    display: block;
    object-fit: cover;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    position: relative;
    transition: all 0.5s;
`;
