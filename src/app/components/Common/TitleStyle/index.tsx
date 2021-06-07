/**
 *
 * TitleStyle
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";

interface Props {
    content: string;
}

export function TitleStyle({ href, children, ...rest }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper href={href} {...rest}>
            <h3>{children}</h3>
        </Wrapper>
    );
}

const Wrapper = styled.a`
    color: #000;
    font-weight: 500;

    &:hover {
        h3 {
            transition: all 0.3s;
            color: #fb4226;
        }
    }
`;
