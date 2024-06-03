import { Button, Form, Input, Modal, Select, notification } from "antd";
import React, { useState } from "react";
import { editClassroom } from "../../API/classroom";
import TextArea from "antd/es/input/TextArea";

function ModalEditClassroom({
  isOpen,
  onCancel,
  record,
  isEdit,
  handleGetListClassroom,
}) {
  const currentYear = new Date(Date.now()).getFullYear();
  const [schoolYear, setShoolYear] = useState(
    `${currentYear - 1} - ${currentYear}`
  );
  const [semester, setSemester] = useState(1);
  const [valueNote , setValueNote] = useState(null)
  const onFinish = async (values) => {
    const res = await editClassroom({ ...values, id: record?.id , note : valueNote});
    if (res) {
      notification.success({
        message: "Thay đổi đã được lưu vào cơ sở dữ liệu",
      });
    } else {
      notification.er({ message: "Có lỗi khi lưu thay đổi" });
    }
    handleGetListClassroom();
    onCancel();

    //  console.log(res);
  };
  const handleChangeSchoolYear = (value) => {
    setShoolYear(value);
  };
  const handleChangeSemester = (value) => {
    setSemester(value);
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
          label="Mã lớp học "
          name="classCode"
          className="col-span-1"
          rules={[
            {
              required: true,
              message: "Mã lớp học không được để trống !",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Tên lớp học"
          name="nameClass"
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
          label="Số lượng"
          name="quantityStudents"
          className="col-span-1"
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          label="Nhóm học"
          name="studyGroup"
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
          className="col-span-1 mx-2"
          label="Chọn năm học"
          name="schoolYear"
        >
          <Select
            defaultValue={`${currentYear - 1} - ${currentYear}`}
            onChange={handleChangeSchoolYear}
            options={[
              {
                value: `${currentYear - 1} - ${currentYear}`,
                label: `${currentYear - 1} - ${currentYear}`,
              },
              {
                value: `${currentYear} - ${currentYear + 1}`,
                label: `${currentYear} - ${currentYear + 1}`,
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="col-span-1 mx-2"
          label="Chọn kỳ học"
          name="semester"
        >
          <Select
            defaultValue="1"
            onChange={handleChangeSemester}
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
            ]}
          />
        </Form.Item>
        <Form.Item className="col-span-2 mx-2" label="Ghi chú" name="note">
            <TextArea
              placeholder="Controlled autosize"
              onChange={(e) => setValueNote(e.target.value)}
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
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

export default ModalEditClassroom;
