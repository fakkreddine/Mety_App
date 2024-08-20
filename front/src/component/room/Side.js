import React, { useEffect } from 'react'
import { Divider } from 'antd';
import "../../css/side.css"
import { Badge} from 'antd';
import close from "../../img/delete.png"
import Partisipant from './Partisipant';
import Chat from './Chat';
import { useState } from 'react';
import { resize,setshareredux ,endvedio,re,closestate  } from '../../Redux/Global'
import { Client, Databases, Query } from "appwrite";
import { useSelector, useDispatch } from 'react-redux'
import { Await } from 'react-router-dom';
function Side() {
  const dispatch = useDispatch()
  let [countuser,setcount]=useState([])
  let [tab,settab]=useState(<Partisipant ></Partisipant>);
  let [active,setactive]=useState("tab --focus");
  let [active2,setactive2]=useState("tab");
  let count = useSelector((state) => state.counter.allusers)
  const client_db = new Client();
  let projecis="65d05ade5e4d94659535";
  let db_id="65d05c1d373c79a07963"
  let coll="65d05c3305cb30f4225c"
  let  queryParameters = new URLSearchParams(window.location.search)
  client_db
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d05ade5e4d94659535');
    let  room = queryParameters.get("room")
 useEffect(()=>{
  
 let han= async()=>{
  const databases = new Databases(client_db);

  let promise = await databases.listDocuments(
    db_id,
    `${room}user`,
    
  );
  setcount(promise)
 }



const timer = setInterval(() => {
  han();
}, 1000); // 30 seconds interval

// Clear the timer when the component unmounts
return () => clearInterval(timer);
 },[])

  return (
    
    <div className='side'>
        <div className='header'>
    <button className='b'  onClick={()=>{
    
       dispatch(closestate())
    }}><img className='close' src={close}></img></button>
       
            <button className={active} onClick={()=>{
              settab(<Partisipant ></Partisipant>)
              setactive("tab --focus")
              setactive2("tab")
              
              

            }}>Participants  <Badge count={countuser.total} showZero color='red' /></button>
            <button className={active2} onClick={()=>{
              settab(<Chat></Chat>)
              setactive("tab")
              setactive2("tab --focus")
              


            }}>Chat</button>
        </div>
        
        {tab}

    </div>
  )
}

export default Side