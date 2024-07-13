import request from "./request";
//
export const getListClassroom = (userCode) => {
  const response = request
    .get(`classroom/by-admin/${userCode}`)
    .then((res) => {
      console.log(res?.data?.data);
      if (res?.data?.success === true) {
        return res?.data?.data;
      } else {
        return null;
      }
    })
    .catch((err) => {
      console.log("xuất hiện lỗi khi lấy danh sách ", err);
    });
  return response;
};

//
export const getClassroomByID = (id) => {
  const response = request
    .get(`classroom/${id}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

//
export const getListUserByQrCode = (id) => {
  return request.get(`face_recognition/qr/${id}`);
};

//
export const updateClassroom = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);
  return request.put(`classroom/${id}`, formData);
};

//
export const getListUserInClassroom = (id) => {
  const response = request
    .get(`classroom/students/${id}`)
    .then((res) => {
      if (res?.data?.success) {
        return res?.data?.data?.items;
      }
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};

//
export const deleteUserInClass = (data) => {
  return request.post(`classroom/user`, data);
};

//
export const statisticQrInClassroom = async (id) => {
  const res = await request.get(`classroom/statistic/${id}`);
  return res?.data?.success ? res?.data?.data : null;
};

//
export const createClassroom = async (data) => {
  const res = await request.post("classroom/", data);
  return res?.data;
};
export const editClassroom = async (data) => {
  const res = await request.put("classroom/update", data);
  return res?.data?.success;
};

export const deleteClassroom = async (id) => {
  const res = await request.delete(`classroom/${id}`);
  return res;
};

export const addUserInClassroom = async (data, id) => {
  const res = await request.put(`classroom/user/${id}`, data);
  return res;
};

export const getAllUserAttendedInClassroom = async(id) =>{
  const res = await request.get(`checkins/attended_classroom/${id}`)
  return res 
}