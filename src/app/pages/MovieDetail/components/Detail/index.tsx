/**
 *
 * Detail
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { MovieDetailProps } from "../../slice/types";
import { Col, Row, Space } from "antd";
import moment from "moment";
import { media } from "styles/media";

interface Props {
    movieDetail: MovieDetailProps;
}

export const Detail = memo(({ movieDetail }: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper>
            <Row justify="center" gutter={[30, 10]}>
                <Col md={{ span: 12 }} xs={24}>
                    <Content>
                        <h3>Ngày công chiếu</h3>
                        <p>{moment(movieDetail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                    </Content>
                    <Content>
                        <h3>Đạo diễn</h3>
                        <p>Victor Vũ</p>
                    </Content>
                    <Content>
                        <h3>Diễn viên</h3>
                        <p>{moment(movieDetail.ngayKhoiChieu).format("DD-MM-YYYY")}</p>
                    </Content>
                    <Content>
                        <h3>Thể loại</h3>
                        <p>Kinh Dị, Giật Gân, Tâm Lý</p>
                    </Content>
                </Col>
                <ColStyle md={{ span: 12 }} xs={24}>
                    <Space direction="vertical">
                        <h3>Nội dung</h3>
                        <p>{movieDetail?.moTa}</p>
                    </Space>
                </ColStyle>
            </Row>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    h3 {
        color: #fff;
    }
    .ant-tabs-content-holder {
        background-color: #0a2029;
        color: #fff;
    }
`;

const Content = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 5px 0px;
    text-align: left;
`;

const ColStyle = styled(Col)`
    text-align: center;
    > div {
        text-align: left;
    }
    ${media.small`
    text-align: left;
    padding: 5px 20px;
    `}
`;
