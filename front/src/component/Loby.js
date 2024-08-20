import React, { useEffect } from 'react'
import Nav from './Nav'
import Side from './room/Side'
import "../css/loby.css"
import Footer from './Footer'
import MeetingNav from "./room/MeetingNav"
import VedioCont from './VedioCont'
import { useNavigate } from 'react-router-dom';

function Loby() {
  let layout=(<><MeetingNav></MeetingNav><div className='screen'><VedioCont></VedioCont> </div></>)
  const navigate = useNavigate();
  let name=sessionStorage.getItem("name")
 // useEffect(()=>{
//if(!name){
 // navigate('/')

//}
 // },[])
  return (
     <>
     {layout}
    
    
   
    
    </>
  )
}

export default Loby