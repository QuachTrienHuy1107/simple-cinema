/**
 *
 * Switcher
 *
 */
import React, { ChangeEvent, memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Switch } from "antd";

interface Props {}

export const Switcher = (props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [lang, setLang] = React.useState<string>("vi");
    const handleLangChange = (isSelected, e: ChangeEvent<HTMLInputElement>) => {
        console.log("e", e);
    };

    return (
        <Div>
            <Switch
                checkedChildren="vi"
                unCheckedChildren="en"
                defaultChecked
                onChange={(isCheck: boolean, e: MouseEvent) => {
                    console.log("isCheck", isCheck);
                    console.log("e", e.currentTarget);
                    if (!isCheck) {
                        setLang("en");
                    }
                    i18n.changeLanguage(lang);
                }}
            />
        </Div>
    );
};

const Div = styled.div``;
