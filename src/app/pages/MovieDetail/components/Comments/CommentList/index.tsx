/**
 *
 * CommentList
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { CommentItem } from "./CommentItem";

interface Props {
    commentList: any;
}

export const CommentList = memo(({ commentList }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    console.log("commentList", commentList);

    return (
        <Wrapper>
            {commentList.danhSachBinhLuan?.map((item: any) => {
                return <CommentItem binhLuan={item} />;
            })}
        </Wrapper>
    );
});

const Wrapper = styled.div``;
