/**
 *
 * InputStyled
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props {}

export function InputStyled({ ...rest }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <InputStyle {...rest} size="large" />
        </Wrapper>
    );
}

const Wrapper = styled.div``;

const InputStyle = styled(Input)`
    background-color: #151f30;
    border: 1px solid transparent;
    border-radius: 16px;
    height: 44px;
    position: relative;
    color: ${p => p.theme.secondaryColor};
    font-size: 14px;
    width: 100%;
    padding: 0 20px;

    &::placeholder {
        color: ${p => p.theme.secondaryColor};
    }
`;
