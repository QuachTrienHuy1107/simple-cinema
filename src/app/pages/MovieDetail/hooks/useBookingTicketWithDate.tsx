import { useGetDate } from "hooks/useGetDate";
import moment from "moment";
import React from "react";

export const useBookingTicketWithDate = (dateStart: any) => {
    const { today, calculateDateFuture, getRangeDate } = useGetDate();
    const [arrayDate, setArrayDate] = React.useState<Date[]>([]);

    React.useEffect(() => {
        const getTicketWithDate = () => {
            const dateStartFormat = moment(dateStart).format("DD-MM-YYYY");
            const dateEndFormat = calculateDateFuture(dateStart);

            const dateEnd = dateEndFormat.split("/");
            const reFormatDateEnd = `${dateEnd[2]}-${dateEnd[1]}-${dateEnd[0]}`;

            const dateTimeStart = moment(dateStart).format();
            const dateTimeEnd = moment(reFormatDateEnd).format();

            const arrayDate = getRangeDate("2019-01-01T23:15:14", "2019-01-15T23:15:14");

            setArrayDate(arrayDate);
        };

        getTicketWithDate();
    }, [calculateDateFuture, dateStart, getRangeDate]);

    const checkDatePlay = (time: string) => {
        let result = false;
        arrayDate?.map((date: Date, index: number) => {
            const formatDate = moment(date).format("DD-MM-YYYY");

            const reFormatDate = formatDate.split("-");
            const filterDateTime = `${reFormatDate[2]}-${reFormatDate[1]}-${reFormatDate[0]}`;
            if (time.includes(filterDateTime)) {
                result = true;
            }
        });
        return  result ;
    };

    return { arrayDate, checkDatePlay };
};
