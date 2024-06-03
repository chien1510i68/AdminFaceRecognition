import { Button, Form, Input, Select, notification } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  deleteUserInClass,
  getListUserInClassroom,
} from "../Component/API/classroom";
import TableShowInforStudent from "../Component/Table/TableShowInforStudent";

function StudentsInClassroom(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.state;
  const handleGetData = () => {
    getListUserInClassroom(id).then((res) => {
      setLoading(false);
      setData(res);
    });
  };
  useEffect(() => {
    handleGetData();
  }, []);

  const handleDeleteUserInClass = (userId) => {
    deleteUserInClass({ userId: userId, classroomId: id }).then((res) => {
      console.log(res.data);
      if (res?.data) {
        notification.success({
          message: "Xóa thành công sinh viên khỏi lớp học",
        });
        handleGetData();
      } else {
        notification.error({ message: "Có lỗi khi sinh viên khỏi lớp học" });
      }
    });
  };
  return (
    <div>
      <div className="my-8">
        <Button
          className="block text-left "
          onClick={() => navigate("/admin/student-manager")}
        >
          Quay lại
        </Button>
        <h2 className="font-bold text-xl my-5">DANH SÁCH SINH VIÊN</h2>
      </div>

      <TableShowInforStudent
        data={data}
        loading={loading}
        inClassroom={true}
        handleDeleteUserInClass={handleDeleteUserInClass}
        handleGetData={handleGetData}
      />
    </div>
  );
}

export default StudentsInClassroom;
