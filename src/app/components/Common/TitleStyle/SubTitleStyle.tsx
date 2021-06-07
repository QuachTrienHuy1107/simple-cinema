import React from "react";
import styled from "styled-components";

export interface SubTitleStyleProps {}

const SubTitleStyle: React.FC<SubTitleStyleProps> = ({ children }) => {
    return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.p`
    font-size: 0.8rem;
    padding: 0 5px 0 0;
    color: #4a4a4a;
    line-height: 19px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 55px;
    margin-bottom: 15px;
`;

export default SubTitleStyle;
