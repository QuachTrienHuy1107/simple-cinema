import styled from "styled-components";

export const Nav = styled.ul`
    display: flex;
    -ms-flex-direction: row;
    flex-direction: row;
    -ms-flex-align: center;
    align-items: center;
    min-height: 56px;
    padding: 0;
    margin-bottom: 0;
    list-style: none;

    @media (max-width: 768px) {
        display: none;
    } ;
`;
