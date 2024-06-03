import { Button, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { getUsersNotAttended } from "../Component/API/face-recognition";
import { getUsersAttendedByQrCode } from "../Component/API/qr-code";
import TableUserAttended from "../Component/Table/TableUserAttended";
import TableUsersNotAttended from "../Component/Table/TableUsersNotAttended";
import { useLocation, useNavigate } from "react-router";
import ChartStatistical from "./ChartStatistical";
import { statisticQrInClassroom } from "../Component/API/classroom";
import TableHistoryAttended from "../Component/Table/TableHistoryAttended";
import DowloadAttendedClassroom from "./DowloadAttendedClassroom";

function PageStatisticFaceRecogniton(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const [id, setId] = useState(props?.id || location.state);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [key, setKey] = useState(1);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const onChange = (key) => {
    console.log(key);
    setKey(key);
  };
  const handleGetUsersAttended = () => {
    setLoading1(true);
    getUsersAttendedByQrCode(id).then((res) => {
      setLoading1(false);
      // console.log("danh sách các phiên đăng nhập là " , res);
      setData1(res != null ? res?.items : []);
      console.log(res);
    });
  };

  const handleGetUsersNotAttended = () => {
    setLoading2(true);
    getUsersNotAttended(id).then((res) => {
      setLoading2(false);
      setData2(res != null ? res : []);
      // console.log(res);
    });
  };
  const handleGetDataStatistic = async () => {
    setLoading3(true);
    const res = await statisticQrInClassroom(id);
    setLoading3(false);
    console.log(res);
    setData3(res != null ? res?.items : []);
  };

  const items = [
    {
      key: "1",
      label: <Button>Danh sách sinh viên đã điểm danh</Button>,
      children: (
        <TableUserAttended
          data={data1}
          loading={loading1}
          handleGetData={handleGetUsersAttended}
        />
      ),
    },
    {
      key: "2",
      label: <Button>Danh sách sinh viên vắng mặt</Button>,
      children: (
        <TableUsersNotAttended
          loading={loading2}
          data={data2}
          handleGetData={handleGetUsersNotAttended}
          qrId={id}
        />
      ),
    },
    {
      key: "3",
      label: <Button>Biểu đồ thống kê</Button>,
      // children: <ChartStatistical data={data3} loading={loading3} />,
      children: <TableHistoryAttended qrCodeId={id} />,
    },
  ];

  useEffect(() => {
    if (key == 1) {
      handleGetUsersAttended();
    }
    if (key == 2) {
      handleGetUsersNotAttended();
    }
  }, [key]);
  return (
    <div className="mt-8">
      {/* <h2 className="text-3xl  text-red-400">Id lop hoc la : {idClassroom} </h2> */}

      <div className="grid grid-cols-6 items-center justify-center">
        
        <div className="laptop:col-span-2 phone:col-span-3 my-auto">
          <Button
            onClick={() => navigate("/admin/face-recognition/home")}
            className="block mb-8 text-left bg-lime-300 "
          >
            Quay lại
          </Button>
        </div>

        <div className="laptop:col-span-2 phone:col-span-3">
          <DowloadAttendedClassroom />
        </div>

        <div className="laptop:col-span-2 phone:col-span-6">
          {key == 1 ? (
            <h2 className="text-base font-semibold">
              Số lượng sinh viên đã điểm danh là {data1?.length}
            </h2>
          ) : key == 2 ? (
            <h2 className="text-base font-semibold">
              Số lượng sinh viên chưa điểm danh là {data2?.length}
            </h2>
          ) : (
            <h2 className="text-base font-semibold">
              {/* Số lượng sinh viên chưa điểm danh là {data2?.length} */}
            </h2>
          )}
        </div>
      </div>
      <Tabs
        centered={true}
        className="text-center"
        defaultActiveKey="1"
        items={items}
        onChange={onChange}
      />
    </div>
  );
}

export default PageStatisticFaceRecogniton;
