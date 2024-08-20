import React, { useEffect, useState } from 'react'
import "../../css/part.css"
import { Client, Databases, Query } from "appwrite";
import { Avatar, List } from 'antd';
import test from "../../img/logo.png"
function Partisipant(props) {
  let  queryParameters = new URLSearchParams(window.location.search)
  let [Partisipant,setpart]=useState([])
  const client_db = new Client();
  let projecis="65d05ade5e4d94659535"
  let db_id="65d05c1d373c79a07963"
  let coll="65d05c3305cb30f4225c"
  let  room = queryParameters.get("room")
  client_db
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d05ade5e4d94659535');

 useEffect(()=>{
  
 let han= async()=>{
  const databases = new Databases(client_db);

  let promise = await databases.listDocuments(
    db_id,
     `${room}user`,
    
  );
  setpart(promise)
 }

han()

const timer = setInterval(() => {
  han();
}, 1000); // 30 seconds interval

// Clear the timer when the component unmounts
return () => clearInterval(timer);
 },[])

  return (
    <div className="part">
      <h3 className='flex justify-start font-bold'>On the Call</h3>
     
      <List
    itemLayout="horizontal"
    dataSource={Partisipant.documents}
    renderItem={(item, index) => (
      
        <List.Item>
        <List.Item.Meta 
          avatar={<div   style={{
            backgroundColor: `#${item.color}`}} id="avatar_cont">
          <div id="name">
            {item.user_name.charAt(0)}
           </div>
        </div>}
          title={<span className='title flex justify-start text-base font-semibold'>{item.user_name}</span>}
          description={<span className='title flex justify-start '>{item.user_id}</span>}
         
        />
       
      </List.Item>

    )}
  />
     
     
     
      
      
    </div>
  );
}

export default Partisipant