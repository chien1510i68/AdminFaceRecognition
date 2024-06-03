import { ProFormUploadButton } from "@ant-design/pro-components";
import { Button, Modal, Spin, notification } from "antd";
import React, { useState } from "react";
import { updateClassroom } from "../../API/classroom";

function ModalUploadFile({ isOpen, record, onCancel }) {
  const [listFile, setListFile] = useState([]);
  const [fieldFile, setFieldFile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async (file) => {
    setLoading(true);
    console.log("file:: ", file.file);
    console.log("record:: ", record);
    const response = await updateClassroom(record?.id, file.file);
    console.log(response?.data);
    setLoading(false);
    if (response?.data?.success && response?.data?.data?.total > 0) {
      notification.success({
        message: `Đã cập nhật thành công ${response?.data?.data?.total} sinh viên vào lớp học`,
      });
      onCancel()
    } else {
      notification.error({
        message: "Không thể cập nhật sinh viên vào cơ sở dữ liệu",
      });
    }
  };

  const listFileRemoved = () => {
    // console.log(listFile);
    // const newList = listFile.filter((item) => item.status !== "removed");
    setListFile(null);
    notification.success({ message: "Xoá thành công " });
  };

  return (
    <Modal
      closeIcon={false}
      footer={null}
      open={isOpen}
      onCancel={onCancel}
      className="mx-auto text-center"
    >
      <h2 className="font-medium my-2 text-2xl">
        Thêm danh sách sinh viên vào lớp học{" "}
      </h2>
      <div className={` ${loading && "hidden"}`}>
        <ProFormUploadButton
          name="image"
          title="Upload list student in classroom"
          fileList={listFile}
          transform={(value) => {
            return {
              image: fieldFile || "", // cập nhật không upload file mới thì lấy giá trị value trong form
            };
          }}
          fieldProps={{
            listType: "picture-card",
            method: "POST",
            name: "file",
            customRequest: handleUpload,
            multiple: true,
            onRemove: listFileRemoved,
            openFileDialogOnClick: true,
            onChange: (file) => {
              console.log("file:: ", file);
            },
          }}
        />
        <p className="text-red-800">Lưu ý file gửi đi phải có đuôi xlsx</p>

        <Button
          className="block ml-auto hover:bg-green-300 "
          onClick={onCancel}
        >
          Đóng
        </Button>
      </div>
      <div
        className={`text-center my-4 ${!loading && "hidden"}
      `}
      >
        <Spin size="large" />
        <h2 className="mt-2 font-medium ">Đang cập nhật dữ liệu ....</h2>
      </div>

      {/* <Button onClick={handleTest}>Click me</Button> */}
    </Modal>
  );
}

export default ModalUploadFile;
