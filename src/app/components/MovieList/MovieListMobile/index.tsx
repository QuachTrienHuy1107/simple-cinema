/**
 *
 * MovieListMobile
 *
 */
import { Button, List, Tabs } from "antd";
import { PaginationResponseType } from "app/components/Paginations/types";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { HomeState, MovieResponse } from "app/pages/HomePage/slice/types";
import { useGetDate } from "hooks/useGetDate";
import usePagination from "hooks/usePagination";
import React, { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components/macro";
import { ROUTES } from "utils/constants/settings";

interface Props {
    movieWithDate: MovieResponse[];
    moviePagination: PaginationResponseType;
}

const { TabPane } = Tabs;

const moviePerPage = 3;
let arrayForHoldingPosts = [] as any;

export const MovieListMobile = memo(({ movieWithDate, moviePagination }: Props) => {
    const [next, setNext] = React.useState(3);
    const [movielist, setMovieList] = React.useState([]) as any;
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (movieWithDate.length !== 0) {
            const data = [...movieWithDate];
            setMovieList(prev => [...prev, ...data]);
        }
    }, []);

    const loopWithSlice = React.useCallback((start, end) => {
        const slicedPosts = movieWithDate.slice(start, end);
        arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
        setMovieList(arrayForHoldingPosts);
    }, []);

    React.useEffect(() => {
        loopWithSlice(0, next);
    }, []);

    const handleLoadMore = async () => {
        setLoading(true);
        await setTimeout(() => {
            // loopWithSlice(next, next + moviePerPage);
            setNext(next + moviePerPage);
            setLoading(false);
        }, 1500);
    };

    const loadMore = (
        <div style={{ textAlign: "center" }}>
            <Button
                onClick={handleLoadMore}
                disabled={movielist.length === movieWithDate.length || loading}
            >
                Xem thêm
            </Button>
        </div>
    );

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" animated type="card" centered>
                <TabPane tab="Đang chiếu" key="1">
                    <List
                        style={{ padding: "20px 10px 0" }}
                        itemLayout="horizontal"
                        dataSource={movieWithDate.slice(0, next)}
                        loadMore={loadMore}
                        loading={loading}
                        renderItem={(item: any, index: number) => {
                            return (
                                <List.Item key={index}>
                                    <Link
                                        to={{
                                            pathname: `${ROUTES.MOVIEDETAIL}/${item.maPhim}`,
                                            state: { isComming: false },
                                        }}
                                        style={{ width: "100%" }}
                                    >
                                        <img
                                            src={item.hinhAnh}
                                            alt={item.tenPhim}
                                            style={{ width: "100%", height: 250 }}
                                        />
                                    </Link>
                                </List.Item>
                            );
                        }}
                    />
                </TabPane>
                <TabPane tab="Sắp chiếu" key="2">
                    <List
                        style={{ padding: "20px 10px 0" }}
                        itemLayout="horizontal"
                        dataSource={moviePagination.items}
                        /*       loading={isLoading} */
                        renderItem={(item: any, index: number) => {
                            return (
                                <List.Item key={index}>
                                    <Link
                                        to={{
                                            pathname: `${ROUTES.MOVIEDETAIL}/${item.maPhim}`,
                                            state: { isComming: true },
                                        }}
                                        style={{ width: "100%" }}
                                    >
                                        <img
                                            src={item.hinhAnh}
                                            alt={item.tenPhim}
                                            style={{ width: "100%", height: 250 }}
                                        />
                                    </Link>
                                </List.Item>
                            );
                        }}
                    />
                </TabPane>
            </Tabs>
        </Wrapper>
    );
});

const Wrapper = styled.div``;
