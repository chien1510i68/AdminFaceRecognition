import { notification } from "antd";
import request from "./request.js";
export const getAllUser = () => {
  const data = request
    .get("user/")
    .then((res) => {
      //   console.log("Thong tin nguoi dung la : ", res?.data);
      if (res?.data?.success === true) {
        return res?.data?.data;
      } else {
        return notification.error({ message: "Danh sách người dùng trống" });
      }
    })
    .catch((err) => console.log("Co loi khi lay thong tin nguoi dung : ", err));

  return data;
};

export const getUserById = (id) => {
  const response = request
    .get(`user/${id}`)
    .then((res) => {
      if (res?.data?.success === true) {
        return res?.data?.data;
      }
    })
    .catch((err) => console.log(err));

  return response;
};

export const updateUser = (data) => {
  const res = request.put("user/", data);
  return res;
};
export const login = async (data) => {
  const res = await request.post("api/auth/login", data);
  return res;
};
export const getImages = async (userCode) => {
  const res = await request.get(`user/images/${userCode}`);
  return res;
};

export const getUsersNotTrainded = async (data) => {
  const res = await request("user/filter", data);
  return res;
};

export const getHistoryAttendedByClassroom = async (data) => {
  const res = await request.post("checkins/user", data);
  return res?.data?.success ? res?.data?.data?.items : null;
};
