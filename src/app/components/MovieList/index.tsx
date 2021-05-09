/**
 *
 * MovieList
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { SearchForm } from "../SearchForm";
import { Col, Pagination, Row, Spin } from "antd";
import { MovieCard } from "./MovieCard";
import usePagination from "hooks/usePagination";
import { useDispatch, useSelector } from "react-redux";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { Paginations } from "../Paginations";

interface Props {}

export const MovieList = memo((props: Props) => {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();
    const { resPagination, handlePageChange } = usePagination(1, 12);
    const { actions } = useHomeSlice();

    const { moviePagination, isLoading } = useSelector(selectHome);

    React.useEffect(() => {
        dispatch(actions.getPaginateMoviesAction(resPagination));
    }, [resPagination]);

    console.log("moviePagination", moviePagination);

    return (
        <Div>
            <SearchForm />
            <Row justify="center" gutter={[24, 24]}>
                {isLoading ? (
                    <Spin />
                ) : (
                    moviePagination.items?.map((movie: any) => (
                        <Col lg={4} md={6} sm={12} xs={24} key={movie.maPhim}>
                            <MovieCard movie={movie} />
                        </Col>
                    ))
                )}
                <Col span={24} style={{ textAlign: "center" }}>
                    <Paginations
                        totalPage={moviePagination.totalCount}
                        isLoading={isLoading}
                        handlePageChange={handlePageChange}
                        defaultPageSize={resPagination.soPhanTuTrenTrang}
                    />
                </Col>
            </Row>
        </Div>
    );
});

const Div = styled.div`
    margin: 50px 0;
`;
