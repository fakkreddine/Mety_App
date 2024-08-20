import React from 'react'
import { Avatar, List } from 'antd';
import "../../css/message.css"
function Message({msg}) {
    
  return (


    
    <div className='message'>
<div   class="flex  items-start gap-2.5 my-6">
    <div   style={{
            backgroundColor: `#${msg.color}`}} id="avatar_cont">
    <div id="name">
    {msg&&msg.user_name.charAt(0)}
           </div>
   
    </div>
   
   <div style={{"width":"320px" ,"margin-left":"5px" }} class="mess flex flex-col w-full  leading-1.5 p-4  bg-gray-100 border-gray-200  rounded-e-xl rounded-es-xl dark:bg-gray-700">
      <div class="flex items-center space-x-2 rtl:space-x-reverse">
         <span class="text-sm font-semibold text-gray-900 dark:text-white">{msg.user_name}</span>
         <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{msg.time}</span>
      </div>
            <p className='flex justify-start !text-start text-sm font-normal py-2.5'>{msg.body}</p>
      <span class=" flex justify-starttext-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
   </div>
  
   
</div>

    </div>
  )
}

export default Message