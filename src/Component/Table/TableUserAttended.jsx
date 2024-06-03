import { Button, Form, Input, Modal, Space, Table, notification } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import TextArea from "antd/es/input/TextArea";
import React, { useRef, useState } from "react";
import { deleteFaceRecognition, updateCheckin } from "../API/checkins";

import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

function TableUserAttended({ data, handleGetData,loading }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [valueNote, setValueNote] = useState(null);
  const [isOpenModalNote, setIsOpenModalNote] = useState(false);
  const [idCheckin, setIdCheckin] = useState(null);
  const { form } = Form.useForm();
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
      dataIndex: "userName",
      align: "left",
      ...getColumnSearchProps("userName"),
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
      dataIndex: "className",
      align: "center",
      ...getColumnSearchProps("className"),
    },

    {
      title: "Thời gian",
      dataIndex: "time",
      align: "center",
    },

    // {
    //   title: "Trạng thái",
    //   dataIndex: "confirmed",
    //   align: "center",
    //   render: (record) => (
    //     <>{(record?.status ==="Yes") ?   <p>Chưa điểm danh </p> :<p>Đã điểm danh</p>}</>
    //   ),
    // },
    {
      align: "center",
      title: "Hành động",
      dataIndex: "",
      // key: "x",
      render: (record) => (
        <Button
          className="bg-lime-100 text-slate-900"
          onClick={() => {
            setIsOpenModalNote(true);
            setIdCheckin(record?.id);
          }}
        >
          Ghi chú
        </Button>
      ),
    },

    {
      align: "center",
      title: "Hành động",
      dataIndex: "",
      key: "x",
      render: (record) => (
        <Button
          className="bg-red-300 text-slate-900"
          onClick={() => {
            handleDeleteFaceRecognition(record?.id);
          }}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const handleDeleteFaceRecognition = (id) => {
    deleteFaceRecognition(id).then((res) => {
      if (res?.data?.success) {
        notification.success({
          message: "Đã xóa phiên điểm danh khỏi buổi học",
        });
        handleGetData();
      } else {
        notification.error({
          message: "Cos lỗi khi xóa phiên điểm danh khỏi buổi học",
        });
      }
      //   console.log("Xóa thành công người dùng", res);
    });
  };
  const handleUpdate = async () => {
    // setIsOpenModalNote(true);
    const data = {
      checkinId: idCheckin,
      note: valueNote,
    };

    const res = await updateCheckin(data);
    if (res?.data?.success) {
      notification.success({ message: "Ghi chú đã được lưu lại" });
      setIsOpenModalNote(false);
    } else {
      notification.error({ message: "Có lỗi khi lưu lại ghi chú" });
    }
    // console.log(res?.data);
  };

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        loading={loading}
        scroll={{
          y: 1200,
          x: 800,
        }}
      />
      <Modal
        open={isOpenModalNote}
        onCancel={() => setIsOpenModalNote(false)}
        maskClosable={false}
        closeIcon={false}
        destroyOnClose={true}
        footer={null}
      >
        <h2 className="text-base font-medium text-center my-5">
          Thông tin ghi chú
        </h2>
        <Form
          onFinish={handleUpdate}
          form={form}
          autoComplete="off"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item name={"valueNote"}>
            <TextArea
              value={valueNote}
              onChange={(e) => setValueNote(e.target.value)}
              placeholder="Nhập ghi chú"
              autoSize={{
                minRows: 2,
              }}
            />
          </Form.Item>
          <Form.Item>
            <ButtonGroup className="flex justify-end my-5">
              <Button
                onClick={() => setIsOpenModalNote(false)}
                className="bg-red-100 mr-4"
              >
                Hủy
              </Button>
              <Button htmlType="submit" className="bg-lime-100">
                Lưu
              </Button>
            </ButtonGroup>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default TableUserAttended;
