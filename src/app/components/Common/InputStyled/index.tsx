/**
 *
 * InputStyled
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Form, Input, InputProps } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface Props extends InputProps {}

export function InputStyled({ ...rest }: Props) {
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
    border: 1px solid transparent;
    border-bottom: 1px solid #000;
    border-radius: 0;
    height: 44px;
    position: relative;

    font-size: 14px;
    width: 100%;
    padding: 0 20px;

    .ant-input: focus {
        border: 1px solid transparent !important;
        border-bottom: 1px solid #000;
    }
`;
