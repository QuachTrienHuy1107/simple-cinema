/**
 *
 * Button
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { ButtonMessages } from "./messages";
import { Button } from "antd";

interface Props {}

export function Buttons({ children, ...rest }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <ButtonLogin shape="round" {...rest}>
                {children}
            </ButtonLogin>
        </Wrapper>
    );
}

const Wrapper = styled.div``;

const ButtonLogin = styled(Button)`
    background-color: #010819;
    line-height: 0;
    font-weight: 600;
    border-radius: 300px;
    display: inline-block;
    outline: none;
    border: none;
    font-size: 1rem;
    transition: all 0.5s;
    &:hover {
        box-shadow: 0px 10px 15px 0px rgba(59, 55, 188, 0.5);
        // color: #fff;
    }
`;
