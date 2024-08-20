import React, { useEffect, useRef, useState } from 'react'
import "../css/vedio.css"
import vedio from "../img/f.mp4"
import { useSelector, useDispatch } from 'react-redux'
import { useSearchParams } from "react-router-dom"
import AgoraRTC, { RemoteUser } from "agora-rtc-react/dist/agora-rtc-react";
import { ID } from 'appwrite'
import {config} from "../AgoraSetting"
import Vedi from './Vedi'
import { resize,seusers,endvedio} from '../Redux/Global'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom';

import { Client, Databases, Query } from "appwrite";
import { data } from 'autoprefixer'
import axios from 'axios'

function VedioCont() {let count = useSelector((state) => state.counter.value)
  const client_db = new Client();
  let projecis="65d05ade5e4d94659535"
  let db_id="65d05c1d373c79a07963"
  let coll="65d05c3305cb30f4225c"

  client_db
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d05ade5e4d94659535')

   


  let share = useSelector((state) => state.counter.shareValue)
  let call = useSelector((state) => state.counter.encall)
  let  queryParameters = new URLSearchParams(window.location.search)
  let  room = queryParameters.get("room")
  let  token = decodeURIComponent(queryParameters.get("token"))
  
  console.log(token)
  const navigate = useNavigate();
  let name=sessionStorage.getItem("name")
  if (!room) {
    room='main'
    
  }

  const dispatch = useDispatch()
  const appId ="f74c9f2bc19849b5b2a2df2aac5db369"
  
  const client=AgoraRTC.createClient({mode:'rtc',codec:'vp8'})
  
  let [users,setusers]=useState([])
  let [localTracks,setlocalTracks]=useState([])
  let [style,setstyle]=useState(" focus   --hide")
  let [notstyle,notsetstyle]=useState("vedio --vedioFocus")
  let [isjoined,setjoin]=useState(false)
  const handeljoin=async(user,media)=>{
  await client.subscribe(user,media)
  
  if(media==="video"  ){
    setusers(prev=>prev.reverse().filter((u)=>u.uid!==user.uid))
    setusers(pre=>[...pre,user])
    
    
    dispatch(seusers())
      
      
      
      
     
      
    
    
  }
  

  }
  const handelleft=(user)=>{
    setusers(prev=>prev.filter((u)=>u.uid!==user.uid))
        dispatch(resize(null))

        
    
  }
let [localscreeusers,setloaclscreen]=useState([])

let [localshare,setlocal]=useState(null)




let handeshare=async()=>{
  const newclient=AgoraRTC.createClient({mode:'rtc',codec:'vp8'})
  let uid = await newclient.join(appId,room,token,null)
  if (share==true) {
   
    
    setloaclscreen(uid)
    let tracks=await AgoraRTC.createScreenVideoTrack()
    setlocal(tracks)
    
    
   
    await newclient.publish(tracks)
   
   
    
  }else{
    if(localshare!=null){
      
       await localshare.close()
       await localshare.stop()
       await newclient.unpublish(localshare)
       await newclient.leave()

     
       setusers(prev=>prev.filter((u)=>u.uid!==localscreeusers))
    
      
      
    }
   
  }

}

let id=ID.unique()
useEffect(()=>{
  handeshare()
},[share])






const databases = new Databases(client_db);
  useEffect(()=>{
    let init=async()=>{
      try {
        let respmsg= await  axios.get(`https://7713-102-106-196-61.ngrok-free.app/createdb?name=${room}msg&type=chat`, {
          timeout: 2000, // timeout in milliseconds
        })
        let respuser= await  axios.get(`https://7713-102-106-196-61.ngrok-free.app/createdb?name=${room}user&type=user`,{
          timeout: 2000, // timeout in milliseconds
        })
        
      }
      catch(err) {
       
      }
    
    client.on('user-published',handeljoin)
     client.on('user-left',handelleft)
     client.on('user-unpublished',handelleft)
     
    
    
      if (!isjoined){

      
        let uid=await client.join(appId,room,token,null)
        sessionStorage.setItem("uid",uid);
        let tracks =await AgoraRTC.createMicrophoneAndCameraTracks()
      
         const [audioTrack, videoTrack] = tracks;
       
       setlocalTracks(tracks)
       setusers((previousUsers) => [
         ...previousUsers,
         {
           uid,
           videoTrack,
           audioTrack,
         },
       ]);
       dispatch(resize({
         uid,
         videoTrack,
         audioTrack,
       }))
       client.publish(tracks)
       dispatch(seusers())
       setjoin(true)
     
      setTimeout(async()=>{
        try {
          let resulta=await  databases.createDocument(  db_id,
            `${room}user`,
            sessionStorage.getItem("uid"),
            {"user_id":sessionStorage.getItem("uid"),"user_name":sessionStorage.getItem("name"),"color":Math.floor(Math.random()*16777215).toString(16)}
     )
          
        sessionStorage.setItem("user",JSON.stringify(resulta))
        } catch (e) {
         alert(e)
        }
      },2000)
      

      
      

     
      
      }
      handeshare()
      
      
     
      
      
      
     
    
    
    }
if(name){ init()}else{
  init()
  navigate("/")
}



     
  },[])





 
   let ref=useRef()
    
   
   useEffect(()=>{
    let han=async()=>{
      
      await localTracks[1].stop();
      await localTracks[1].close();
      await localTracks[0].stop();
      await localTracks[0].close();
      const resulta =await databases.deleteDocument(db_id, `${room}user`,sessionStorage.getItem("uid"));
      
    
      //localTracks[1].setMuted(true)
      window.location.href ="/"
      
    
        
         await client.leave()
  
    }
    if(call==true){

      han()
    }
   
 
  },[call])

  return (
    <>
 
 
    <div className="vedio__cont">
      
    <div className={style} ref={ref}> </div>
        {users.map(user => <Vedi key={user.uid} all={users} style={notstyle} user={user}></Vedi>)}
        

    </div>
    <Footer  client={client}  localTracks={localTracks}></Footer>
    </>
  )
}
 

 
export default VedioCont