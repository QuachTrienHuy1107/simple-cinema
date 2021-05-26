import { Table } from "antd";
import React from "react";

export interface Props {
    movieDetail: any;
}

const CinemaDetail: React.FC<Props> = ({ movieDetail }) => {
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
        /* {
            title: "Mã hệ thống rạp",
            dataIndex: "maHeThongRap",
            key: "maHeThongRap",
            width: "30%",
        }, */
        {
            title: "Tên hệ thống rạp",
            dataIndex: "tenHeThongRap",
            key: "tenHeThongRap",
        },
    ];

    return (
        <Table
            className="components-table-demo-nested"
            dataSource={movieDetail?.heThongRapChieu}
            expandable={{ expandedRowRender }}
            columns={columns}
            // rowSelection={{ ...rowSelection }}
        ></Table>
    );
};

export default CinemaDetail;
