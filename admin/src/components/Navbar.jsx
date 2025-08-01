import React from 'react'
import {assets} from "../assets/assets"

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center px-[4%] justify-between'>
        <img className="w-30" src={assets.logo} />
        <button onClick={()=>setToken("")} className='bg-gray-600 text-white px-5 py-2 rounded-full sm:py-2 sm:px-7 text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navbar;
