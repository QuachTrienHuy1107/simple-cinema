/**
 *
 * Operations
 *
 */
import { Col, Row } from "antd";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { CreateMovie } from "./components/CreateMovie";
import { SearchForm } from "./components/SearchForm";

interface Props {}

export const Operations: React.FC = memo((props: Props) => {
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Row justify="space-between" align="middle" gutter={[16, 20]}>
                <Col flex="auto">
                    <SearchForm />
                </Col>
                <Col style={{ textAlign: "right" }} flex="100px">
                    <CreateMovie />
                </Col>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    color: #000;
    margin: 10px 0 40px;
`;
