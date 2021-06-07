/**
 *
 * NavList
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";

import { Nav } from "./Nav";
import { Switcher } from "app/components/Switcher";

interface Props {}

export function NavList(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    return (
        <Wrapper>
            <Nav />
        </Wrapper>
    );
}

const Wrapper = styled.div``;
