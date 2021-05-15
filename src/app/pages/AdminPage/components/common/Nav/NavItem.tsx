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

    a {
        color: rgba(0, 0, 21, 0.5);
    }

    a:hover {
        color: rgba(0, 0, 21, 0.7);
    }
`;

export default NavItem;
