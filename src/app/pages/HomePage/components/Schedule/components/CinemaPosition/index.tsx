/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * CinemaPosition
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Modal } from "antd";
import { ModalShow } from "app/components/ModalShow";

interface Props {}

export const CinemaPosition = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const [open, setOpen] = React.useState(false);

    const handleOk = () => {
        setOpen(!open);
    };

    const handleCancle = () => {
        setOpen(!open);
    };

    return (
        <Wrapper>
            <a onClick={() => setOpen(true)} style={{ marginBottom: 0, display: "inline-block" }}>
                Địa chỉ
            </a>
            <ModalShow open={open} onOpen={handleOk} onCancle={handleCancle}>
                <iframe
                    title="123"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.516175095571!2d106.70230491477143!3d10.771721892324727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fae3ea605ab%3A0x2afaf7f3826e5c42!2sBHD%20Star%20Cineplex!5e0!3m2!1svi!2s!4v1623169068723!5m2!1svi!2s"
                    width="600"
                    height="450"
                    className="video"
                    allowFullScreen={true}
                    loading="lazy"
                ></iframe>
            </ModalShow>
        </Wrapper>
    );
});

const Wrapper = styled.div``;

const ModalStyle = styled(Modal)`
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
