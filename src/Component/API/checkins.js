import { notification } from "antd";
import request from "./request";
export const deleteFaceRecognition = (id) => {
  return request.delete(`checkins/${id}`);
};

export const createCheckins = (data) => {
  return request.post("checkins/", data);
};

export const updateCheckin = async(data) =>{
  const res = await request.put("checkins/", data)
  return res 
}
