/**
 *
 * Loading
 *
 */
import * as React from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Space, Spin } from "antd";
import loading from "./assets/loading.gif";

interface Props {}

export function Loading(props: Props) {
    const { t, i18n } = useTranslation();

    return (
        <div
            style={{
                position: "fixed",
                width: "100%",
                height: "100%",
                top: 0,
                left: 0,
                zIndex: 100,
            }}
        >
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "#F5F3ED",
                }}
            >
                <span className="display-4 text-white">
                    <Space size="middle">
                        <img src={loading} alt="loading" />
                        {/* <Spin style={{ width: 200 }} size="large" /> */}
                    </Space>
                </span>
            </div>
        </div>
    );
}

const Div = styled.div``;
