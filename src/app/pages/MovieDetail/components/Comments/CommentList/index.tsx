/**
 *
 * CommentList
 *
 */
import { LoadingOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { CommentItem } from "./CommentItem";

interface Props {
    commentList: any;
}

const cmtPerPage = 2;
let arrayForHoldingPosts = [] as any;

export const CommentList = memo(({ commentList }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [next, setNext] = React.useState(3);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [allComments, setAllComments] = React.useState([]) as any;

    React.useEffect(() => {
        if (Object.keys(commentList).length !== 0) {
            const data = { ...commentList };
            const { danhSachBinhLuan } = data;
            const newArr = [...danhSachBinhLuan];
            setAllComments(newArr.reverse());
        }
    }, [commentList]);

    const handleScroll = async (e: React.UIEvent<HTMLElement>) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        const getNextList = Math.round(scrollHeight - scrollTop);

        if (getNextList === clientHeight) {
            setLoading(true);
            await setTimeout(() => {
                setNext(prev => prev + cmtPerPage);
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <Wrapper
            onScroll={handleScroll}
            style={{ overflowY: allComments.length <= 3 ? "hidden" : "scroll" }}
        >
            {allComments.slice(0, next)?.map((item: any) => {
                return <CommentItem binhLuan={item} key={item.id} />;
            })}
            {loading && (
                <LoadingStyle>
                    <LoadingOutlined />
                </LoadingStyle>
            )}
        </Wrapper>
    );
});

const Wrapper = styled.div`
    max-height: 1000px;
    height: 500px;
    margin-top: 20px;
`;

const LoadingStyle = styled.div`
    background-color: rgba(254, 254, 254, 90%);
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    z-index: 100;
    left: 0;
    box-shadow: inset 3px -4px 11px 6px rgba(241, 241, 241, 50%);
    text-align: center;
    color: #ababab;
    font-size: 1.3rem;
`;
