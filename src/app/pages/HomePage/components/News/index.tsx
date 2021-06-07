/**
 *
 * News
 *
 */
import React, { memo } from "react";
import styled from "styled-components/macro";
import { useTranslation } from "react-i18next";
import { messages } from "./messages";
import { Col, Image, Row, Space, Tabs } from "antd";
import { Img } from "app/components/Common/Image";
import { TitleStyle } from "app/components/Common/TitleStyle";
import SubTitleStyle from "app/components/Common/TitleStyle/SubTitleStyle";
import { media } from "styles/media";
import { ANCHOR } from "utils/constants/settings";

interface Props {}

const { TabPane } = Tabs;

export const News = memo((props: Props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { t, i18n } = useTranslation();

    return (
        <Wrapper id={ANCHOR.NEWSTO}>
            <Tabs defaultActiveKey="1" type="card" centered>
                <TabPane tab="Điện ảnh" key="1">
                    <Row gutter={[20, 30]}>
                        <Col md={12} sm={24}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2021/03/an-dinh-chac-nich-ngay-khoi-chieu-16-04-ly-hai-tung-clip-lat-mat-48h-dam-chat-fast-furious-mien-song-nuoc-16170881088272.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật
                                    Mặt: 48H đậm chất{" "}
                                </TitleStyle>
                                <SubTitleStyle>
                                    Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt
                                    đuổi gay cấn thót tim fans hâm mộ
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={12} sm={24}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2021/03/mortal-kombat-cuoc-chien-sinh-tu-goi-ten-nhung-phim-dien-anh-noi-tieng-duoc-chuyen-the-tu-cac-tua-game-dinh-dam-16170160290762.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    [MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN
                                    ẢNH NỔI TIẾNG
                                </TitleStyle>
                                <SubTitleStyle>
                                    Bên cạnh những kịch bản gốc mới mẻ và đầy bất ngờ, Hollywood
                                    cũng không thiếu những tác phẩm đình đám được chuyển thể từ tiểu
                                    thuyết, phim hoạt hình, hay thậm chí là cả trò chơi điện tử.
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={9}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2021/03/promising-young-woman-bong-hong-nuoc-anh-carey-mulligan-va-man-tra-thu-dan-ong-de-doi-16166710855522.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn
                                    trả thù đàn ông để đời
                                </TitleStyle>
                                <SubTitleStyle>
                                    Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục
                                    nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của
                                    cô trong phim
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={9}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT
                                    QUỶ” ĐẢM BẢO ĐỐN TIM HỘI CHỊ EM
                                </TitleStyle>
                                <SubTitleStyle>
                                    Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng
                                    lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác
                                    phẩm kinh dị – hành động “Bàn Tay Diệt Quỷ” hứa hẹn sẽ làm cho
                                    hội chị em phải mê mẩn vào tháng tới.
                                </SubTitleStyle>
                            </Info>{" "}
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần
                                            công chiếu...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Reviews" key="2">
                    <Row gutter={[20, 30]}>
                        <Col md={12} sm={24}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2020/08/review-tan-tich-quy-am-relic-ba-the-he-va-moi-lien-ket-15965255784224.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật
                                    Mặt: 48H đậm chất{" "}
                                </TitleStyle>
                                <SubTitleStyle>
                                    Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt
                                    đuổi gay cấn thót tim fans hâm mộ
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={12} sm={24}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2020/06/blackkklansman-coc-nuoc-lanh-de-nguoi-my-thuc-tinh-15910862294165.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    [MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN
                                    ẢNH NỔI TIẾNG
                                </TitleStyle>
                                <SubTitleStyle>
                                    Bên cạnh những kịch bản gốc mới mẻ và đầy bất ngờ, Hollywood
                                    cũng không thiếu những tác phẩm đình đám được chuyển thể từ tiểu
                                    thuyết, phim hoạt hình, hay thậm chí là cả trò chơi điện tử.
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={9}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2020/08/review-dinh-thu-oan-khuat-ghost-of-war-15965120886610.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn
                                    trả thù đàn ông để đời
                                </TitleStyle>
                                <SubTitleStyle>
                                    Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục
                                    nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của
                                    cô trong phim
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={9}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2021/03/vua-dep-lai-vua-tai-nang-dan-sao-nam-cua-phim-ban-tay-diet-quy-dam-bao-don-tim-hoi-chi-em-16165783843676.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT
                                    QUỶ” ĐẢM BẢO ĐỐN TIM HỘI CHỊ EM
                                </TitleStyle>
                                <SubTitleStyle>
                                    Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng
                                    lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác
                                    phẩm kinh dị – hành động “Bàn Tay Diệt Quỷ” hứa hẹn sẽ làm cho
                                    hội chị em phải mê mẩn vào tháng tới.
                                </SubTitleStyle>
                            </Info>{" "}
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/06/blackkklansman-coc-nuoc-lanh-de-nguoi-my-thuc-tinh-15910862294165.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/05/american-sniper-chinh-nghia-hay-phi-nghia-15905660338111.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần
                                            công chiếu...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tab="Khuyến mãi" key="3">
                    <Row gutter={[20, 30]}>
                        <Col md={12} sm={24}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2021/04/bhd-59k-ve-ca-tuan-16190002421777.jpg"
                                    alt=""
                                />
                                <TitleStyle>
                                    Ấn định chắc nịch ngày khởi chiếu 16.04, Lý Hải tung clip Lật
                                    Mặt: 48H đậm chất{" "}
                                </TitleStyle>
                                <SubTitleStyle>
                                    Trước thềm khởi chiếu 16.04 này, Lý Hải bất ngờ tung clip rượt
                                    đuổi gay cấn thót tim fans hâm mộ
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={12} sm={24}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2020/11/tix-1k-ve-ngai-chi-gia-ve-16045662877511.jpg"
                                    alt=""
                                />
                                <TitleStyle>
                                    [MORTAL KOMBAT: CUỘC CHIẾN SINH TỬ] - GỌI TÊN NHỮNG PHIM ĐIỆN
                                    ẢNH NỔI TIẾNG
                                </TitleStyle>
                                <SubTitleStyle>
                                    Bên cạnh những kịch bản gốc mới mẻ và đầy bất ngờ, Hollywood
                                    cũng không thiếu những tác phẩm đình đám được chuyển thể từ tiểu
                                    thuyết, phim hoạt hình, hay thậm chí là cả trò chơi điện tử.
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={9}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2020/09/dong-gia-1k-ve-khi-mua-ve-qua-tix-16010092946804.png"
                                    alt=""
                                />
                                <TitleStyle>
                                    PROMISING YOUNG WOMAN | Bông hồng nước Anh Carey Mulligan và màn
                                    trả thù đàn ông để đời
                                </TitleStyle>
                                <SubTitleStyle>
                                    Đề cử giải Oscar danh giá vừa gọi tên Carey Mulligan ở hạng mục
                                    nữ chính xuất sắc nhất cho vai diễn "đẫm máu" nhất sự nghiệp của
                                    cô trong phim
                                </SubTitleStyle>
                            </Info>
                        </Col>
                        <Col md={9}>
                            <Info>
                                <Image
                                    src="https://s3img.vcdn.vn/123phim/2020/07/bhd-star-ve-chi-59-000d-ca-tuan-15937622264546.jpg"
                                    alt=""
                                />
                                <TitleStyle>
                                    VỪA ĐẸP LẠI VỪA TÀI NĂNG, DÀN SAO NAM CỦA PHIM “BÀN TAY DIỆT
                                    QUỶ” ĐẢM BẢO ĐỐN TIM HỘI CHỊ EM
                                </TitleStyle>
                                <SubTitleStyle>
                                    Quy tụ 3 nam tài tử vừa điển trai, vừa được đánh giá cao về năng
                                    lực diễn xuất là Park Seo Joon, Woo Do Hwan và Choi Woo Sik, tác
                                    phẩm kinh dị – hành động “Bàn Tay Diệt Quỷ” hứa hẹn sẽ làm cho
                                    hội chị em phải mê mẩn vào tháng tới.
                                </SubTitleStyle>
                            </Info>{" "}
                        </Col>
                        <Col md={6}>
                            <Row>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2021/01/khai-truong-rap-xin-gia-ngon-chuan-xi-tai-sai-gon-16115477671555.jpg"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            Khai trương rạp xịn giá ngon, chuẩn xì-tai Sài Gòn
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/11/boc-tem-to-hop-giai-tri-moi-toanh-cua-gioi-ha-thanh-16056939435004.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            “Bóc tem” tổ hợp giải trí mới toanh của giới Hà Thành...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/11/tiec-trang-mau-chinh-thuc-can-moc-100-ty-chi-sau-2-tuan-cong-chieu-16043751284117.png"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            Tiệc Trăng Máu chính thức cán mốc 100 tỷ chỉ sau 2 tuần
                                            công chiếu...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                                <Col span={24}>
                                    <Space>
                                        <ImgStyle
                                            src="https://s3img.vcdn.vn/123phim/2020/10/ngo-thanh-van-chinh-thuc-khoi-dong-cuoc-thi-thiet-ke-trang-phuc-cho-sieu-anh-hung-dau-tien-cua-viet-nam-vinaman-16041584850247.jpg"
                                            alt=""
                                        />
                                        <TitleStyle style={{ fontSize: "0.7rem" }}>
                                            NGÔ THANH VÂN CHÍNH THỨC KHỞI ĐỘNG CUỘC THI THIẾT KẾ...
                                        </TitleStyle>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </TabPane>
            </Tabs>
        </Wrapper>
    );
});

const Wrapper = styled.div`
    width: 60%;
    margin: 0 auto;

    @media screen and (max-width: 1200px) {
        width: 85%;
    }

    ${media.large`
        width: 95%;
        .ant-image{
            width: 100%;
        }


    `}
`;

const Info = styled.div``;

const ImgStyle = styled(Img)`
    width: 50px;
`;
