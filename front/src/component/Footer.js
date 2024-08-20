import React, { useEffect, useState, version } from 'react'
import "../css/fotter.css"
import logo from "../img/logo_icon.png"
import end from "../img/phone-call-end.png"
import mic from "../img/microphone-black-shape.png"
import share from "../img/present.png"
import video from "../img/video.png"
import novedio from "../img/videocamofff.png"
import members from "../img/group (1).png"
import noshare from "../img/noscreen.png"
import Side from './room/Side'
import mute from "../img/mute.png"
import { useSelector, useDispatch } from 'react-redux'
import { resize,setshareredux ,endvedio,re,closestate  } from '../Redux/Global'
import AgoraRTC from 'agora-rtc-react'


function Footer(props) {
    let count = useSelector((state) => state.counter.shareValue)
    let closing = useSelector((state) => state.counter.closed)
    let [mice,setmic]=useState(mic)
    let [came,setcam]=useState(video)
    let [sharesc,setshare]=useState(share)
    let [endc,setend]=useState(false)




    useEffect(()=>{
        console.log(count)
    },[count])


    let [sidebar,setsidebar]=useState()
    let [footer,setfooter]=useState("footer")
    const dispatch = useDispatch()
     
    let togelca=async()=>{
        await props.localTracks[1].setMuted(!props.localTracks[1].muted)
       

    }
    let togelmic=async(e)=>{
        
        if(props.localTracks[0].muted){

            await props.localTracks[0].setMuted(false)
        }else{
            await props.localTracks[0].close()
        }

    }
    let togelshare=async()=>{
        if (came==video ){
            setcam(novedio) 
            togelca()
            dispatch(setshareredux())
        }else{
            dispatch(setshareredux())
                     
        }
       
        
        
      

    }



    let name=sessionStorage.getItem("name")
    


  
  return (
    <>
    {sidebar}
    <div className={footer}>


        <div className='user'>
            
            <p> {name}</p>
        </div>
         <div className='control'>

            <img className="main-cont" onClick={()=>{
                
                let res=came==video?novedio:video;
                setcam(res)
                 togelca()
                
            }} src={came} />
            <img className="main-cont" onClick={()=>{
                togelshare()
                let res=sharesc==share?noshare:share
                setshare(res)
            }}   src={sharesc} />
            <img className="main-cont"  onClick={()=>{
                 
                let res=mice==mic?mute:mic
                setmic(res)
                togelmic()
            }}  src={mice} />
            
            <img className="main-cont" onClick={async()=>{
                dispatch(endvedio())
               
              
                
            }}  src={end} />
            
         </div>
        <div className='chat__part'>
        <button onClick={()=>{
             
            if (sidebar==undefined ){
                setsidebar(<Side  ></Side>)
                dispatch(closestate())
                dispatch(re())
            }else{  setsidebar()
                dispatch(resize())
                dispatch(closestate())
            }
            setfooter(()=>{
               let res= footer=="footer"?"footer --resize":"footer"
               return res
            })
        }}><img className="cont"  src={members}  /></button>
        </div>

    </div></>
  )
}

export default Footer