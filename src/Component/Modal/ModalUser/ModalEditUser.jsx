import { Button, Form, Input, Modal, notification } from "antd";
import React, { useEffect } from "react";
import { updateUser } from "../../API/users";

function ModalEditUser({ isOpen, onCancel, record, isEdit, handleGetData }) {
  const onFinish = async (values) => {
    const res = await updateUser({ ...values, id: record?.id });
    console.log("Du lieu tra ve la : ", res);
    if (res?.data?.success) {
      notification.success({
        message: " Cập nhật thành công thông tin người dùng ",
      });
      onCancel();
      handleGetData();
    } else {
      notification.error({ message: res?.data?.error?.message });
      onCancel();
    }
  };

  useEffect(() => {
    console.log(record);
  }, []);

  return (
    <Modal
      open={isOpen}
      width={800}
      onCancel={onCancel}
      destroyOnClose={true}
      footer={null}
      maskClosable={false}
    >
      <h2 className="font-medium text-center text-xl text-slate-600 my-3">
        {isEdit ? "Sửa thông tin sinh viên" : "Xem thông tin sinh viên"}
      </h2>
      <Form
        className="w-full grid grid-cols-2 gap-3 "
        initialValues={record}
        layout="vertical"
        onFinish={onFinish}
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
          <Input placeholder="Nhập vào họ tên sinh viên" />
        </Form.Item>
        <Form.Item
          name={"userCode"}
          rules={[
            {
              required: true,
              message: "Nhập vào mã sinh viên",
            },
          ]}
          className="col-span-1"
          label="Mã sinh viên"
        >
          <Input placeholder="Nhập vào mã sinh viên" />
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
          name={"classname"}
          rules={[
            {
              required: true,
              message: "Nhập vào mã lớp hành chính!",
            },
          ]}
          className="col-span-1"
          label="Mã lớp hành chính"
        >
          <Input placeholder="Nhập vào mã lớp hành chính" />
        </Form.Item>

        {/* <Form.Item
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
        </Form.Item> */}

        <Form.Item
          name={"phoneNumber"}
          className="col-span-1"
          label="Số điện thoại"
        >
          <Input placeholder="Nhập vào số điện thoại" />
        </Form.Item>

        <Form.Item name={"address"} className="col-span-1" label="Địa chỉ">
          <Input placeholder="Nhập vào địa chỉ" />
        </Form.Item>

        <Form.Item className="flex items-center justify-end col-span-2">
          <Button className=" bg-red-600 text-slate-200" onClick={onCancel}>
            Cancel
          </Button>
          {isEdit && (
            <Button
              htmlType="submit"
              className="mx-3 bg-green-600 text-slate-200"
            >
              Save
            </Button>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalEditUser;
