import React from "react";
import { Link } from "react-router-dom";
import { Badge, Breadcrumb, Button, Dropdown, Layout, Menu } from "antd";

interface Props {}

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="https://www.antgroup.com">1st menu item</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="https://www.aliyun.com">2nd menu item</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">3rd menu item</Menu.Item>
    </Menu>
);

const AdminTemplate: React.FC<Props> = ({ children }: any) => <div>123</div>;

export default AdminTemplate;
