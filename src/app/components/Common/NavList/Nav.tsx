import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "utils/constants/settings";
import { navListMessages } from "./navListMessages";

export function Nav() {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <Item>
                <Link to={ROUTES.HOME}>{t(navListMessages.HomePage())}</Link>
            </Item>
            <Item>
                <Link to={ROUTES.MOVIELIST}>{t(navListMessages.MovieList())}</Link>
            </Item>
            <Item>
                <Link to={ROUTES.ABOUT}>{t(navListMessages.AboutUs())}</Link>
            </Item>
            <Item>
                <Link to={ROUTES.DASHBOARD}>Admin</Link>
            </Item>
        </Wrapper>
    );
}

const Wrapper = styled.ul`
    display: flex;
`;

const Item = styled.li`
    cursor: pointer;
    font-weight: 700;
    margin: 0 20px;
    text-transform: uppercase;
    &:hover {
        color: $secondaryColor;
        transition: all 0.2s linear;
    }
`;
