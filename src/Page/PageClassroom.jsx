import React, { useEffect, useState } from "react";
import { getListClassroom } from "../Component/API/classroom";
import TableShowInforClassroom from "../Component/Table/TableShowInforClassroom";
import { useLocation, useRoutes } from "react-router";
import { Button } from "antd";
import ModalCreateClassroom from "../Component/Modal/ModalClassroom/ModalCreateClassroom";
import Cookies from "js-cookie";

function PageClassroom(props) {
  const [data, setData] = useState([]);
  const [openModalCreate, setOpenModalCreate] = useState(false);
 const [loading , setLoading] = useState(true)
 const userCode = Cookies.get("userCode")
  const handleGetListClassroom = () =>{
    getListClassroom( Cookies.get("userCode")).then((res) => {
      setLoading(false)
      console.log(res);
      setData(res?.items);
    });
  }

  useEffect(() => {
    handleGetListClassroom()
  }, []);
  return (
    <div>
      <div className="justify-around flex my-6 phone:grid">
        <h2 className="font-medium text-xl uppercase my-5">
          Trang quản lý danh sách lớp học
        </h2>

        <div>
          <Button onClick={() => setOpenModalCreate(true)}>Tạo lớp học</Button>
          {/* <Button className="mx-2">Lọc thông tin</Button> */}
        </div>
      </div>

      
      <TableShowInforClassroom loading={loading} data={data} isShowAction={true} handleGetListClassroom={handleGetListClassroom} />
      <ModalCreateClassroom
        isOpen={openModalCreate}
        handleGetListClassroom={handleGetListClassroom}
        onCancel={() => setOpenModalCreate(false)}
      />
    </div>
  );
}

export default PageClassroom;
