import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { IoMdLogOut } from "react-icons/io";

const NavBar = () => {
    const userData = sessionStorage.getItem('userData')
    
    return (
        <div className='bg-blue-700 w-full h-16 flex justify-start items-center'>
            <div className='pl-4 text-white text-3xl font-sans cursor-pointer'>
                <Link to="/">PicShare</Link>
            </div>
            <div className='flex justify-center items-center p-7'>
                <NavLink className='p-5 text-white font-sans hover:text-black  hover:bg-blue-600'
                    to='/'
                > Home </NavLink>
                <NavLink className='p-5 text-white font-sans hover:text-black  hover:bg-blue-600' to='/camera'>Camera</NavLink>
                <NavLink className='p-5 text-white font-sans hover:text-black  hover:bg-blue-600' to='/upload-pics' >Upload Pics</NavLink>
                <NavLink className='p-5 text-white font-sans hover:text-black  hover:bg-blue-600' to='/your-pics' >Your Pics</NavLink>
            </div>
            <div className=' ml-auto'>
                {userData ? (<IoMdLogOut className='text-3xl cursor-pointer text-blue-600 mr-4 bg-white rounded-md hover:text-red-600' />) : (<Link className='p-2 rounded-lg cursor-pointer mr-3 text-blue-700 bg-white font-sans hover:text-black' to='/signin'>Sign In</Link>)}

            </div>
        </div >
    )
}

export default NavBar