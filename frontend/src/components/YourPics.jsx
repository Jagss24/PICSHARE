import React, { useEffect, useState } from 'react'
import basePort from '../basePort'
import axios from 'axios'
import { MdDelete } from 'react-icons/md';

const YourPics = () => {
  const [yourPics, setYourPics] = useState([])
  const port = basePort
  const user = JSON.parse(sessionStorage.getItem('userData'))
  if (!user) {
    alert('Please Signin First')
    window.location.href = '/signin'
  }
  const getPics = async () => {
    await axios.get(`${port}/api/v2/yourPics/${user.emailId}`).then((res => {
      setYourPics(res.data.yourPics)
    }))
  }
  useEffect(() => {
    getPics()
  }, [user])


  const handleDelete = async (pic_url) => {
    const normalizedPicUrl = pic_url.slice(8)
    console.log(normalizedPicUrl)
    console.log(user.emailId)
    const encodedUrl = `http://localhost:1000/api/v2/deletePic/${user.emailId}/uploads\\${normalizedPicUrl}`.replace(/\\/g, '%5C');
    await axios.delete(encodedUrl).then((res) => {
      console.log(res.data)
      getPics()
    })
  }

  return (
    <div className='flex flex-wrap gap-4' >
      {yourPics.map((pic, index) => (
        <div key={index} >
          <img src={`${port}/${pic}`} alt='images' style={{ width: '200px' }} className='border rounded-lg' />
          <MdDelete onClick={() => handleDelete(pic)} className='rounde-full shadow-md text-red-500 cursor-pointer' fontSize={25} />
        </div>
      ))}



    </div>
  )
}

export default YourPics