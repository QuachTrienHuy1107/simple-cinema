/**
 *
 * ModalShow
 *
 */
import { Modal, ModalProps } from "antd";
import React, { memo, ReactNode } from "react";
import styled from "styled-components/macro";

interface Props {
    children: ReactNode;
    open: boolean;
    onOpen: (visible: boolean) => void;
    onCancle: (visible: boolean) => void;
}

export const ModalShow = memo(({ open, onOpen, onCancle, children, ...rest }: Props) => {
    return (
        <Wrapper
            {...rest}
            visible={open}
            onOk={() => onOpen(open)}
            onCancel={() => onCancle(open)}
            centered
            footer={<div style={{ padding: 0 }}></div>}
            width={520}
            style={{ padding: 0, border: "none" }}
            closable={false}
        >
            {children}
        </Wrapper>
    );
});

const Wrapper = styled(Modal)`
    .ant-modal-body {
        position: relative;
        padding: 0;

        > iframe {
            position: absolute;
            width: 700px;

            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
    .ant-modal-footer {
        padding: 0;
    }
`;
