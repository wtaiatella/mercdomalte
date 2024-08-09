import { createElement, useState } from "react";

import {
  FileAddOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, MenuProps } from "antd";

import { UserDashboard } from "../../components/UserDashboard/Index";
import UserDada from "../../components/UserData";

import NewFile from "../NewFile";
import { Container } from "./styles";

const { Content, Sider } = Layout;

export default function MyAccount() {
  const [menuKey, setMenuKey] = useState("2");

  const onSelect = ({ key }: { key: string }) => {
    console.log(key);
    setMenuKey(key);
  };

  const menuList: MenuProps["items"] = [
    {
      key: "1",
      icon: createElement(UserOutlined),
      label: "Meus dados",
    },
    {
      key: "2",
      icon: createElement(ProfileOutlined),
      label: "Meus Arquivos",
    },
    {
      key: "3",
      icon: createElement(FileAddOutlined),
      label: "Novo Arquivo",
    },
  ];

  return (
    <>
      <Container>
        <Layout>
          <Sider>
            <Menu
              mode="inline"
              defaultSelectedKeys={["2"]}
              style={{
                height: "100%",
                width: "200px",
                position: "relative",
              }}
              items={menuList}
              onSelect={onSelect}
            />
          </Sider>
          <Content>
            {menuKey === "1" && <UserDada />}
            {menuKey === "2" && <UserDashboard />}
            {menuKey === "3" && <NewFile />}
          </Content>
        </Layout>
      </Container>
    </>
  );
}
