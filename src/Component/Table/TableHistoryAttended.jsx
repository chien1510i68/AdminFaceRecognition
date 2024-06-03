import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Space,
  Table,
  Tooltip,
  message,
  notification,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { getHistoryAttendedByClassroom } from "../API/users";
import { CheckOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { getAllUserAttendedInClassroom } from "../API/classroom";

function TableHistoryAttended({ qrCodeId }) {
  const { form } = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [loading, setLoading] = useState(false);
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
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
      dataIndex: "classroom",
      align: "center",
      ...getColumnSearchProps("classroom"),
    },
    {
      align: "center",
      title: "Lịch sử điểm danh",
      dataIndex: "",
      key: "x",
      columnWidth: 200,
      //   render: (record) => <CustomRender record={record} />,
      render: (record) => (
        <>
          <Space wrap>
            {record?.checkinUserDTOS &&
              record?.checkinUserDTOS.map((item) => (
                <Tooltip
                  title={
                    <>
                      <p>Buổi học ngày {item?.timeCreateQr}</p>
                      {item?.attended && (
                        <p>Điểm danh lúc {item?.timeAttended}</p>
                      )}
                      {item?.signature && (
                        <>
                          <Image
                            src={`data:image/png;base64,${item?.signature}`}
                          />
                        </>
                      )}
                    </>
                  }
                  color={item?.attended ? "#87d068" : "#d53939"}
                  key={item?.timeCreateQr}
                >
                  <div
                    className={`${
                      item?.signature != null ? "border-[1px]" : ""
                    }  overflow-hidden border-green-300 rounded-full`}
                  >
                    {/* <CheckOutlined
                  className={`p-1 rounded-xl  border ${
                    item?.attended ? "bg-lime-400" : "bg-red-300"
                  } text-gray-800`}
                /> */}
                    {item?.signature != null ? (
                      <Image
                        src={`data:image/png;base64,${item?.signature}`}
                        width={40}
                        height={40}
                        className=" border-1px rounded-full overflow-hidden "
                      />
                    ) : (
                      <CheckOutlined
                        className={`p-1 rounded-xl  border ${
                          item?.attended ? "bg-lime-400" : "bg-red-300"
                        } text-gray-800`}
                      />
                    )}
                  </div>
                </Tooltip>
              ))}
          </Space>
        </>
      ),
    },
  ];

  const handleGetData = async () => {
    setLoading(false);
    const res = await getAllUserAttendedInClassroom(qrCodeId);

    console.log(res?.data);
    if (res?.data?.success) {
      setData(res?.data?.data);
    }
  };
  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        scroll={{
          y: 1200,
          x: 800,
        }}
      />
    </div>
  );
}

export default TableHistoryAttended;
