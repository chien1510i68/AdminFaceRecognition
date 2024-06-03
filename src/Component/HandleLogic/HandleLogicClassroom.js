import { getListClassroom } from "../API/classroom";

export const handleGetClassrooms = () =>{
    getListClassroom().then((res) =>{
        console.log(res);
    }).catch((err) =>{console.log(err)})
}

export const handleDeleteClassroom = (id) =>{
    
}
