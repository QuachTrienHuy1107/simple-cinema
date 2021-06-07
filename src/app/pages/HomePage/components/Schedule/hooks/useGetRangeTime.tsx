import moment from "moment";
import React from "react";
import { TimerProps } from "../types";

interface RangeTimeProps {
    timeStart: string;
    timeEnd: string;
    timeId: number;
}

export const useGetRangeTime = () => {
    const getRangeTime = (movie: TimerProps[]) => {
        const rangeTime = [] as Array<RangeTimeProps>;
        const newTime = movie.slice(0, 5).map((item: TimerProps) => {
            const data = {
                timePlay: moment(item.ngayChieuGioChieu).format("HH:MM A"),
                timeId: item.maLichChieu,
            };
            return data;
        });

        for (let key in newTime) {
            let newKey = +key + 1;

            const time1 = newTime[key].timePlay;
            const lastTime = time1.split(":");

            const time2 =
                newTime[newKey] !== undefined
                    ? newTime[newKey].timePlay
                    : `0${+lastTime[0] + 2}`.slice(-2) + ":" + lastTime[1];
            const timeId = +newTime[key].timeId;

            rangeTime.push({
                timeStart: time1,
                timeEnd: time2,
                timeId,
            });
        }

        return rangeTime;
    };

    return { getRangeTime };
};
