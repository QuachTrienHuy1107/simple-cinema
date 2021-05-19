/**
 *
 * MovieForm
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Button, Card, Col, Form, Input, Row, Skeleton, Spin, Tabs } from "antd";
import { formItemLayout } from "utils/helpers";
import { InputStyled } from "app/components/Common/InputStyled";
import { Buttons } from "app/components/Common/Buttons";
import { useDispatch, useSelector } from "react-redux";
import { useMovieManagementSlice } from "../slice";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import { useHomeSlice } from "app/pages/HomePage/slice";
import { UploadImage } from "app/pages/AdminPage/components/UploadImage";
import { useAddEdit } from "app/pages/AdminPage/hooks/useAddEdit";
import { useUpload } from "app/pages/AdminPage/hooks/useUpload";
import { UploadOutlined } from "@ant-design/icons";
import { selectHome } from "app/pages/HomePage/slice/selectors";
import { Loading } from "app/components/Common/Loading";
import { ActionType } from "utils/constants/settings";
import { MovieFormAdmin } from "./MovieFormAdmin";

interface Props {}

const { Meta } = Card;
const { TabPane } = Tabs;

export function MovieForm(props: Props) {
    const { t, i18n } = useTranslation();

    const OperationsSlot = {
        right: (
            <Form.Item>
                <Button>Go back</Button>
            </Form.Item>
        ),
    };

    return (
        <Wrapper>
            <Tabs defaultActiveKey="1" tabBarExtraContent={OperationsSlot}>
                <TabPane tab="Movie form" key="form">
                    <BodyContent>
                        <MovieFormAdmin />
                    </BodyContent>
                </TabPane>
                <TabPane tab="Movie detail" key="detail"></TabPane>
                <TabPane tab="Review" key="review">
                    Content of Tab Pane 3
                </TabPane>
                <div className="userDetail__tabItem" />
            </Tabs>
        </Wrapper>
    );
}

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
    background-color: #151f30;
    border-radius: 16px;
    margin-bottom: 30px;
    border-bottom: none;

    &::before {
        border: none;
    }
`;
