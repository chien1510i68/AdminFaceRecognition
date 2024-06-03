import { notification } from "antd";
import request from "./request";
export const getAllQRCode = () => {
  const response = request.get("qr/").then((res) => {
    return res?.data?.success ? res?.data?.data : null;
  });
  return response;
};

export const createQRCode = (data) => {
  return request.post("qr/", data);
};

export const getUsersAttendedByQrCode = (id) => {
  const res = request
    .get(`checkins/qr/${id}`)
    .then((res) => {
      // console.log(res?.data?.data?.items);
      if (res?.data?.success) {
        console.log(res?.data?.data?.total);
        return res?.data?.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export const setStatusActive = (data) =>{
  return request.put("qr/" , data)
}
export const getQrcodesByClassroom = async (id) =>{
  const res = await request.get(`qr/quantity/${id}`);
  return res.data.success ? res?.data?.data : null
} 