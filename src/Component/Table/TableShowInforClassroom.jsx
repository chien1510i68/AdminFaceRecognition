import { Button, Input, Space, Table } from "antd";
import React, { useRef, useState } from "react";

import ButtonGroup from "antd/es/button/button-group";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router";
import { getQrcodesByClassroom } from "../API/qr-code";
import ModalDeleteClassroom from "../Modal/ModalClassroom/ModalDeleteClassroom";
import ModalEditClassroom from "../Modal/ModalClassroom/ModalEditClassroom";
import ModalUploadFile from "../Modal/ModalClassroom/ModalUploadFile";
import ModalShowQrCodes from "../Modal/ModalQRCode/ModalShowQrCodes";
import ModalCreateUser from "../Modal/ModalUser/ModalCreateUser";

import {
  SearchOutlined
} from "@ant-design/icons";
function TableShowInforClassroom({
  data,
  isShowAction,
  isStudens,
  isActionQrcode,
  loading,
  isFaceRecognition,
  handleGetListClassroom,
}) {
  const [record, setRecord] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [isShowQrCodes, setIsShowQrcodes] = useState(false);
  const [qrCodes, setQrCodes] = useState([]);
  const [loading1, setLoading1] = useState(false);

  const [idClassroom, setIdClassroom] = useState(null);
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            // type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>

          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Mã lớp học",
      dataIndex: "classCode",
      align: "center",
      ...getColumnSearchProps("classCode"),
    },
    {
      title: "Tên lớp học",
      dataIndex: "nameClass",
      align: "center",
      ...getColumnSearchProps("nameClass"),
    },
    {
      title: "Sĩ số ",
      dataIndex: "quantityStudents",
      align: "center",
    },
    {
      title: "Nhóm học",
      dataIndex: "studyGroup",
      align: "center",
    },
    {
      title: "Năm học",
      dataIndex: "schoolYear",
      align: "center",
      ...getColumnSearchProps("schoolYear"),
    },
    {
      title: "Học kỳ",
      dataIndex: "semester",
      align: "center",
    },

    {
      align: "center",
      title: "Hành động",
      dataIndex: "",
      key: "x",

      render: (record) => (
        <>
          {isShowAction ? (
            <ButtonGroup className="text-center">
              <Button
                className="text-lime-900  "
                onClick={() => handleBtnUser(record, false)}
              >
                Xem
              </Button>
              <Button
                className="text-orange-700 "
                onClick={() => handleBtnUser(record, true)}
              >
                Sửa
              </Button>
              <Button
                className="text-red-900 "
                onClick={() => handleDelete(record)}
              >
                Xóa
              </Button>
            </ButtonGroup>
          ) : isStudens ? (
            <ButtonGroup>
              <Button
                className="bg-lime-500 text-gray-100"
                onClick={() => handleCreateUserInClassroom(record)}
              >
                Tạo sinh viên
              </Button>
              <Button
                className="bg-lime-500 text-gray-100"
                onClick={() => handleOpenModalUpload(record)}
              >
                Import DSSV
              </Button>

              <Button
                className="bg-lime-500 text-gray-100"
                onClick={() =>
                  navigate("/admin/student-manager/students", {
                    state: record?.id,
                  })
                }
                // icon={<MenuUnfoldOutlined />}
              >
                Xem DSSV
              </Button>
            </ButtonGroup>
          ) : isActionQrcode ? (
            <>
              <Button
                className="bg-lime-500 text-gray-100"
                onClick={() =>
                  navigate("/admin/qr-code/create/", { state: record?.id })
                }
                // icon={<MenuUnfoldOutlined />}
              >
                Tạo QR điểm danh
              </Button>
            </>
          ) : isFaceRecognition ? (
            <>
              <Button
                className="bg-lime-500 text-gray-100"
                onClick={() => handleOpenModalShowQrCodes(record)}
              >
                Lịch sử điểm danh
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
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
  // const handleOpenCreateQR = (record) => {
  //   setIsOpenModalQR(true);
  //   setRecord(record);
  // };
  const handleOpenModalUpload = (record) => {
    setIsOpenUpload(true);
    setRecord(record);
  };
  const handleOpenModalShowQrCodes = async (record) => {
    setLoading1(true)
    setIsShowQrcodes(true);
    const res = await getQrcodesByClassroom(record?.id);
    setLoading1(false)
    setQrCodes(res != null ? res?.items : []);
    setIdClassroom(record?.id);
    console.log(res);
  };
  const handleCreateUserInClassroom = (record) => {
    setIdClassroom(record?.id);
    setIsCreateUser(true);
  };
  return (
    <div>
      <Table
      
        columns={columns}
        dataSource={data}
        loading={loading}
        // pagination={{
        //   pageSize: 20,
        // }}
        scroll={{
          y: 1000,
          x: 1000,
        }}
      />

      <ModalEditClassroom
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        record={record}
        isEdit={isEdit}
        handleGetListClassroom={handleGetListClassroom}
      />
      <ModalDeleteClassroom
        isOpen={isDelete}
        onCancel={() => setIsDelete(false)}
        record={record}
        handleGetListClassroom={handleGetListClassroom}
      />

      <ModalUploadFile
        isOpen={isOpenUpload}
        record={record}
        onCancel={() => setIsOpenUpload(false)}
      />
      <ModalCreateUser
        isOpen={isCreateUser}
        onCancel={() => setIsCreateUser(false)}
        idClassroom={idClassroom}
      />
      <ModalShowQrCodes
        isOpenModal={isShowQrCodes}
        loading={loading1}
        onCancel={() => setIsShowQrcodes(false)}
        data={qrCodes}
        idClassroom={idClassroom}
      />
    </div>
  );
}

export default TableShowInforClassroom;
