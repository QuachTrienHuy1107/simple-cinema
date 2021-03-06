/**
 *
 * MovieForm
 *
 */
import { EditOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { Buttons } from "app/components/Common/Buttons";
import { MovieResponse } from "app/pages/HomePage/slice/types";
import * as React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { MovieFormAdmin } from "./MovieFormAdmin";

interface IMovieFormProps {
    record?: MovieResponse;
    edit?: boolean;
}

export const MovieForm = React.memo(({ record, edit }: IMovieFormProps) => {
    const { t, i18n } = useTranslation();
    const [visible, setVisible] = React.useState(false);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };

    return (
        <Wrapper>
            {edit ? (
                <Buttons
                    onClick={showDrawer}
                    className="icon-button"
                    shape="circle"
                    icon={<EditOutlined />}
                />
            ) : (
                <Buttons onClick={showDrawer} className="icon-button" size="large">
                    Create
                </Buttons>
            )}

            <Drawer
                title={edit ? "Edit" : "Create"}
                width={720}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
            >
                <MovieFormAdmin movieDetail={record} isEdit={edit} onClose={onClose} />
            </Drawer>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    .ant-tabs-content-holder,
    .ant-tabs-nav {
        background-color: #151f30;
        padding: 20px 40px;
        border-radius: 16px;
        margin-bottom: 30px;
        border-bottom: none;

        &::before {
            border: none;
        }
    }
`;

const BodyContent = styled.div`
    border-radius: 16px;
    margin-bottom: 30px;
    border-bottom: none;

    &::before {
        border: none;
    }
`;
