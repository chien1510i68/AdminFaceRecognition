import { Button, Form, Input, Modal, notification } from "antd";
import React from "react";

function ModalEditQRCode({ isOpen, onCancel, record, isEdit }) {
  const onFinish = (values) => {
    console.log(values);
    onCancel();
    notification.success({ message: " Thanh cong gui bieu mau " });
  };

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
          label="Thời gian tạo"
          name="createAt"
          rules={[
            {
              required: true,
              message: "Tên lớp học không được để trống !",
            },
          ]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Kinh độ"
          name="longitude"
          
          className="col-span-1"
        >
          <Input disabled={true}/>
        </Form.Item>
        <Form.Item
          label="Vĩ độ"
          name="latitude"
         
          className="col-span-1"
        >
          <Input disabled/>
        </Form.Item>
        <Form.Item
          label="Thời gian giới hạn"
          name="limitedTime"
          rules={[
            {
              required: true,
              message: "Nhóm học không được để trống !",
            },
          ]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên người tạo"
          name="createBy"
          rules={[
            {
              required: true,
              message: "Nhóm học không được để trống !",
            },
          ]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên lớp học"
          name="nameClass"
          rules={[
            {
              required: true,
              message: "Nhóm học không được để trống !",
            },
          ]}
          className="col-span-1"
        >
          <Input />
        </Form.Item>

        <Form.Item className="flex items-center justify-end col-span-2">
          {isEdit && (
            <Button
              htmlType="submit"
              className="mx-3 bg-green-600 text-slate-200"
            >
              Save
            </Button>
          )}
          <Button className=" bg-red-600 text-slate-200" onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModalEditQRCode;
