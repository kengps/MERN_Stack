import React from 'react'
import { useSelector } from 'react-redux'
import LoadingAndRedirect from './LoadingAndRedirect'


//{children} คือ ค่าของ component ที่อยู่ใน PageUser  เนื่องจากโดน UserRouter ครอบอยู่
const UserRouter = ({children}) => {
    //{user} คือข้อมูลที่อยู่ใน store redux โดยให้ useSelector เป็นตัวเรียก โดยให้นำ state มาทั้งหมด state ก็คือข้อมูล
    const {user} = useSelector((state) => ({...state}))
    
    // retrun ว่า มีข้อมูล user และมี token หรือไม่ ถ้ามี ให้ไปหน้า page ถ้าไม่มีให้ไปหน้า redirect
  return  user && user.token ? children : <LoadingAndRedirect/>
}

export default UserRouter