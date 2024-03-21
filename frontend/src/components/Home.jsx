import React from 'react'
import { Link } from 'react-router-dom'
import shareimg from '../assets/pic_share.jpg'
import camerapic from '../assets/click_camera.jpg'

const Home = () => {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    if (!user) {
        window.location.href = '/signin'
    }
    return (
        <>
            <div className='flex justify-center items-center h-72 gap-2'>
                <div className='flex justify-center items-center flex-col h-72 w-1/2'>
                    <h2 className='text-4xl font-semibold pt-40'>Share Your Pics direclty to  <br />the emailId</h2>
                    <Link className='p-3 bg-blue-500 text-white hover:bg-blue-700 hover:shadow-lg rounded-lg mt-10' to='/signin'>Start
                        Using Now </Link>
                </div>
                <div className='flex justify-center items-center flex-col h-72 w-1/2'>
                    <img src={shareimg} className='w-1/2 mt-24' />
                </div>
            </div>
            <div className='flex justify-center items-center h-72 gap-2'>
                <div className='flex justify-center items-center flex-col h-72 w-1/2'>
                    <img src={camerapic} className='w-40 mt-24' />
                </div>
                <div className='flex justify-center items-center flex-col h-72 w-1/2'>
                    <h2 className='text-4xl font-semibold pt-40'>Click the pic and <br />Send it without saving</h2>
                    <Link className='p-3 bg-blue-500 text-white hover:bg-blue-700 hover:shadow-lg rounded-lg mt-10' to='/signin'>Start
                        Using Now </Link>
                </div>

            </div>
        </>
    )
}

export default Home