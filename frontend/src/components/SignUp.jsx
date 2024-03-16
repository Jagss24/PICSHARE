import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const SignUp = () => {
    const navigate = useNavigate();
    const port = 'http://localhost:1000'
    const [inputs, setInputs] = useState({
        firstName: "",
        lastName: "",
        emailId: "",
        userName: "",
        password: "",
    })

    const change = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        if (!inputs.firstName || !inputs.lastName || !inputs.emailId || !inputs.userName || !inputs.password) {
            alert("Please fill all the boxes")
        }
        else {
            await axios.post(`${port}/api/v1/signup`, inputs)
                .then((res) => {
                    if (res.data.message === "Email ID already exist")
                        alert(res.data.message)
                    else if (res.data.message === "UserName already exist, try with different one")
                        alert(res.data.message)
                    else {
                        navigate("/signin")
                    }
                })
        }

    }
    return (
        <div className='flex justify-center items-center h-screen w-full '>
            <div className='flex justify-center items-center flex-col gap-2 border border-gray-300 rounded-md shadow-lg p-24'>
                <h2 className='text-2xl text-slate-500 mb-6 '>PicShare</h2>
                <h4 className='mb-3 text-gray-700'>Sign in to PicShare with your existing account</h4>
                <input type='name' placeholder='Firstname' name='firstName' value={inputs.firstName} onChange={change} className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' />
                <input type='name' placeholder='Lastname' name='lastName' value={inputs.lastName} onChange={change} className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' />
                <input type='email' placeholder='EmailID' name='emailId' value={inputs.emailId} onChange={change} className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' />
                <input type='name' placeholder='Username' name='userName' value={inputs.userName} onChange={change} className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' />
                <input type="password" name='password' value={inputs.password} onChange={change} className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' placeholder='Password' />
                <button className='bg-black text-white cursor-pointer rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-500' onClick={handleRegister}>Register</button>
                <div className='py-3 flex justify-start items-center text-lg '>
                    <h3 className='text-black w-full'>ALready have an account? <Link to='/signin' className='text-blue-500 hover:text-blue-700 hover:underline'>Sign In</Link>  </h3>
                </div>
            </div>
        </div>
    )
}

export default SignUp