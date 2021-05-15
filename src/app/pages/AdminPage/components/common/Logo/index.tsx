import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { ROUTES } from "utils/constants/settings";
import img from "../../../../../assets/logo.png";
export function Logo() {
    return (
        <Wrapper>
            <Link to={ROUTES.DASHBOARD}>
                <img
                    src="http://pixner.net/boleto/demo/assets/images/logo/logo.png"
                    alt=""
                    width="100%"
                />
            </Link>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    height: 29px;
    margin: 16px;
`;
