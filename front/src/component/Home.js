
import Nav from './Nav'
import React, { useEffect, useState, version } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from  "../img/logo.png"
import "../css/home.css"
import axios from 'axios';

function Home() {
  const [firstName, setFirstName] = useState();
  const [room, setroom] = useState();
  const navigate = useNavigate();
  

let createroom=async(event)=>{
  event.preventDefault();
let rommpar=encodeURIComponent(room)
  
  if(firstName&&room){

   
    let response = await axios.get(`https://7713-102-106-196-61.ngrok-free.app/access_token?channel=${rommpar}`)
   
    let data=response.data.token
    
    sessionStorage.setItem("name",firstName)
    navigate(`/lobby?room=${room}&token=${data}`);

  }

  
}
  return (
    <>
    <Nav></Nav>
    <div className='home '>

    
    
     <div className='body__cont'>
     <form className='con'>
            
             
            <div>
            <label for="first_name" class=" flex justify-start block mb-2 text-lg font-medium text-gray-900 dark:text-white">First name</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(value)=>{
              setFirstName(value.target.value)
             
            }}  required/>
        </div>
        <div>
            <label for="first_name" class=" flex justify-start block mb-2 text-lg font-medium text-gray-900 dark:text-white">Room Name</label>
            <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  onChange={(value)=>{
              setroom(value.target.value)
              
            }}   required/>
           
        </div>    


        <button className='btn-meeting' onClick={createroom} >Create Meeting</button>
       
            
            </form> 
                 
         </div>
        
    
    </div>
    </>
  )
}

export default Home