import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { getLecturers } from "../Component/API/lecturers";
import TableShowInforLecturer from "../Component/Table/TableShowInforLecturer";
import ModalCreateLecturer from "../Component/Modal/ModalUser/ModalCreateLecturer";

function PageLecturers() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleGetLecturers = async () => {
    const res = await getLecturers();
    if (res?.data?.success) {
      setData(res?.data?.data?.items);
    }
    console.log(res?.data);
  };

  useEffect(() => {
    handleGetLecturers();
  }, []);
  return (
    <div>
      <h2 className="font-medium text-xl uppercase my-5">
        Trang quản lý giảng viên
      </h2>

      <Button  className="mb-5" onClick={() => setOpen(true)}>Tạo giảng viên</Button>
      <TableShowInforLecturer
        data={data}
        handleGetLecturers={handleGetLecturers}
      />
      <ModalCreateLecturer
        isOpen={open}
        onCancel={() => setOpen(false)}
        handleGetLecturers={handleGetLecturers}
      />
    </div>
  );
}

export default PageLecturers;
