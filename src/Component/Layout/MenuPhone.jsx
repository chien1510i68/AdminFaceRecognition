import { Button, Drawer } from "antd";
import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function MenuPhone({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Drawer
      placement="left"
      onClose={onClose}
      open={open}
      width={300}
      size="default"
      closeIcon={false}
      className=""
    >
      <div className="flex flex-col gap-5  my-auto h-[80vh] justify-center ">
        <Button
          className="block w-[70%] text-base font-medium  mx-auto"
          onClick={() => {
            navigate("/admin/student-manager");
            onClose();
          }}
        >
          Quản lý sinh viên
        </Button>
        <Button
          className="block w-[70%] text-base font-medium  mx-auto"
          onClick={() => {
            navigate("/admin/classroom-manager");
            onClose();
          }}
        >
          Quản lý lớp học
        </Button>
        <Button
          className="block w-[70%] text-base font-medium  mx-auto"
          onClick={() => {
            navigate("/admin/qr-code/home");
            onClose();
          }}
        >
          Điểm danh QR Code
        </Button>
        <Button
          className="block w-[70%] text-base font-medium  mx-auto"
          onClick={() => {
            navigate("/admin/face-recognition/home ");
            onClose();
          }}
        >
          Quản lý điểm danh
        </Button>

        {Cookies.get("role") === "ADMIN" && (
          <Button
            className="block w-[70%] text-base font-medium  mx-auto"
            onClick={() => {
              navigate("/admin/lecturers ");
              onClose();
            }}
          >
            Quản lý giảng viên
          </Button>
        )}
      </div>
    </Drawer>
  );
}

export default MenuPhone;
