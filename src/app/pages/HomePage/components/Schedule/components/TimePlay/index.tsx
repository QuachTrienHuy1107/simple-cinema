/**
 *
 * TimePlay
 *
 */
import { MovieShowtime } from "app/pages/MovieDetail/slice/types";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";
import styled from "styled-components/macro";
import { ROUTES } from "utils/constants/settings";
import { useGetRangeTime } from "../../hooks/useGetRangeTime";
import { TimerProps } from "../../types";

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
    const { getRangeTime } = useGetRangeTime();

    const rangeTime = getRangeTime(movie);

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
        background-color: #f6f6f6;
        border-radius: 5px;
        background-size: cover;

        padding: 8px 10px;
        margin-right: 10px;
        margin-top: 10px;
        cursor: pointer;

        @media screen and (max-width: 576px) {
            font-size: 0.8rem;
        }

        @media screen and (max-width: 460px) {
            width: 80%;
            margin: 10px auto;
            text-align: center;
        }

        @media screen and (max-width: 300px) {
            width: 100%;
        }

        .timeStart {
            font-size: 1.1rem;
            color: #108f3e;
            font-weight: 700;
            letter-spacing: 1.5px;
            transition: all 0.4s;
        }
        .timeEnd {
            font-size: 0.9rem;
            color: #9b9b9b;
        }

        &:hover {
            .timeStart {
                color: #013501;
            }
        }
    }

    @media screen and (max-width: 576px) {
        /*   justify-content: space-between;
        align-items: center; */
    }
`;
