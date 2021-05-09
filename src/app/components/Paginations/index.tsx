/**
 *
 * Paginations
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Pagination } from "antd";

interface IPaginateProps {
    totalPage: number;
    isLoading: boolean;
    handlePageChange: (page: number) => void;
    defaultPageSize: number;
}

export const Paginations = memo(
    ({ totalPage, isLoading, handlePageChange, defaultPageSize }: IPaginateProps) => {
        return (
            <Div>
                <Pagination
                    total={totalPage}
                    onChange={pages => {
                        handlePageChange(pages);
                    }}
                    disabled={isLoading}
                    responsive
                    defaultPageSize={defaultPageSize}
                    showTitle={false}
                    showSizeChanger={false}
                />
            </Div>
        );
    },
);

const Div = styled.div``;
