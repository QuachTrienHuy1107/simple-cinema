import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { navListMessages } from "./navListMessages";

export function Nav() {
    const { t } = useTranslation();
    return (
        <Wrapper>
            <Item>
                <Link to="/">{t(navListMessages.HomePage())}</Link>
            </Item>
            <Item>
                <Link to="/movie/:id">{t(navListMessages.MovieList())}</Link>
            </Item>
            <Item>
                <Link to="/about">{t(navListMessages.AboutUs())}</Link>
            </Item>
        </Wrapper>
    );
}

const Wrapper = styled.ul`
    display: flex;
    cursor: pointer;
`;

const Item = styled.li`
    font-weight: 700;
    margin: 0 20px;
    text-transform: uppercase;
    &:hover {
        color: $secondaryColor;
        transition: all 0.2s linear;
    }
`;
