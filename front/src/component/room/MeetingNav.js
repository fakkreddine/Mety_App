import React, { useState } from 'react'
import "../../css/meetingNav.css"
import record from "../../img/record.png" 
import Files from '../Files'
function MeetingNav() {
  let [activ,setactive]=useState("button")
  let  queryParameters = new URLSearchParams(window.location.search)
  let  room = queryParameters.get("room")
  const today = new Date();
const date = today.getDate();
const month = today.getMonth() + 1;
const fullYear = today.getFullYear();
const formattedDate = `${fullYear}-${month}-${date}`;
let [rec,setrec]=useState()
let [st,setst]=useState()

let [btn,setbt]=useState("btn second")
let [btn2,setbtn2]=useState("btn")
let [file,setfile]=useState()


  return (
    <>
    <div className='meetingnav'>
      <div className='room'>
        <p  className='--h1'> {room}</p>
        <p className=' --align'>{formattedDate}</p>

      </div>
      <div className='tabs'>

        <button className={btn2}  onClick={()=>{
          setbtn2("btn second")
          setbt("btn ")
          setfile(<Files></Files>)
          
        }}>Documents</button>
        <button className={btn}  onClick={()=>{
          setbtn2("btn ")
          setbt("btn second")
          setfile()
        }}>Meeting</button>
      </div>
      <div className='record' onClick={async()=>{
        let res =activ=="button"?"button active":"button"
        setactive(res)
        if (activ=="button") {
          navigator.mediaDevices.getDisplayMedia({ video: true, audio: true }).then(stream => {
            setst(stream)
            // create a new MediaRecorder with the screen stream
            const mediaRecorder = new MediaRecorder(stream);
            setrec(mediaRecorder)
          
            const chunks = [];
            mediaRecorder.ondataavailable = (e) => {
              // push each chunk (blobs) in an array
              chunks.push(e.data);
            };
          
            mediaRecorder.onstop = (e) => {
              // when recording is stopped, create a new Blob with all the chunks
              const blob = new Blob(chunks, { type: 'video/mp4' });
              // create a link element to download the blob
              const downloadLink = document.createElement('a');
              downloadLink.href = URL.createObjectURL(blob);
              downloadLink.download = 'screen-recording.mp4';
              // append the link to the document and click it
              document.body.appendChild(downloadLink);
              downloadLink.click();
            };
          
            // start recording
            mediaRecorder.start();
          });
          
        }else{
          
          let ra=st.getTracks()
          ra[0].stop()
          ra[1].stop()
        }

      }}>

      <div class={activ} >
  <div class="inner"></div>
  
</div>
  <p className='title flex justify-start text-base font-semibold'> REC</p>
      </div>



    </div>
    {file}
    </>
  )
}

export default MeetingNav