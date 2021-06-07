/**
 *
 * CreateMovie
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Buttons } from "app/components/Common/Buttons";
import { Drawer } from "antd";
import { MovieForm } from "app/pages/AdminPage/pages/MovieManagement/MovieForm";

interface Props {}

export const CreateMovie = memo((props: Props) => {
    const { t, i18n } = useTranslation();
    const [edit, setEdit] = React.useState(false);

    return (
        <Wrapper>
            <MovieForm edit={false} />
        </Wrapper>
    );
});

const Wrapper = styled.div``;
