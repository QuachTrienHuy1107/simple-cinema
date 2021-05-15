import React from "react";
import styled from "styled-components/macro";
import { BadgeItem } from "./BadgeItem";

export function BadgeList() {
    return (
        <Wrapper>
            <BadgeItem />
        </Wrapper>
    );
}

const Wrapper = styled.ul`
    padding-right: 20px;
    margin-bottom: 0;
    padding-left: 0;

    @media screen and (max-width: 480px) {
        padding-right: 0;
    }
`;
