import React from 'react'
import logo from '../img/logo.png'
import "../css/Nav.css" 
function Nav() {
  return (
    <div className='nav'>
        

<nav >
  <div class=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4  sm:w-20">
  <a href="/" class="flex items-center space-x-3 ">
     <img className='logo img-fluid'  src={logo} />
  </a>

 
  </div>
</nav>


    </div>
  )
}

export default Nav