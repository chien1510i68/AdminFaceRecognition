import React, { useEffect, useState } from "react";
import StatisticFaceRecognition from "../Component/Modal/ModalQRCode/ModalShowQrCodes";
import { getAllQRCode } from "../Component/API/qr-code";
import { notification } from "antd";
import { getListClassroom } from "../Component/API/classroom";
import TableShowInforClassroom from "../Component/Table/TableShowInforClassroom";
import Cookies from "js-cookie";

function PageFaceRecognition(props) {
  const [data, setData] = useState([]);
  const [loading , setLoading] = useState(true)
  useEffect(() => {
   
    getListClassroom(Cookies.get("userCode")).then((res) => {
      setLoading(false)
      console.log(res);
      setData(res?.items);
    });
  }, []);
  return (
    <div className="my-6">
      {" "}
      <h2 className="font-medium text-xl uppercase mt-8 mb-5">
        Trang quản lý điểm danh
      </h2>
      <TableShowInforClassroom data={data} loading={loading}  isFaceRecognition={true}/>

    </div>
  );
}

export default PageFaceRecognition;
