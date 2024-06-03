import { Button, Popover, Space, Table } from 'antd';
import React, { useState } from 'react';
import {EditOutlined , UnorderedListOutlined , DeleteOutlined , MoreOutlined} from "@ant-design/icons"
function TableShowListStudentInQrCode({ handleSetListStudent, data }) {
    
  const [record, setRecord] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
 

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "userName",
      align: "left",
      
    },
    
   

    {
      title: "Mã sinh viên",
      dataIndex: "faceIdentity",
      align: "center",
    },
    {
      title: "Thời gian",
      dataIndex: "time",
      align: "center",
    },
    {
      title: "Ghi chú ",
      dataIndex: "note",
      align: "center",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
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
        Xóa sinh viên
      </Button>
    </Space>
          }
          key={record?.key}
          trigger="click"
          placement="left"
        >
          <Button icon={<MoreOutlined/>} />
        </Popover>
      ),
    },
  ];
 
  const handleBtnUser = (record, isEdit) => {
    setIsOpen(true);
    setRecord(record);
    setIsEdit(isEdit);
  };
  const handleDelete = (record) => {
    setIsDelete(true);
    setRecord(record);
  };

  return (
    <div>
      <Table
        
        columns={columns}
        dataSource={data}
        scroll={{
          y: 1200,
          x: 800,
        }}
      />

     
    </div>
  );
}

export default TableShowListStudentInQrCode;