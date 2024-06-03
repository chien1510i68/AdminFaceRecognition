import { Button, Modal } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import React from "react";
import { handleDeleteUser } from "../../HandleLogic/HandlelogicUser";


function ModalDeleteQRCode({ isOpen, onCancel, record }) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel} closable={false}>
      <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <strong class="block font-medium text-red-800"> Xóa sinh viên</strong>

        <p class="mt-2 text-sm text-red-700">
          Khi bạn đồng ý xóa lớp học {record?.nameClass} đồng nghĩa với việc
          xóa tất cả các thông tin chi tiết cũng như thông tin liên quan của lớp học này 
          .Bao gồm cả các thông tin điểm danh
        </p>
        <ButtonGroup className="flex items-center justify-end mt-3">
          <Button className="mr-1" onClick={onCancel}>
            Hủy
          </Button>
          <Button
            onClick={() => {
              handleDeleteUser(record?.key);
              onCancel();
            }}
          >
            Đồng ý
          </Button>
        </ButtonGroup>
      </div>
    </Modal>
  );
}

export default ModalDeleteQRCode;
