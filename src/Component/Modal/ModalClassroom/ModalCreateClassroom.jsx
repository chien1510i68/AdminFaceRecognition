import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Spin,
  notification,
} from "antd";
import { createClassroom } from "../../API/classroom";
import TextArea from "antd/es/input/TextArea";
import Cookies from "js-cookie";
import { ProFormUploadButton } from "@ant-design/pro-components";
function ModalCreateClassroom({ isOpen, onCancel, handleGetListClassroom }) {
  const currentYear = new Date(Date.now()).getFullYear();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const handleUpload = (file) => {
    setFile(file?.file);
  };
  // const [listFile, setListFile] = useState([]);
  // const [fieldFile, setFieldFile] = useState("");
  const [schoolYear, setShoolYear] = useState(
    `${currentYear - 1} - ${currentYear}`
  );
  const [semester, setSemester] = useState(1);
  const [valueNote, setValueNote] = useState(null);
  const onFinish = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("className", values?.className);
    formData.append("classCode", values?.classCode);
    formData.append("studyGroup", values?.studyGroup);
    formData.append("schoolYear", schoolYear);
    formData.append("semester", semester);
    formData.append("quantityStudents", 12);
    if (file !== null) {
      formData.append("file", file);
    }
    formData.append("note", valueNote);
    formData.append("userCode", Cookies.get("userCode"));

    // console.log(data);
    const res = await createClassroom(formData);
    setLoading(false);
    if (res?.success) {
      notification.success({ message: "Tạo thành công lớp học" });
      handleGetListClassroom();
      onCancel();
    } else {
      notification.error({ message: `${res?.error?.message}` });
      // console.log(res);
    }
  };

  const handleChangeSchoolYear = (value) => {
    setShoolYear(value);
  };
  const handleChangeSemester = (value) => {
    setSemester(value);
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onCancel={onCancel}
        destroyOnClose={true}
        width={800}
        footer={null}
        maskClosable={false}
      >
        <div className={`${loading && "hidden"}`}>
          <h2 className="text-base font-medium uppercase text-center mb-5">
            Tạo lớp học phần
          </h2>
          <Form
            onFinish={onFinish}
            autoComplete="off"
            className="grid grid-cols-2"
            layout="vertical"
          >
            <Form.Item
              className="col-span-1 mx-2"
              label="Tên lớp học"
              name="className"
              rules={[
                {
                  required: true,
                  message: "Please input your className!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              className="col-span-1 mx-2"
              label="Nhóm học"
              name="studyGroup"
              rules={[
                {
                  required: true,
                  message: "Please input your studyGroup!",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item
              className="col-span-1 mx-2"
              label="Mã lớp học"
              name="classCode"
              rules={[
                {
                  required: true,
                  message: "Please input your classCode!",
                },
              ]}
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
            <Form.Item>
              <ProFormUploadButton
                name="image"
                title="Upload list student in classroom"
                fieldProps={{
                  listType: "picture-card",
                  method: "POST",
                  name: "file",
                  customRequest: handleUpload,
                  multiple: true,
                  // onRemove: listFileRemoved,
                  openFileDialogOnClick: true,
                }}
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

            <Form.Item className="col-span-2 mx-2 block text-right" label=" ">
              <Button htmlType="submit">Submit</Button>
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

export default ModalCreateClassroom;
