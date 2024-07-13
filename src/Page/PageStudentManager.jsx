import { Button, Popover, notification } from "antd";
import React, { useEffect, useState } from "react";
import ModalCreateUser from "../Component/Modal/ModalUser/ModalCreateUser";
import TableShowInforStudent from "../Component/Table/TableShowInforStudent";
import { getAllUser } from "../Component/API/users";
import PopupFilterUser from "../Component/Modal/ModalUser/PopupFilterUser";
import TableShowInforClassroom from "../Component/Table/TableShowInforClassroom";
import { getListClassroom } from "../Component/API/classroom";
import Cookies from "js-cookie";

function PageStudentManager() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetListClassroom = () => {
    getListClassroom(Cookies.get("userCode")).then((res) => {
      setLoading(false);
      console.log(res);
      setData(res?.items);
    });
  };

  useEffect(() => {
    handleGetListClassroom();
  }, []);
  return (
    <div className="mt-8">
      <h2 className="font-semibold text-xl my-6">TRANG QUẢN LÝ SINH VIÊN</h2>
      <TableShowInforClassroom
        loading={loading}
        handleGetListClassroom={handleGetListClassroom}
        data={data}
        isStudens={true}
      />
    </div>
  );
}

export default PageStudentManager;
