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
    handlePageChange: (page: any) => void;
    movieWithDate: MovieResponse[];
    isLoading: boolean;
    moviePagination: PaginationResponseType;
}

const data = [
    {
        maPhim: 1314,
        tenPhim: "Rasing Hope",
        biDanh: "rasing-hope",
        trailer: "https://youtube.com/embed/7V7SBjaQQ4g",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/rasing-hope_gp01.png",
        moTa: "phim hay quá trời",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-06-01T12:28:17.677",
        danhGia: 10,
    },
    {
        maPhim: 1344,
        tenPhim: "Avenger",
        biDanh: "avenger",
        trailer: "https://youtu.be/TcMBFSGVi1c",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/avenger_gp01.jpg",
        moTa:
            "Giám Mục Bóng Tối (Woo Do Hwan) – tên quỷ Satan đột lốt người. Từ đó sự thật về cái chết của cha Yong Hu cũng dần được hé lộ cũng như nguyên nhân anh trở thành “người được chọn”.",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-27T00:00:00",
        danhGia: 10,
    },
    {
        maPhim: 1374,
        tenPhim: "Natra Two 3",
        biDanh: "natra-two-3",
        trailer: "https://youtu.be/nmBrP8wWxxU",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/natra-two-3_gp01.jpeg",
        moTa: "ababababababab",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-13T00:00:00",
        danhGia: 2,
    },
    {
        maPhim: 4332,
        tenPhim: "Narutooô",
        biDanh: "narutooo",
        trailer: "https://www.youtube.com/embed/leshlejZaAE",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/narutooo_gp01.jpg",
        moTa: "ICD quán quân không nói nhiều",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-21T00:00:00",
        danhGia: 22,
    },
    {
        maPhim: 6098,
        tenPhim: " Bố Giá Victor 3",
        biDanh: "bo-gia-victor-3",
        trailer: "https://www.youtube.com/embed/WCCp0zbnR50",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/bo-gia-victor-3_gp01.jpg",
        moTa:
            "Phim sẽ xoay quanh lối sống thường nhật của một xóm lao động nghèo, ở đó có bộ tứ anh em Giàu - Sang - Phú - Quý với Ba Sang sẽ là nhân vật chính, hay lo chuyện bao đồng nhưng vô cùng thương con cái. Câu chuyện phim tập trung về hai cha con Ba Sang (Trấn Thành) và Quắn (Tuấn Trần). Dù yêu thương nhau nhưng khoảng cách thế hệ đã đem đến những bất đồng lớn giữa hai cha con. Liệu cả hai có thể cho nhau cơ hội thấu hiểu đối phương, thu hẹp khoảng cách và tạo nên hạnh phúc từ sự khác biệt?",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-18T00:00:00",
        danhGia: 6,
    },
    {
        maPhim: 6244,
        tenPhim: "phimxxxxxxxxxxxqq",
        biDanh: "phimxxxxxxxxxxxqq",
        trailer: "hhhhhhhhhhhhhh",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/phimxxxxxxxxxxx_gp01.jpg",
        moTa: "xxxxxxxxxxxxxxx",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-15T09:42:44.007",
        danhGia: 10,
    },
    {
        maPhim: 6245,
        tenPhim: "phimxxxxxxxxxxx",
        biDanh: "phimxxxxxxxxxxx",
        trailer: "hhhhhhhhhhhhhh",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/phimxxxxxxxxxxx_gp01.jpg",
        moTa: "xxxxxxxxxxxxxxx",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-15T00:00:00",
        danhGia: 7,
    },
    {
        maPhim: 6282,
        tenPhim: "123phimsssss",
        biDanh: "123phimsssss",
        trailer: "https://youtu.be/_6GO_UUrgko",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/123phimsssss_gp01.jpg",
        moTa: "111",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-27T00:00:00",
        danhGia: 10,
    },
    {
        maPhim: 6320,
        tenPhim: "Biển xanh siêu dơ",
        biDanh: "bien-xanh-sieu-do",
        trailer: "https://www.youtube.com/embed/pC5mGB5enkw",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/bien-xanh-sieu-do_gp01.png",
        moTa: "Biển xanh và cát trắng nơi chưa nỗi bình yên.",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-26T17:39:33.367",
        danhGia: 10,
    },
    {
        maPhim: 6378,
        tenPhim: "111111",
        biDanh: "111111",
        trailer: "zz",
        hinhAnh: "http://movie0706.cybersoft.edu.vn/hinhanh/111111_gp01.jpg",
        moTa: "zz",
        maNhom: "GP01",
        ngayKhoiChieu: "2021-05-24T00:00:00",
        danhGia: 10,
    },
];

const { TabPane } = Tabs;

const moviePerPage = 3;
let arrayForHoldingPosts = [] as any;

export const MovieListMobile = memo(
    ({ handlePageChange, movieWithDate, isLoading, moviePagination }: Props) => {
        /*     const { isLoading, movieWithDate } = useSelector(selectHome) as HomeState; */
        const dispatch = useDispatch();
        const { actions } = useHomeSlice();
        const { today, dateBefore } = useGetDate();
        const [next, setNext] = React.useState(0);
        const [movielist, setMovieList] = React.useState(movieWithDate.slice(0, 3));

        const loopWithSlice = React.useCallback((start, end) => {
            const slicedPosts = movieWithDate.slice(start, end);
            arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];

            setMovieList(arrayForHoldingPosts);
        }, []);

        const handleLoadMore = () => {
            loopWithSlice(next, next + moviePerPage);
            setNext(next + moviePerPage);
        };

        const loadMore = (
            <div style={{ textAlign: "center" }}>
                <Button
                    onClick={handleLoadMore}
                    disabled={movielist.length === movieWithDate.length}
                >
                    Xem thêm
                </Button>
            </div>
        );

        /* React.useEffect(() => {
        const data = {
            ...resPagination,
            tuNgay: dateBefore,
            denNgay: today,
        };
        dispatch(actions.getMovieWithDate(data));

        return () => {
            dispatch(actions.clearData());
        };
    }, [dateBefore, today]); */

        // console.log("movieWithDate", movieWithDate);

        return (
            <Wrapper>
                <Tabs defaultActiveKey="1" animated type="card" centered>
                    <TabPane tab="Đang chiếu" key="1">
                        <List
                            style={{ padding: "20px 10px 0" }}
                            itemLayout="horizontal"
                            loadMore={loadMore}
                            dataSource={movielist}
                            /*       loading={isLoading} */
                            renderItem={(item: any, index: number) => {
                                return (
                                    <List.Item key={index}>
                                        <Link
                                            to={`${ROUTES.MOVIEDETAIL}/${item.maPhim}`}
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
                                            to={`${ROUTES.MOVIEDETAIL}/${item.maPhim}`}
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
    },
);

const Wrapper = styled.div``;
