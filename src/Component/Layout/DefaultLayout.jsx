import {
  LogoutOutlined,
  MenuOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, notification, theme } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import MenuPhone from "./MenuPhone";
import Cookies from "js-cookie";
const { Header, Content, Footer, Sider } = Layout;

const DefaultLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <p onClick={() => navigate("/admin/student-manager")}>
          Quản lý sinh viên
        </p>
      ),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      // label: '',
      label: (
        <p onClick={() => navigate("/admin/classroom-manager")}>
          Quản lý lớp học
        </p>
      ),
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      // label: 'Quản lý qr code',
      label: (
        <p onClick={() => navigate("/admin/qr-code/home")}>Điểm danh QR Code</p>
      ),
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: (
        <p onClick={() => navigate("/admin/face-recognition/home ")}>
          Quản lý điểm danh
        </p>
      ),
    },
    {
      key :"5",
      icon :<LogoutOutlined/>,
      label : (
        <p onClick={() => handleLogout()}>
        Đăng xuất
      </p>
      )
    }
  ];
  const userName = Cookies.get("userName");
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    try {
      Cookies.remove("userCode");
      Cookies.remove("userName");
      Cookies.remove("userName");
      navigate("/");
      notification.success({ message: "Đã đăng xuất !" });
    } catch (error) {}
  };
  return (
    <Layout className="relative">
      <Sider className="phone:hidden tablet:block overflow-auto h-[100vh] fixed left-0 bottom-0 top-0">
        <div className="demo-logo-vertical  text-center bg-slate-200 my-5 py-3 mx-1 rounded-lg">
          Xin chào {userName}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>

      <Layout className=" phone:ml-[0px] ">
        <div className="py-3 flex justify-between items-center px-5 fixed left-0 right-0 top-0 bg-slate-400 z-[1000] tablet:hidden">
          <Button className="block " onClick={() => setOpen(true)}>
            <MenuOutlined />
          </Button>
          <Button onClick={() => handleLogout()}>
            <LogoutOutlined />
          </Button>
        </div>
        <MenuPhone open={open} onClose={() => setOpen(false)} />
        <Content
          // style={{
          //   margin: "24px 16px 0",
          //   overflow: "initial",
          // }}
          className=" z-100"
        >
          <div
            style={{
              padding: 24,
              textAlign: "center",

              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;
