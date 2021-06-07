import { Table } from "antd";
import { TheaterInfo, Movie } from "app/pages/MovieDetail/slice/types";
import React, { memo } from "react";

export interface Props {
    movieDetail: Movie;
}

const CinemaDetail: React.FC<Props> = memo(({ movieDetail }) => {
    const [data, setData] = React.useState<null>(null) as any;

    React.useEffect(() => {
        const arr = [] as any;
        movieDetail.heThongRapChieu?.forEach((element, index, array) => {
            const data = { ...element, key: index };
            arr.push(data);
        });

        setData(arr);
    }, [movieDetail]);

    const expandedRowRender = (record: any) => {
        const column = [
            { title: "Mã cụm rạp", dataIndex: "maCumRap", key: "maCumRap" },
            { title: "Hình ảnh", dataIndex: "hinhAnh", key: "hinhAnh" },
            { title: "Tên rạp", dataIndex: "tenCumRap", key: "tenCumRap" },
        ];
        return <Table columns={column} dataSource={record.cumRapChieu} pagination={false} />;
    };

    const columns = [
        {
            title: "Logo",
            dataIndex: "logo",
            key: "logo",
            render: (text: string) => <img src={text} alt="" width={40} />,
            width: "30%",
        },
        {
            title: "Mã hệ thống rạp",
            dataIndex: "maHeThongRap",
            key: "maHeThongRap",
            width: "30%",
        },
        {
            title: "Tên hệ thống rạp",
            dataIndex: "tenHeThongRap",
            key: "tenHeThongRap",
        },
    ];

    return (
        <Table
            className="components-table-demo-nested"
            dataSource={data}
            expandable={{ expandedRowRender }}
            columns={columns}
            // rowSelection={{ ...rowSelection }}
        ></Table>
    );
});

export default CinemaDetail;
