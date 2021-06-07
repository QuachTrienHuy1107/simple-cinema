/**
 *
 * TimePlay
 *
 */
import React, { memo, useRef } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { MovieProps, TimerProps } from "../types";
import moment from "moment";
import { useHistory } from "react-router";
import { ROUTES } from "utils/constants/settings";
import { useGetRangeTime } from "../hooks/useGetRangeTime";
import { MovieShowtime } from "app/pages/MovieDetail/slice/types";

interface Props {
    movie: TimerProps[] | MovieShowtime[];
}

interface RangeTimeProps {
    timeStart: string;
    timeEnd: string;
    timeId: number;
}

export const TimePlay = memo(({ movie }: Props) => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const arrTime = [] as String[];
    const { getRangeTime } = useGetRangeTime();

    const rangeTime = getRangeTime(movie);

    console.log("rangeTime", rangeTime);

    console.log("movie", movie);

    return (
        <Wrapper>
            <Timer>
                {rangeTime.map((time: RangeTimeProps) => (
                    <span
                        className="schedule__right--timer"
                        key={time.timeId}
                        onClick={() => {
                            history.push(`${ROUTES.CHECKOUT}/${time.timeId}`);
                        }}
                    >
                        <span className="timeStart">{`${time.timeStart}`}</span>
                        <span>{" ~ "}</span>
                        <span className="timeEnd">{`${time.timeEnd}`}</span>
                    </span>
                ))}
            </Timer>
        </Wrapper>
    );
});

const Wrapper = styled.div``;

const Timer = styled.div`
    display: flex;
    flex-wrap: wrap;
    > span {
        background-color: #ebebeb;
        border-radius: 5px;
        background-size: cover;

        padding: 8px 10px;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;

        @media screen and (max-width: 576px) {
            font-size: $text6;
        }

        .timeStart {
            font-size: 1.1rem;
            color: #06c406;
            font-weight: 700;
            letter-spacing: 1.5px;
            transition: all 0.4s;
        }
        .timeEnd {
            font-size: 0.9rem;
            color: #484747;
        }

        &:hover {
            .timeStart {
                color: #0a610a;
            }
        }
    }
`;
