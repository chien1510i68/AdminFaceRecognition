import { Button, Form, Input, Popconfirm, Popover } from "antd";
import React from "react";
import { FilterFilled } from "@ant-design/icons";
function PopupFilterUser(props) {
  const onFinish = (values) => {
    console.log(values);
  };
  return (
    <div>
      <Popover
      icon={null}
  
      
        content={
          <>
            <Form
              className="grid grid-cols-2 gap-x-3"
              layout="vertical"
              initialValues={{
                remember: false,
              }}
              onFinish={onFinish}
            >
              <Form.Item
                // label="Họ và tên"
                name="fullName"
                className="col-span-1"
              >
                <Input placeholder="Họ và tên" />
              </Form.Item>
             
              <Form.Item
                // label="Mã sinh viên"
                name="userCode"
                className="col-span-1"
              >
                <Input placeholder="Mã sinh viên" />
              </Form.Item>
              <Form.Item
                // label="Lớp học phần"
                name="classname"
                className="col-span-1"
              >
                <Input placeholder="Lớp học phần" />
              </Form.Item>

              <Form.Item>
                <Button
                  htmlType="submit"
                  className="block ml-auto hover:bg-lime-200"
                >
                  Lọc
                </Button>
              </Form.Item>
            </Form>
          </>
        }
        title={
          <>
            <h2 className="text-center mb-4">Lọc thông tin sinh viên</h2>
          </>
        }
        trigger="click"
      >
        <Button icon={<FilterFilled />} />
      </Popover>
    </div>
  );
}

export default PopupFilterUser;
