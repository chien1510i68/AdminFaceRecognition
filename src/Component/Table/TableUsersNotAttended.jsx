import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import React, { useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { createCheckins } from "../API/checkins";

function TableUsersNotAttended({ data, handleGetData, qrId ,loading}) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
      title: "Họ và tên",
      dataIndex: "fullName",
      align: "left",
      ...getColumnSearchProps("fullName"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      align: "center",
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

    {
      align: "center",
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button
          className="bg-green-200"
          onClick={() => handleAddCheckin(record)}
        >
          Điểm danh
        </Button>
      ),
    },
  ];
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleAddCheckin = (record) => {
    console.log(record);
    createCheckins({
      userName: record?.fullName,
      userCode: record?.userCode,
      qrCode: qrId,
      dob: record?.dob,
    }).then((res) => {
      if (res?.data?.success) {
        notification.success({
          message: `Sinh viên ${record?.fullName} đã được điểm danh `,
        });
        handleGetData();
      } else {
        notification.error({ message: "Không thể thực hiện điểm danh" });
      }
    });
  };

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        loading={loading}
        dataSource={data}
        scroll={{
          y: 1200,
          x: 800,
        }}
      />
    </div>
  );
}
export default TableUsersNotAttended;
