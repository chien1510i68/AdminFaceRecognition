import { Button, Popover, Space, Table, notification } from "antd";
import React, { useEffect, useState } from "react";

import {
  MoreOutlined,
  UnorderedListOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import ModalDeleteQRCode from "../Modal/ModalQRCode/ModalDeleteQRCode";
import ModalEditQRCode from "../Modal/ModalQRCode/ModalEditQRCode";
import ModalListStudent from "../Modal/ModalQRCode/ModalListStudent";
import { getListUserByQrCode } from "../API/classroom";

function TableShowInforQRCode({ data }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [record, setRecord] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isShowListStudent , setIsShowListStudent] = useState(false)
  const navigate = useNavigate();
  const [id , setId] = useState(null)
  const [students , setStudents] = useState([])

  const columns = [
    {
      title: "Thời gian tạo",
      dataIndex: "createAt",
      align: "center",
    },
    {
      title: "Kinh độ",
      dataIndex: "longitude",
      align: "center",
    },
    {
      title: "Vĩ độ",
      dataIndex: "latitude",
      align: "center",
    },
    {
      title: "Thời gian giới hạn",
      dataIndex: "limitedTime",
      align: "center",
    },
    {
      title: "Tên người tạo",
      dataIndex: "createBy",
      align: "center",
    },
    {
      title: "Tên lớp học",
      dataIndex: "nameClass",
      align: "center",
    },

    {
      align: "center",
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Popover
          content={
            <Space direction="vertical" className="text-center">
              <Button
                className="bg-lime-900  text-zinc-200"
                onClick={() => handleBtnUser(record, false)}
                icon={<UnorderedListOutlined />}
              >
                Xem chi tiết
              </Button>
              <Button
                className="bg-orange-700 text-zinc-200 mx-2"
                onClick={() => handleBtnUser(record, true)}
                icon={<EditOutlined />}
              >
                Sửa thông tin
              </Button>
              <Button
                className="bg-red-900 text-zinc-200"
                onClick={() => handleDelete(record)}
                icon={<DeleteOutlined />}
              >
                Xóa lớp học
              </Button>
            </Space>
          }
          key={record?.key}
          trigger="click"
          placement="left"
        >
          <Button icon={<MoreOutlined />} />
        </Popover>
      ),
    },
    // {
    //   title: "DSSV",
    //   dataIndex: "",
    //   align: "center",
    //   key :"c",
    //   render: (record) => (
    //     <Button onClick={() =>handleShowListStudent(record.id)}>
    //       Danh sách sinh viên
    //     </Button>
    //   ),

    // },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    // handleSetListStudent(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleBtnUser = (record, isEdit) => {
    setIsOpen(true);
    setRecord(record);
    setIsEdit(isEdit);
  };
  const handleDelete = (record) => {
    setIsDelete(true);
    setRecord(record);
  };
  const handleShowListStudent = (id) =>{
    setIsShowListStudent(true)
    setId(id)
    getListUserByQrCode(id).then((res) =>{
      if(res?.data?.success){
        setStudents(res?.data?.data)
      }
    })

  }

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 1200,
          x: 800,
        }}
      />

      <ModalEditQRCode
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        record={record}
        isEdit={isEdit}
      />
      <ModalDeleteQRCode
        isOpen={isDelete}
        onCancel={() => setIsDelete(false)}
        record={record}
      />
      <ModalListStudent isOpen={isShowListStudent}
      onCancel={() => setIsShowListStudent(false)}
      data ={students}/>
    </div>
  );
}

export default TableShowInforQRCode;

