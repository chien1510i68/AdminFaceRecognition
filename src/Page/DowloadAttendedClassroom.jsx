import { Button } from "antd";
import React from "react";
import { utils, writeFileXLSX } from "xlsx";
import { getAllUserAttendedInClassroom } from "../Component/API/classroom";
function DowloadAttendedClassroom({ qrId }) {
  const handleGetData = async () => {
    const res = await getAllUserAttendedInClassroom(qrId);
    if (res?.data?.success) {
      hanldeExportFile(res?.data?.data);
      console.log(res?.data?.data);
    }
  };

  const hanldeExportFile = (data) => {
    const newData = [];
    data.forEach((item) => {
      const newRow = {
        "Họ và tên": item?.userName,
        "Ngày sinh": item?.dob,
        "Mã sinh viên": item?.userCode,
        "Lớp hành chính": item?.classroom,
      };
      item.checkinUserDTOS.forEach((checkin, index) => {
        const value = !checkin?.attended
          // ? "X"
          // : checkin?.signature !== null
          // ? "Image"
          // : "V";

          ? "False" : "True"
        newRow[`Buổi học ${index + 1} ${checkin?.timeCreateQr}`] = value;
      });
      newData.push(newRow);
    });

    const ws = utils.json_to_sheet(newData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Khách hàng");
    writeFileXLSX(wb, "Lịch sử điểm danh.xlsx");
  };

  return (
    <div>
      <Button onClick={() => handleGetData()}>Dowload file </Button>
    </div>
  );
}

export default DowloadAttendedClassroom;

// import React, { useState } from "react";
// import { Button } from "antd";
// import { utils, writeFileXLSX } from "xlsx";
// import { getAllUserAttendedInClassroom } from "../Component/API/classroom";

// function DowloadAttendedClassroom() {
//   const [imageData, setImageData] = useState({}); // To store image data

//   const handleGetData = async () => {
//     const res = await getAllUserAttendedInClassroom(
//       "d2d23984-ecc0-40d8-963c-07a3a50c0ee7"
//     );
//     if (res?.data?.success) {
//         hanldeExportFile(res?.data?.data);
//       console.log(res?.data?.data);
//     }
//   };

//   const hanldeExportFile = (data) => {
//     const newData = [];
//     data.forEach((item) => {
//       const newRow = {
//         "Họ và tên": item?.userName,
//         "Ngày sinh": item?.dob,
//         "Mã sinh viên": item?.userCode,
//         "Lớp hành chính": item?.classroom,
//       };

//       item.checkinUserDTOS.forEach((checkin, index) => {
//         const value = !checkin?.attended
//           ? "X"
//           : checkin?.signature !== null
//           ? handleSignatureImage(checkin?.signature, item.id) // Pass item ID for image filename
//           : "V";
//         newRow[`Buổi học ${index + 1} ${checkin?.timeCreateQr}`] = value;
//       });
//       newData.push(newRow);
//     });

//     const ws = utils.json_to_sheet(newData);
//     const wb = utils.book_new();
//     utils.book_append_sheet(wb, ws, "Khách hàng");
//     writeFileXLSX(wb, "Danh sách khách hàng.xlsx");
//   };

//   const handleSignatureImage = async (signatureBase64, itemId) => {
//     const binaryData = atob(signatureBase64);
//     const blob = new Blob([binaryData], { type: "image/png" });

//     // Save image using item ID as filename
//     const imageName = `${itemId}_signature.png`;
//     const imageURL = await saveImage(blob, imageName);

//     // Update imageData with image URL
//     setImageData((prevImageData) => ({
//       ...prevImageData,
//       [itemId]: imageURL,
//     }));

//     // Return image URL for Excel cell
//     return imageURL;
//   };

//   const saveImage = async (blob, imageName) => {
//     // Implement image saving logic here
//     // This could involve using a file storage service or saving to local storage (if temporary)
//     // Return the saved image URL
//   };

//   return <Button onClick={() => handleGetData()}>Dowload file</Button>;
// }

// export default DowloadAttendedClassroom;
