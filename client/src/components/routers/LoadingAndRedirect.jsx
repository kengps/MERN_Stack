import React from 'react'
import { useState ,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const LoadingAndRedirect = () => {

    //กำหนดค่า 3 = 3 วินาที
    const [count , setCount] = useState(3)
    const navigate = useNavigate();
    
    useEffect(() => {
        // setInterval จะเป็นการนับถอยหลัง  3 2 1
        const interval = setInterval(()=>{
            //กำหนด setCount ไว้ = 3 จะให้ทำการนับถอยหลังทุุกๆ 1 วิ
            setCount((currentCount) =>  --currentCount )
        },1000)
        // หาก state เหลือ 0 เมื่อไหร่ ให้ทำการเปลี่ยนหน้าไปหน้า login
        count === 0 && navigate('/logged');
        
        // ทำการเคลียร์ค่าของ setInterval
        return () => clearInterval(interval) 

    },[count])
  return (
    <div><h1>จะให้ทำการนับถอยหลังในอีกเพื่อพาท่านไปยังหน้า  login ในอีก  {count} วินาที</h1></div>
  )
}

export default LoadingAndRedirect