import { Button, Image, Modal, Spin } from "antd";
import React, { useEffect, useState } from "react";

function ModalShowImages({ isOpen, images, onCancel, loading }) {
  return (
    <Modal
      open={isOpen}
      onCancel={onCancel}
      destroyOnClose={true}
      width={800}
      maskClosable={false}
      footer={null}
      closeIcon={false}
    >
      <div className={`text-center my-5 ${!loading && "hidden"}`}>
        <Spin />
        <h2 className="mt-3">Đang tải dữ liệu ...</h2>
      </div>
      <div className={`${loading && "hidden"}`}>
        <h2 className="text-center uppercase font-medium text-base my-3">
          Hình ảnh sinh viên
        </h2>
        <div className="grid grid-cols-5 gap-1">
          {images &&
            images.map((image) => (
              <div className="col-span-1">
                <Image src={`data:image/jpeg;base64,${image?.image}`} alt="" />
                <h2 className="text-center">{image.name}</h2>
              </div>
            ))}
        </div>
        {images === null && (
          <h2 className="text-center text-red-400">
            Sinh viên chưa có hình ảnh nào{" "}
          </h2>
        )}

        <Button className="block ml-auto" onClick={() => onCancel()}>
          Đóng
        </Button>
      </div>
    </Modal>
  );
}

export default ModalShowImages;
