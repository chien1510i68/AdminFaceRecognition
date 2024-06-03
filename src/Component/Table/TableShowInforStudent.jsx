
import { Button, Input, Popover, Space, Table } from "antd";
import React, { useRef, useState } from "react";

import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getImages } from "../API/users";
import ModalDeleteUser from "../Modal/ModalUser/ModalDeleteUser";
import ModalEditUser from "../Modal/ModalUser/ModalEditUser";
import ModalShowImages from "../Modal/ModalUser/ModalShowImages";
function TableShowInforStudent({
  handleSetListStudent,
  data,
  loading,
  inClassroom,
  handleDeleteUserInClass,
  handleGetData,
}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [record, setRecord] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showImages, setShowImages] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [images, setImages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loadingImage , setLoadingImage] = useState(false)
  const searchInput = useRef(null);
  const handleGetImages = async (userCode) => {
    setLoadingImage(true)
    const res = await getImages(userCode);
    setLoadingImage(false)
    if (res?.data?.images != []) {
      const demo = res?.data?.images?.map((item) => {
        return {
          name: item?.file_name?.split("/")[1],
          image: item?.encoded_image,
        };
      });
      setImages(demo);
    } else {
      setImages([]);
    }
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    handleSetListStudent(newSelectedRowKeys);
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
      title: "Họ và tên",
      dataIndex: "fullName",
      align: "left",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      align: "center",
      // ...getColumnSearchProps('name'),
    },
    {
      title: "Mã sinh viên",
      dataIndex: "userCode",
      align: "center",
      ...getColumnSearchProps("userCode"),
    },
    {
      title: "Lớp",
      dataIndex: "classname",
      align: "center",
      ...getColumnSearchProps("classname"),
    },
    // {
    //   title: "Quê quán ",
    //   dataIndex: "address",
    //   align: "center",
    // },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      align: "center",
      ...getColumnSearchProps("phoneNumber"),
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
              <>
                {!inClassroom ? (
                  <Button
                    className="bg-red-900 text-zinc-200"
                    onClick={() => handleDelete(record)}
                    icon={<DeleteOutlined />}
                  >
                    Xóa sinh viên
                  </Button>
                ) : (
                  <Button
                    className="bg-red-900 text-zinc-200"
                    onClick={() => handleDeleteUserInClass(record?.id)}
                    icon={<DeleteOutlined />}
                  >
                    Xóa sinh viên khỏi lớp
                  </Button>
                )}
                <Button
                  onClick={() => {
                    setShowImages(true);
                    handleGetImages(record?.userCode);
                  }}
                >
                  Xem ảnh
                </Button>
              </>
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
  ];

  return (
    <div className="">
      <Table
      loading={loading}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        scroll={{
          y: 1200,
          x: 800,
        }}
      />

      <ModalEditUser
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        record={record}
        isEdit={isEdit}
        handleGetData={handleGetData}
      />
      <ModalDeleteUser
        isOpen={isDelete}
        onCancel={() => setIsDelete(false)}
        record={record}
      />
      <ModalShowImages
      loading={loadingImage}
        isOpen={showImages}
        onCancel={() => setShowImages(false)}
        images={images}
      />
    </div>
  );
}
export default TableShowInforStudent;
