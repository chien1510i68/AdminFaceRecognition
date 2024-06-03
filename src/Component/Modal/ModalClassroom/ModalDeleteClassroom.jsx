import { Button, Modal, notification } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import React from "react";
import { deleteClassroom } from "../../API/classroom";

function ModalDeleteClassroom({
  isOpen,
  onCancel,
  record,
  handleGetListClassroom,
}) {
  return (
    <Modal open={isOpen} footer={null} onCancel={onCancel} closable={false}>
      <div role="alert" class="rounded border-s-4 border-red-500 bg-red-50 p-4">
        <strong class="block font-medium text-red-800"> Xóa sinh viên</strong>

        <p class="mt-2 text-sm text-red-700">
          Khi bạn đồng ý xóa lớp học {record?.nameClass} đồng nghĩa với việc xóa
          tất cả các thông tin chi tiết cũng như thông tin liên quan của lớp học
          này .Bao gồm cả các thông tin điểm danh
        </p>
        <ButtonGroup className="flex items-center justify-end mt-3">
          <Button className="mr-1" onClick={onCancel}>
            Hủy
          </Button>
          <Button
            onClick={async () => {
              const res = await deleteClassroom(record?.id);
              if (res?.data?.success) {
                notification.success({ message: "Xóa thành công lớp học" });
              } else {
                notification.error({ message: res?.data?.error?.message });
              }
              handleGetListClassroom();
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

export default ModalDeleteClassroom;
