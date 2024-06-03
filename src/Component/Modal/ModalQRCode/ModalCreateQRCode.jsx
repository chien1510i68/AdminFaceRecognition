import {
  Button,
  Form,
  Modal,
  QRCode,
  Radio,
  Spin,
  TimePicker,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import { createQRCode, setStatusActive } from "../../API/qr-code";
import PageStatisticFaceRecogniton from "../../../Page/PageStatisticFaceRecogniton";
import { useLocation, useNavigate } from "react-router";
import Cookies from "js-cookie";

function ModalCreateQRCode(props) {
  const [position, setPosition] = useState(null);
  const [idQr, setIdQr] = useState(null);
  const [isShowQr, setIsShowQr] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [isNormal, setIsNormal] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const userCode = Cookies.get("userCode");
  const classroomId = location.state;

  const config = {
    rules: [
      {
        footer: null,
        type: "object",
        required: true,
        message: "Please select time!",
      },
    ],
  };
  const handleChangeIsNormal = (e) => {
    console.log(e.target.value);
    setIsNormal(e.target.value);
  };
  const handleUpdateQR = (id) => {
    setStatusActive({ qrCodeId: id, active: false })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setPosition(position);
      setLongitude(position.coords.longitude);
      setLatitude(position.coords.latitude);
    });
    // console.log(position.coords.longitude);
  }, []);

  const onFinish = (values) => {
    setLoading(true);
    const data = {
      classroomId: classroomId,
      userCreateById: userCode,
      limitedTime: values["limitedTime"].format("HH:mm:ss"),

      longitude: longitude,
      latitude: latitude,
      normal: isNormal,
    };
    console.log(data);
    createQRCode(data).then((res) => {
      console.log(res);
      setLoading(false);
      if (res?.data?.success) {
        notification.success({ message: "Tạo thành công mã điểm danh" });
        setIdQr(res?.data?.data?.id);
        setIsShowQr(true);
      } else {
        setLoading(false);

        // notification.success({ message: "Tạo thành công mã điểm danh" });
        notification.error({ message: res?.data?.error?.message });
      }
    });
    // console.log("values", values);
    // console.log("limitedTime", values["limitedTime"].format("HH:mm:ss"));
  };
  // const downloadQRCode = () => {
  //   const canvas = document.getElementById("myqrcode")?.querySelector("canvas");
  //   if (canvas) {
  //     const url = canvas.toDataURL();
  //     const a = document.createElement("a");
  //     a.download = "QRCode.png";
  //     a.href = url;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   }
  // };

  const downloadQRCode = () => {
    const canvas = document.getElementById('myqrcode')?.querySelector('canvas');
    if (canvas) {
      const qrCodeWidth = canvas.width;
      const qrCodeHeight = canvas.height;
      const borderSize = 20;
      const newCanvas = document.createElement('canvas');
      newCanvas.width = qrCodeWidth + borderSize * 2;
      newCanvas.height = qrCodeHeight + borderSize * 2;
      const ctx = newCanvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, newCanvas.width, newCanvas.height); 
      ctx.drawImage(canvas, borderSize, borderSize, qrCodeWidth, qrCodeHeight);
      const url = newCanvas.toDataURL();
      const a = document.createElement('a');
      a.download = 'QRCode.png';
      a.href = url;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };
  
  return (
    <div className="mt-10">
      <div className=" ">
        <Button
          className="block text-left bg-lime-200"
          onClick={() => navigate("/admin/qr-code/home")}
        >
          Quay lại trang trước
        </Button>
        <h2 className="text-center text-xl mb-4 font-medium">Tạo mã QR </h2>
        <Form
          className="w-full grid grid-cols-2 gap-3 "
          layout="vertical"
          onFinish={onFinish}
          destroyOnClose={true}
        >
          <Form.Item
            name="limitedTime"
            label="Thời gian ( giờ | phút | giây )"
            className="tablet:col-span-1 phone:col-span-2"
            {...config}
          >
            <TimePicker className="block mr-auto w-[80%]" />
          </Form.Item>
          <Form.Item
            label="Chọn loại QR"
            className="tablet:col-span-1 phone:col-span-2 mr-auto"
            name="isNormal"
          >
            <Radio.Group
              className=""
              onChange={handleChangeIsNormal}
              defaultValue={true}
              value={isNormal}
            >
              <Radio value={true}> Điểm danh bình thường</Radio>
              <Radio value={false}> Điểm danh khuôn mặt</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="Vị trí hiện tại của bạn:" className="tablet:col-span-1 phone:col-span-2">
            {position ? (
              <div className="flex ">
                <p>
                  {" "}
                  <b>Kinh độ :</b> {position.coords.longitude}
                </p>
                <p className="tablet:ml-5 phone:ml-0">
                  <b>Vĩ độ:</b> {position.coords.latitude}
                </p>
              </div>
            ) : (
              <h2>Không tìm thấy vị trí</h2>
            )}
          </Form.Item>
          <Form.Item className="tablet:col-span-1 phone:col-span-2">
            {!isShowQr && (
              <h2 className="text-left">
                <b> Lưu ý : </b>
                <br />
                Khi tạo mã Qr điểm danh nên đặt thời gian ngắn hơn 00:02:00 phút
                nếu là mã Qr điểm danh bình thường <br /> Nếu là điểm danh khuôn
                mặt nên để thời gian dài hơn
              </h2>
            )}
          </Form.Item>
          <Form.Item className="col-span-2 flex justify-end mt-8">
            <Button className="mr-2 bg-red-300 ">Cancel</Button>
            <Button className="bg-lime-300" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>

        <div>
          <hr className="mb-5" />
          {isShowQr && (
            <div id="myqrcode" className="text-center block mx-auto  ">
              <QRCode
                className="mx-auto  mb-4"
               
                value={`${idQr}/${isNormal}`}
                bgColor="#ffffff"
              />
              <div>
                <Button onClick={downloadQRCode}>Download</Button>
                <Button
                  className="ml-3 bg-red-300"
                  onClick={() => handleUpdateQR(idQr)}
                >
                  Vô hiệu hóa QR
                </Button>
              </div>

              <hr className="mt-3" />
            </div>
          )}
        </div>

        {isShowQr && (
          <div className="mt-10">
            <PageStatisticFaceRecogniton id={idQr} />
          </div>
        )}
      </div>
      <Modal open={loading} footer={null} closeIcon={false}>
        {/* <div className={`my-4 ${!loading && "hidden"}`}> */}
        <div className="text-center ">
          <Spin size="large" />
          <h2 className="mt-2 font-medium ">Đang cập nhật dữ liệu ....</h2>
        </div>
      </Modal>
    </div>
  );
}
export default ModalCreateQRCode;
