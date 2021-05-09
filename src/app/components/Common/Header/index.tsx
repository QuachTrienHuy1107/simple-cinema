/**
 *
 * Header
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import logo from "./assets/logo.png";
import { NavList } from "../NavList";
import { Buttons } from "../Buttons";

interface Props {}

export function Header(props: Props) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t } = useTranslation();
    const [navBackground, setNavBackground] = React.useState<boolean>(false);
    const navRef = React.useRef<undefined | boolean>();
    navRef.current = navBackground;
    React.useEffect(() => {
        const handleScroll = () => {
            const show = window.scrollY > 50;
            if (navRef.current !== show) {
                setNavBackground(show);
            }
        };
        document.addEventListener("scroll", handleScroll);
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <Wrapper
            style={{
                backgroundColor: navBackground ? "#131720" : "transparent",
            }}
        >
            <Logo>
                <img src={logo} alt="" width={60} />
            </Logo>
            <NavList />
            <Buttons>{t(messages.btnLogin())}</Buttons>
        </Wrapper>
    );
}

const Wrapper = styled.header`
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 10px 0px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 1px 1px 1px 0 rgba(239, 239, 239, 0.14);
    transition: 0.6s ease;
`;

const Logo = styled.div``;
