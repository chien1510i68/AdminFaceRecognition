import React, { useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import { statisticQrInClassroom } from "../Component/API/classroom";
import { Spin } from "antd";

function ChartStatistical({ data, loading }) {
  const config = {
    data: data,
    yField: "quantity",
    xField: "time",
    colorField: "type",
    group: true,
    scrollbar: {
      x: {
        ratio: 1.5,
      },
    },
  };

  return (
    <>
      <div className={`text-center ${!loading && "hidden"}`}>
        <Spin />
        <h2>Đang tải dữ liệu</h2>
      </div>
      <div className={`${loading && "hidden"}`}>
        <Column {...config} />
        <h2 className="mt-4 ">Biểu đồ thống kê điểm danh lớp học </h2>
        <h2 className="text-base font-medium text-left ">
          Ghi chú về lớp học :
        </h2>
      </div>
    </>
  );
}

export default ChartStatistical;
