import React from "react";
import { Button, Checkbox, Form, Image, Input, notification } from "antd";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { login } from "../Component/API/users";
import image_admin from "../Assets/user_login_image.png"
import { LockFilled, UserAddOutlined, UserOutlined } from "@ant-design/icons";

function Login(props) {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
    const res = await login({
      userCode: values.userCode,
      password: values.password,
    });
    if (res?.data?.success) {
      Cookies.set("jwt", res?.data?.data?.jwt);
      Cookies.set("userCode", res?.data?.data?.userCode);
      Cookies.set("userName", res?.data?.data?.userName);
      navigate("/admin/student-manager");
    } else {
      notification.error({
        message: "Tài khoản hoặc mật khẩu không chính xác",
      });
    }
    console.log(res);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-[100vh] w-full relative">
      <div className="grid grid-cols-2 gap-5 items-center phone:w-[90%] tablet:w-[60%]  laptop:w-[60%] p-10 rounded-lg bg-slate-200  mx-auto  absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
        <div className="laptop:col-span-1 phone:col-span-2 phone:w-[20%] phone:h-[20%] laptop:w-[80%] laptop:h-[80%] mx-auto">

          <Image src={image_admin} className="rounded-full" preview={false}/>
        </div>

        <Form
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className=" laptop:col-span-1 phone:col-span-2 my-5"
        >
          <h2 className="text-center font-semibold text-xl text-slate-700  my-5">ADMIN LOGIN</h2>
          <Form.Item
           
            name="userCode"
            rules={[
              {
                required: true,
                message: "Please input your userCode!",
              },
            ]}
          >
            <Input placeholder="Enter your user code" prefix={<UserOutlined />} className="py-2 rounded-xl" />
          </Form.Item>

          <Form.Item
           
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password placeholder="Enter your password" prefix={<LockFilled/>}  className="py-2 rounded-xl"/>
          </Form.Item>

          <Form.Item>
            <Button
              className=" w-full  rounded-xl bg-[#6bc74b] border-none text-[#fcfcfc] font-bold"
              htmlType="submit"
              // onClick={() => navigate("/attended/show-video")}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
