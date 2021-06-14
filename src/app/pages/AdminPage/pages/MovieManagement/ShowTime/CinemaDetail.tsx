import { Table } from "antd";
import { Movie, MovieInfo, MovieShowtime } from "app/pages/MovieDetail/slice/types";
import { useGetMovieDetail } from "hooks/useGetMovieDetail";
import moment from "moment";
import React, { memo } from "react";

export interface Props {
    movieDetail: Movie;
}

const CinemaDetail: React.FC<Props> = memo(({ movieDetail }) => {
    const [data, setData] = React.useState<null>(null) as any;
    const { isLoading } = useGetMovieDetail();

    React.useEffect(() => {
        const arr = [] as any;
        movieDetail.heThongRapChieu?.forEach((element, index, fakeArr) => {
            element.cumRapChieu?.forEach((item: MovieInfo) => {
                return item.lichChieuPhim.map((movie: MovieShowtime) => {
                    const dataa = {
                        key: movie.maLichChieu,
                        maLichChieu: movie.maLichChieu,
                        logo: element.logo,
                        tenCumRap: item.tenCumRap,
                        tenRap: movie.tenRap,
                        ngayChieuGioChieu: movie.ngayChieuGioChieu,
                        giaVe: movie.giaVe,
                    };
                    arr.push(dataa);
                });
            });
        });
        setData(arr);
    }, [movieDetail]);

    const columns = [
        {
            title: "Mã lịch chiếu",
            dataIndex: "maLichChieu",
            key: "maLichChieu",
            width: "10%",
        },
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (text: string) => <img src={text} alt="" width={40} />,
            width: "15%",
        },
        {
            title: "Tên cụm rạp",
            dataIndex: "tenCumRap",
            key: "tenCumRap",
            width: "25%",
        },
        {
            title: "Tên rạp",
            dataIndex: "tenRap",
            key: "tenRap",
        },
        {
            title: "Ngày giờ chiếu",
            dataIndex: "ngayChieuGioChieu",
            key: "ngayChieuGioChieu",

            sorter: (a: MovieShowtime, b: MovieShowtime) => {
                const formatA = a.ngayChieuGioChieu.toUpperCase() as any;
                const formatB = b.ngayChieuGioChieu.toUpperCase() as any;
                if (formatA < formatB) {
                    return -1;
                }
                if (formatA > formatB) {
                    return 1;
                }
                return 0;
            },
            render: (text: Date) => (
                <span>
                    {moment(text).format("DD-MM-YYYY")} - {moment(text).format("HH:MM A")}
                </span>
            ),
        },
        {
            title: "Giá vé",
            dataIndex: "giaVe",
            key: "giaVe",
            render: (text: number) => <span>{text.toLocaleString()}</span>,
        },
    ];

    return (
        <Table
            className="components-table-demo-nested"
            dataSource={data}
            pagination={false}
            // expandable={{ expandedRowRender }}
            columns={columns}
            loading={isLoading}
            // rowSelection={{ ...rowSelection }}
        ></Table>
    );
});

export default CinemaDetail;
