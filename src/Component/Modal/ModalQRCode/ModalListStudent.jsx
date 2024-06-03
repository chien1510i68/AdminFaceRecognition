import { Modal, notification } from "antd";
import React, { useEffect, useState } from "react";
import TableShowListStudentInQrCode from "../../Table/TableShowListStudentInQrCode";
import { getListUserByQrCode } from "../../API/classroom";

function ModalListStudent({ isOpen, onCancel, data }) {
  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      width={1000}
      destroyOnClose={true}
      footer={null}
      maskClosable={false}
    >
      <TableShowListStudentInQrCode handleSetListStudent={null} data={data} />
    </Modal>
  );
}

export default ModalListStudent;
