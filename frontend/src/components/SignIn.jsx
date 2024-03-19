import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import basePort from '../basePort';

const SignIn = () => {
  const navigate = useNavigate();
  const port = basePort
  const [inputs, setInputs] = useState({
    emailId: "",
    password: "",
  })

  const change = (e) => {
    const { name, value } = e.target
    setInputs({ ...inputs, [name]: value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!inputs.emailId || !inputs.password) {
      alert("Please fill all the details")
      return
    }
    else {
      await axios.post(`${port}/api/v1/signin`, inputs)
        .then((res) => {
          if (res.data.message === "Please signup first")
            alert(res.data.message)
          else if (res.data.message === "Password is not correct")
            alert(res.data.message)
          else {
            sessionStorage.setItem('userData', JSON.stringify(res.data.others))
            navigate("/")
          }
        })
    }
  }
  return (
    <div className='flex justify-center items-center h-screen w-full '>
      <div className='flex justify-center items-center flex-col gap-2 border border-gray-300 rounded-md shadow-lg p-28'>
        <h2 className='text-2xl text-slate-500 mb-6 '>PicShare</h2>

        <h4 className='mb-3 text-gray-700'>Sign in to PicShare with your existing account</h4>

        <input type='email' name='emailId' value={inputs.emailId} onChange={change} placeholder='EmailID' className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' />

        <input type="password" name='password' value={inputs.password} onChange={change} className='border w-full border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black' placeholder='Password' />

        <button onClick={handleLogin} className='bg-black text-white cursor-pointer rounded-md px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-500'>Login</button>

        <div className='py-3 flex justify-start items-center text-lg '>
          <h3 className='text-black w-full'>Doesn't have an account? <Link to='/signup' className='text-blue-500 hover:text-blue-700 hover:underline'>Create One</Link>  </h3>
        </div>
      </div>
    </div>
  )
}

export default SignIn