import React from 'react'
import { Client, Databases, Query } from "appwrite";
import "../../css/chat.css"
import { useEffect, useState } from 'react'
import sent from "../../img/message.png"
import Message from './Message';

import { ID } from 'appwrite';
function Chat() {
   let  queryParameters = new URLSearchParams(window.location.search)
   let  room = queryParameters.get("room")
let sto=JSON.parse(sessionStorage.getItem("user"))
   function formatTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
   
      return `${hours}:${minutes}`;
   }

   let [Partisipant,setpart]=useState([])
  const client_db = new Client();
  let projecis="65d05ade5e4d94659535"
  let db_id="65d05c1d373c79a07963"
  

  client_db
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d05ade5e4d94659535');
    const databases = new Databases(client_db);
 useEffect(()=>{
  
 let han= async()=>{
  

  let promise = await databases.listDocuments(
    db_id,
    `${room}msg`,
    
  );
  setpart(promise)
 }

han()

const timer = setInterval(() => {
  han();
}, 500); // 30 seconds interval

// Clear the timer when the component unmounts
return () => clearInterval(timer);
 },[])

  return (
    <div className='chat'>
        <div className='chat__msg'>
         {Partisipant.documents&&Partisipant.documents.map(user=>{
            return (<Message msg={user}></Message>)
         })}   
         



        </div>
        <div className='message__input'>

        
            <form onSubmit={async(e)=>{
               e.preventDefault()
               
               const resulta =await databases.createDocument(
                  db_id,
                  `${room}msg`,
                  ID.unique(),
                 {"body":e.target[0].value,"user_id":sto.user_id,"user_name":sto.user_name,"color":sto.color,"time":formatTime()}
              );
              e.target.reset()
              console.log("sent")
              
               
            }}><input type="text"  class="focus:ring-0 focus:ring-offset-0   bg-gray-50  border-gray-300 text-gray-900 text-sm rounded-lg   block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Send a messasge" required/>
            <button className='sent'><img   src={sent}/></button></form>

        </div>

    </div>
  )
}


export default Chat
