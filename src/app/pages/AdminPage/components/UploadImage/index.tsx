/**
 *
 * UploadImage
 *
 */
import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import React, { memo, RefObject } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components/macro";
import { useUpload } from "../../hooks/useUpload";

interface Props {}

export const UploadImage = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();
    const fileRef = React.useRef(null) as RefObject<HTMLInputElement | any>;

    const { imgPreview, loading, handleFileChange } = useUpload();

    const handleUpload = () => {
        console.log("111", fileRef.current.focus()?.click());
        fileRef.current.focus()?.click();
    };

    return (
        <Wrapper>
            {imgPreview ? (
                <Card
                    hoverable
                    style={{ width: 240 }}
                    cover={<img alt="example" src={imgPreview} />}
                />
            ) : (
                <Form.Item>
                    <Button
                        loading={loading}
                        icon={<UploadOutlined />}
                        onClick={() => handleUpload()}
                    >
                        Click to Upload
                    </Button>
                </Form.Item>
            )}

            <Input
                ref={fileRef}
                type="file"
                // style={{ display: "none" }}
                onChange={handleFileChange}
            />
        </Wrapper>
    );
});

const Wrapper = styled.div`
    border: 1px solid black;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 10px;
    height: 500px;
    padding: 20px;
`;
