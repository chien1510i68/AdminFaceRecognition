import { notification } from "antd";
import { getUserById } from "../API/users";

export const handleGetUser = (id) => {
  getUserById(id).then((res) => {
    console.log(res);
  });
};
export const handleDeleteUser = (id , onCancel)=>{
    // console.log("Xoa sinh vien co id" , id);
    notification.success({message : `Xoa sinh vien co id ${id}`})
}
