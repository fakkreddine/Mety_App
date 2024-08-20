import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import "../css/vediotem.css"
import { resize } from '../Redux/Global';
function Vedi(props) {
    let localuser= sessionStorage.getItem("uid");
      
    let count = useSelector((state) => state.counter.value)
    const dispatch = useDispatch()
    let [uid,setuid]=useState()
    let ref = useRef();
    let [style,setstyle]=useState("--notfocus")
    useEffect(() => {
      try {
        if(props.user.videoTrack!=undefined)
        {props.user.videoTrack.play(ref.current);
          if(localuser!=props.user.uid){
            props.user.audioTrack.play();
          }
   
        }else{
          props.user.tracks.play(ref.current)
         
         
          }
        
        
      } catch (exceptionVar) {
        
      } 

           
        
        
        
      }, [props.all]);
      
  useEffect(()=>{ 
    if (count==null) {
      setstyle("")
        
    }else{
      if (count.uid!=props.user.uid) {
        setstyle("--notfocus")
          
      }
    }
   
  },[count])
      
  return (
    <>
    
    <div  id={props.user.uid} className={`vedio `} s ref={ref} onClick={()=>{
     
   
      setstyle("--vedioFocus")
      
        
       
        
    }}>
      
    </div>
    </>
  )
}

export default Vedi