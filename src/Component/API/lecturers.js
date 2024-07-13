import request from "./request";
export const getLecturers =async () => {
  return await request.get("user/getLecturers");

};
