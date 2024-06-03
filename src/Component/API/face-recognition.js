import request from "./request";


export const getUsersNotAttended = (id) => {
  const response = request
    .get(`qr/filter/${id}`)
    .then((res) => {
      console.log(res?.data?.data?.items);
      return res?.data?.success ? res?.data?.data?.items : null;
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
};


export const updateFaceRecognition = ( id , data) =>{
    const response = request.put(`face_recognition/${id}` , data).then((res) =>{
        console.log(res);
    }).catch((err) =>{
        console.log(err);
    })
    return response

} 