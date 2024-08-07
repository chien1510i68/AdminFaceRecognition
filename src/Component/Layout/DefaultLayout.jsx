import {
  AuditOutlined,
  LogoutOutlined,
  MenuOutlined,
  PieChartOutlined,
  QrcodeOutlined,
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
    token: { colorBgContainer, borderRadiusLG ,siderBg="#97cdb2" },
  } = theme.useToken();

  const colorSibar = {

  }
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
      icon: <AuditOutlined />,
      // label: '',
      label: (
        <p onClick={() => navigate("/admin/classroom-manager")}>
          Quản lý lớp học
        </p>
      ),
    },
    {
      key: "3",
      icon: <QrcodeOutlined />,
      // label: 'Quản lý qr code',
      label: (
        <p onClick={() => navigate("/admin/qr-code/home")}>Điểm danh QR Code</p>
      ),
    },
    {
      key: "4",
      icon: <PieChartOutlined />,
      label: (
        <p onClick={() => navigate("/admin/face-recognition/home ")}>
          Quản lý điểm danh
        </p>
      ),
    },
    ...(Cookies.get("role") === "ADMIN"
      ? [
          {
            key: "5",
            icon: <PieChartOutlined />,
            label: (
              <p onClick={() => navigate("/admin/lecturers")}>
                Quản lý giảng viên
              </p>
            ),
          },
        ]
      : []),
    {
      key: "6",
      icon: <LogoutOutlined />,
      label: <p onClick={() => handleLogout()}>Đăng xuất</p>,
    },
  ];
  const userName = Cookies.get("userName");
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    try {
      Cookies.remove("userCode");
      Cookies.remove("userName");
      Cookies.remove("jwt");
      Cookies.remove("role");
      navigate("/");
      notification.success({ message: "Đã đăng xuất !" });
    } catch (error) {}
  };
  return (
    <Layout className="relative">
      <Sider
      style={{background : siderBg}}
      className="phone:hidden tablet:block overflow-auto h-[100vh] fixed left-0 bottom-0 top-0 bg-red-300">
        <div className="demo-logo-vertical  text-center bg-slate-200 my-5 py-3 mx-1 rounded-lg">
          Xin chào {userName}
        </div>

        <Menu
        style={{background : siderBg}}
          // theme="dark"
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
              siderBg:siderBg,
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
