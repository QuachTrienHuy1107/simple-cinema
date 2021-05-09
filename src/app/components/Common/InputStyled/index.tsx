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

export function InputStyled(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <FormItem
            rules={[
                {
                    required: true,
                    message: "Không được bỏ trống!",
                },
            ]}
        >
            <Input
                prefix={<SearchOutlined className="site-form-item-icon" />}
                placeholder="Tìm phim"
            />
        </FormItem>
    );
}

const FormItem = styled(Form.Item)``;
