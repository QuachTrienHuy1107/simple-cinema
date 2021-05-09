import { PaginationRequestType } from "app/pages/HomePage/slice/types";
import React from "react";

export default function usePagination(_page: number, _limit: number): any {
    const [resPagination, setPagination] = React.useState<PaginationRequestType>({
        soTrang: _page,
        maNhom: "GP01",
        soPhanTuTrenTrang: _limit,
    });

    const handlePageChange = (currentPage: number) => {
        setPagination({ ...resPagination, soTrang: currentPage });
    };

    return { resPagination, handlePageChange };
}
