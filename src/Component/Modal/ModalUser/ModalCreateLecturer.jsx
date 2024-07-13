import { Button, Form, Input, Modal, Spin, notification } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import React, { useState } from "react";
import { addUserInClassroom } from "../../API/classroom";
import { createLecturers } from "../../API/users";

function ModalCreateLecturer({ isOpen, onCancel, handleGetLecturers }) {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    const res = await createLecturers(values);
    // console.log(res);
    if (res?.data?.success) {
      setLoading(false);
      notification.success({
        message: "Thêm thành công giảng viên vào cơ sở dữ liệu",
      });
      handleGetLecturers();
    } else {
      setLoading(false);
      notification.error({ message: res?.data?.error?.message });
    }
    // console.log(res?.data?.success);
    onCancel();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        width={800}
        onCancel={onCancel}
        destroyOnClose={true}
        footer={null}
        maskClosable={false}
        className=""
      >
        <div className={`${loading && "hidden"}`}>
          <h2 className="font-medium text-center text-xl text-slate-600 my-3">
            Thêm giảng viên
          </h2>
          <Form
            className="w-full grid grid-cols-2 gap-3 "
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Please input your className!",
                },
              ]}
              className="col-span-1"
              label="Họ và tên"
            >
              <Input placeholder="Nhập vào họ tên giảng viên" />
            </Form.Item>
            <Form.Item
              name={"userCode"}
              rules={[
                {
                  required: true,
                  message: "Nhập vào mã giảng viên",
                },
              ]}
              className="col-span-1"
              label="Mã giảng viên"
            >
              <Input placeholder="Nhập vào mã giảng viên" />
            </Form.Item>
            <Form.Item
              name={"dob"}
              rules={[
                {
                  required: true,
                  message: "Nhập vào ngày/tháng/năm sinh!",
                },
              ]}
              className="col-span-1"
              label="Ngày sinh"
            >
              <Input placeholder="Nhập vào ngày sinh dd/MM/yy " />
            </Form.Item>

            <Form.Item
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Nhập vào mật khẩu tài khoản!",
                },
              ]}
              className="col-span-1"
              label="Mật khẩu"
            >
              <Input placeholder="Nhập vào mật khẩu tài khoản" />
            </Form.Item>

            <Form.Item
              name={"phoneNumber"}
              className="col-span-1"
              label="Số điện thoại"
            >
              <Input placeholder="Nhập vào số điện thoại" />
            </Form.Item>

            <Form.Item name={"addr"} className="col-span-1" label="Địa chỉ">
              <Input placeholder="Nhập vào mật khẩu tài khoản" />
            </Form.Item>

            <Form.Item className="flex items-center justify-end col-span-2">
              <Button className=" bg-red-600 text-slate-200" onClick={onCancel}>
                Cancel
              </Button>
              <Button
                className="mx-3 bg-green-600 text-slate-200"
                htmlType="submit"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className={`text-center my-4 ${!loading && "hidden"}`}>
          <Spin size="large" />
          <h2 className="mt-2 font-medium ">Đang cập nhật dữ liệu ....</h2>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateLecturer;
