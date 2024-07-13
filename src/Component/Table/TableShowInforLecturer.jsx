import { Button, Modal, Table, notification } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import React, { useState } from "react";
import ModalEditClassroom from "../Modal/ModalClassroom/ModalEditClassroom";
import ModalEditUser from "../Modal/ModalUser/ModalEditUser";
import { deleteUser } from "../API/users";

function TableShowInforLecturer({ data, handleGetLecturers }) {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [record, setRecord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const handleCancel = () => {
    setOpenEdit(false);
    setRecord(null);
  };
  const handleShowRecord = (record) => {
    setOpenEdit(true);
    setRecord(record);
    setIsEdit(false);
  };
  const handleEditRecord = (record) => {
    setOpenEdit(true);
    setRecord(record);
    setIsEdit(true);
  };

  const handleDelete = (record) => {
    setOpenDelete(true);
    setRecord(record);
  };
  const confirmDeleteUser = async (record) => {
    const res = await deleteUser(record?.id);
    if (res?.data) {
      notification.success({
        message: "Xóa thành công giảng viên khỏi cơ sở dữ liệu",
      });
      setOpenDelete(false);
      handleGetLecturers();
    } else {
      notification.error({ message: "Có lỗi khi xóa giảng viên" });
      setOpenDelete(false);
    }
    console.log(res);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "fullName",
      key: "name",
    },
    {
      title: "Mã giảng viên",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      align: "center",
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <ButtonGroup>
          <Button
            className="text-orange-300"
            onClick={() => handleShowRecord(record)}
          >
            Xem
          </Button>
          <Button
            className="text-green-400"
            onClick={() => handleEditRecord(record)}
          >
            Sửa
          </Button>
          <Button className="text-red-400" onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </ButtonGroup>
      ),
    },
  ];
  return (
    <>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{
          y: 1000,
          x: 1000,
        }}
      />
      <ModalEditUser
        isOpen={openEdit}
        onCancel={() => handleCancel()}
        isEdit={isEdit}
        record={record}
        handleGetData={handleGetLecturers}
      />

      <Modal
        open={openDelete}
        footer={null}
        onCancel={() => handleCancel()}
        closable={false}
      >
        <div
          role="alert"
          class="rounded border-s-4 border-red-500 bg-red-50 p-4"
        >
          <strong class="block font-medium text-red-800">
            {" "}
            Xóa giảng viên
          </strong>

          <p class="mt-2 text-sm text-red-700">
            Khi bạn đồng ý xóa giảng viên đồng ý với xóa các thông tin liên quan
            tới giảng viên ví dụ như lớp học giảng viên quản lý và các thông tin
            điểm danh liên quan tới lớp học đó
          </p>
          <ButtonGroup className="flex items-center justify-end mt-3">
            <Button className="mr-1" onClick={() => setOpenDelete(false)}>
              Hủy
            </Button>
            <Button onClick={() => confirmDeleteUser(record)}>Đồng ý</Button>
          </ButtonGroup>
        </div>
      </Modal>
    </>
  );
}

export default TableShowInforLecturer;
