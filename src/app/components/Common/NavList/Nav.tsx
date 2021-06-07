import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Scroll, { scroller, scrollSpy } from "react-scroll";
import styled from "styled-components";
import { media } from "styles/media";
import { ANCHOR, ROUTES } from "utils/constants/settings";
import { LinkTo } from "../LinkTo";
import { navListMessages } from "./navListMessages";

const ScrollLink = Scroll.Link;

export function Nav() {
    const { t } = useTranslation();
    const location = useLocation();

    return (
        <Wrapper>
            {(location.pathname !== "/" && (
                <>
                    <Item>
                        <Link to={{ pathname: ROUTES.HOME, state: { url: ANCHOR.MOVIELISTFROM } }}>
                            {t(navListMessages.MovieList())}
                        </Link>
                    </Item>
                    <Item>
                        <Link to={{ pathname: ROUTES.HOME, state: { url: ANCHOR.CINEMAFROM } }}>
                            {t(navListMessages.CinemaList())}
                        </Link>
                    </Item>
                    <Item>
                        <Link to={{ pathname: ROUTES.HOME, state: { url: ANCHOR.NEWSFORM } }}>
                            {t(navListMessages.News())}
                        </Link>
                    </Item>
                    <Item>
                        <Link
                            to={{ pathname: ROUTES.HOME, state: { url: ANCHOR.APPLiCATIONSFROM } }}
                        >
                            {t(navListMessages.Applications())}
                        </Link>
                    </Item>
                </>
            )) || (
                <>
                    <Item>
                        <ScrollLink
                            activeClass="active"
                            to={ANCHOR.MOVIELISTFROM}
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-50}
                            duration={500}
                        >
                            {t(navListMessages.MovieList())}
                        </ScrollLink>
                    </Item>
                    <Item>
                        <ScrollLink
                            activeClass="active"
                            to={ANCHOR.CINEMAFROM}
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-100}
                            duration={500}
                        >
                            {t(navListMessages.CinemaList())}
                        </ScrollLink>
                    </Item>
                    <Item>
                        <ScrollLink
                            activeClass="active"
                            to={ANCHOR.NEWSFORM}
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            offset={-100}
                            duration={500}
                        >
                            {t(navListMessages.News())}
                        </ScrollLink>
                    </Item>
                    <Item>
                        <ScrollLink
                            activeClass="active"
                            to={ANCHOR.APPLiCATIONSFROM}
                            spy={true}
                            smooth={true}
                            hashSpy={true}
                            duration={500}
                            offset={0}
                        >
                            {t(navListMessages.Applications())}
                        </ScrollLink>
                    </Item>
                </>
            )}
        </Wrapper>
    );
}

const Wrapper = styled.ul`
    padding-left: 0;
    text-align: center;
    margin-bottom: 0;
`;

const Item = styled.li`
    cursor: pointer;
    display: inline-block;
    font-weight: 600;
    margin: 0 20px;
    text-transform: uppercase;
    font-size: 1rem;
    &:hover {
        transition: all 0.2s linear;
    }

    ${media.medium`
        margin: 0 10px;
        font-size: 0.9rem;
    `};

    @media screen and (max-width: 767px) {
        display: block;
        padding: 20px 15px;
        text-align: left;

        a {
            color: #000;
        }
    }
`;

const LinkStyle = styled(LinkTo)`
    a {
        font-weight: 500;
        white-space: none;
        font-size: 1.1rem;
        &:hover {
            color: #fb4226 !important;
        }
    }
`;
