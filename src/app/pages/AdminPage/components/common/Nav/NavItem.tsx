import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ROUTES } from "utils/constants/settings";

export interface Props {}

const NavItem: React.FC<Props> = () => {
    return (
        <>
            <Item>
                <Link to={ROUTES.DASHBOARD}>Dashboard</Link>
            </Item>
            <Item>
                <Link to={ROUTES.USERMANAGEMENT}>UserManagement</Link>
            </Item>
            <Item>
                <Link to={ROUTES.MOVIEMANAGEMENT}>Movies</Link>
            </Item>
        </>
    );
};

const Item = styled.li`
    padding-left: 1rem;
    padding-right: 1rem;
`;

export default NavItem;
