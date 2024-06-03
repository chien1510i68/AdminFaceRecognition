import React, { useEffect, useState } from 'react';
import { getListClassroom } from '../Component/API/classroom';
import TableShowInforClassroom from '../Component/Table/TableShowInforClassroom';

function PageQrCode(props) {
    const [data , setData] = useState([])
    const [loading , setLoading] = useState(true)
    useEffect(() =>{
    getListClassroom().then((res) => {
        setLoading(false)
        console.log(res);
        setData(res?.items);
      });
    },[])
    return (
        <div className='my-6'>
            <h2 className='font-medium text-xl uppercase mt-8 mb-6'>Trang quản lý danh sách mã QR</h2>
           
            {/* <TableShowInforQRCode data={data}/> */}
            <TableShowInforClassroom data={data} loading={loading} isActionQrcode={true} />
        </div>
    );
}

export default PageQrCode;