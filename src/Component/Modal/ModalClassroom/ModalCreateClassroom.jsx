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
function ModalCreateClassroom({ isOpen, onCancel, handleGetListClassroom }) {
  const currentYear = new Date(Date.now()).getFullYear();
  const [loading, setLoading] = useState(false);
  const [schoolYear, setShoolYear] = useState(
    `${currentYear - 1} - ${currentYear}`
  );
  const [semester, setSemester] = useState(1);
  const [valueNote, setValueNote] = useState(null);
  const onFinish = async (values) => {
    setLoading(true);
    const data = {
      className: values?.className,
      classCode: values?.classCode,
      studyGroup: values?.studyGroup,
      schoolYear: schoolYear,
      semester: semester,
      quantityStudents: 12,
      note: valueNote,
    };
    console.log(data);
    const res = await createClassroom(data);
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
          <Spin size="large"/>
          <h2 className="mt-2 font-medium ">Đang cập nhật dữ liệu ....</h2>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCreateClassroom;
