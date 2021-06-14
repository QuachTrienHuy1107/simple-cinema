/* eslint-disable jsx-a11y/anchor-is-valid */
/**
 *
 * Food
 *
 */
import { DeleteOutlined } from "@ant-design/icons";
import {
    Button,
    Col,
    Collapse,
    Drawer,
    Form,
    Image,
    InputNumber,
    Popconfirm,
    Row,
    Space,
} from "antd";

import { Buttons } from "app/components/Common/Buttons";
import { useCheckoutContext } from "app/pages/Checkout/context/createContext";
import { useCheckout } from "app/pages/Checkout/hooks/useCheckout";
import { useHandlePickFood } from "app/pages/Checkout/hooks/useHandlePickFood";
import { useHandleRemoveFood } from "app/pages/Checkout/hooks/useHandleRemoveFood";
import { selectCheckout } from "app/pages/Checkout/slice/selectors";
import { FoodType } from "app/pages/Checkout/slice/types";
import { keyBy } from "lodash";
import { NamePath } from "rc-field-form/lib/interface";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { dummyFood } from "./DummyFood";

interface Props {
    isMobile?: boolean;
}

type DummyFood = {
    id: number;
    name: string;
    image: string;
    price: number;
};

const random = Math.floor(Math.random() * 100000);

const { Panel } = Collapse;

export const Food = memo(({ isMobile }: Props) => {
    const { t, i18n } = useTranslation();
    const { handlePickFood, clearArrayFood } = useHandlePickFood();
    const [form] = Form.useForm();
    const [showFood, setShowFood] = React.useState(false);
    const { arrayFood } = useCheckoutContext();
    const { totalPriceFood } = useCheckout();
    const { handleRemoveFood } = useHandleRemoveFood();

    const showDrawer = () => {
        setShowFood(true);
    };

    const onClose = () => {
        setShowFood(false);
    };

    return (
        <Wrapper>
            <SpaceStyled>
                <h3>
                    <a
                        onClick={showDrawer}
                        style={{ marginBottom: 0, display: "inline-block", color: "red" }}
                    >
                        Chọn combo
                    </a>
                </h3>

                <span>{totalPriceFood.toLocaleString()}</span>
            </SpaceStyled>

            <Drawer
                title="Chọn combo"
                placement="right"
                width={isMobile ? "100%" : 520}
                closable={true}
                onClose={onClose}
                visible={showFood}
            >
                <SpaceStyled>
                    <h1>{totalPriceFood.toLocaleString()}</h1>
                </SpaceStyled>

                <Collapse defaultActiveKey={["1"]}>
                    <Panel header="Combo" key="1">
                        {dummyFood.map((item: DummyFood) => {
                            const index = arrayFood?.find((feed: FoodType) => feed.id === item.id);

                            return (
                                <Content key={item.id}>
                                    <Form form={form} name="basic">
                                        <Row justify="space-around" align="middle">
                                            <Col xs={{ span: 18 }} sm={{ span: 16 }} key={item.id}>
                                                <Space>
                                                    <Image width={100} src={item.image} />
                                                    <div>
                                                        <h4>{item.name}</h4>
                                                        <span style={{ color: "#228609" }}>
                                                            {item.price.toLocaleString()}
                                                        </span>
                                                    </div>
                                                </Space>
                                            </Col>
                                            <Col
                                                xs={{ span: 4 }}
                                                sm={{ span: 6 }}
                                                style={{ textAlign: "right" }}
                                            >
                                                <Form.Item name={`${item.id}`} initialValue={0}>
                                                    <InputNumberStyle
                                                        size="large"
                                                        min={0}
                                                        max={10}
                                                        onChange={(
                                                            value: number | string | null,
                                                        ) => {
                                                            const quantityItem = value as number;
                                                            handlePickFood({
                                                                id: item.id,
                                                                name: item.name,
                                                                price: item.price,
                                                                quantity: quantityItem,
                                                            });
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </Content>
                            );
                        })}
                    </Panel>
                </Collapse>
            </Drawer>

            {arrayFood?.map((item: FoodType) => {
                if (item.quantity !== 0) {
                    return (
                        <FoodList>
                            <span>
                                {item.quantity}x - {item.name}
                            </span>
                            <Popconfirm
                                title="Bạn có chắc muốn xóa không?"
                                okText="Có"
                                cancelText="Không"
                                onConfirm={() => {
                                    form.resetFields([`${item.id}`]);
                                    handleRemoveFood(item.id);
                                }}
                            >
                                <Buttons icon={<DeleteOutlined />} />
                            </Popconfirm>
                        </FoodList>
                    );
                }
            })}
        </Wrapper>
    );
});

const Wrapper = styled.div`
    width: 100%;
    /* height: 300px;
    overflow-y: scroll; */
`;

const Content = styled.div`
    background-color: #f6f6f6;
    padding: 20px;
    margin: 10px 0;

    @media screen and (max-width: 457px) {
        padding: 20px 0;
    }
`;

const InputNumberStyle = styled(InputNumber)`
    width: 100%;
`;

const FoodList = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    > span {
        margin-top: 10px;
        text-overflow: ellipsis;

        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
`;

const SpaceStyled = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    height: 30px;
    h1 {
        text-align: center;
        color: green;
        width: 100%;
        font-size: 2.3rem;
    }

    span {
        color: #016f33;
        font-size: 1rem;
        font-weight: 600;
    }
`;
