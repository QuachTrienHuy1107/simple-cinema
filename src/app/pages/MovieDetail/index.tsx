/**
 *
 * MovieDetail
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";

interface Props {}

export function MovieDetail(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Div>
            <p>demoo</p>
            {t("")}
            {/*  {t(...messages.someThing())}  */}
        </Div>
    );
}

const Div = styled.div``;
