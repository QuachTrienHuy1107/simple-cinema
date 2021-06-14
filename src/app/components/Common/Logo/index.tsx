/**
 *
 * Logo
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import logo from "./assets/logo.png";
import { Link } from "react-router-dom";
import { ROUTES } from "utils/constants/settings";

interface Props {}

export function Logo({ ...rest }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper {...rest}>
            <Link to={ROUTES.HOME}>
                <img src={logo} alt="" width={50} />
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled.div``;
