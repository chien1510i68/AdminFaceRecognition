import { Button, Input, Modal, Space, Table } from "antd";
import React, { useRef, useState } from "react";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router";
function ModalShowQrCodes({ isOpenModal, onCancel, data, idClassroom , loading}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const navigate = useNavigate();
  // const [record , setRecord] = useS

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
      title: "Thời gian tạo",
      dataIndex: "createAt",
      align: "center",
      ...getColumnSearchProps("createAt"),
    },

    {
      title: "Thời gian kết thúc",
      dataIndex: "endTime",
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
        <Button
          onClick={() =>
            navigate("/admin/face-recognition/statistic", {
              state: record?.id,
              idClassroom: idClassroom,
            })
          }
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Modal
        open={isOpenModal}
        width={800}
        footer={null}
        onCancel={onCancel}
        maskClosable={false}
      >
        <Table
          columns={columns}
          loading={loading}
          dataSource={data}
          scroll={{
            y : 1200 ,
            x: 600
          }}
        />

        {/* <ModalEditQRCode
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          record={record}
          isEdit={isEdit}
        />
        <ModalDeleteQRCode
          isOpen={isDelete}
          onCancel={() => setIsDelete(false)}
          record={record}
        /> */}
      </Modal>
    </div>
  );
}

export default ModalShowQrCodes;
