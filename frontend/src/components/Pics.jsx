import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ShareWithOthers from './ShareWithOthers';
import basePort from '../basePort';

const Pics = ({ pictures }) => {
    const [clickedPic, setClickedPic] = useState(pictures)
    const [share, setShare] = useState(false)
    const port = basePort
    const navigate = useNavigate()
    const userData = JSON.parse(sessionStorage.getItem('userData'))

    const convertBase64ToFile = (base64String, filename) => {
        const arr = base64String.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    };
    const handleSave = async () => {
        if (!userData) {
            return alert("Please SignIn to save your Pics")
        }
        const emailId = userData.emailId
        const file = convertBase64ToFile(pictures, 'image.jpg'); // Convert base64 to file
        const formData = new FormData();
        formData.append('emailId', emailId);
        formData.append('image', file); // Append file to FormData
        await axios.post(`${port}/api/v2/yourPics`, formData)
            .then((res) => alert(res.data.message))
    }
    async function uploadImages() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
      // Handle user not logged in
      return;
    }

    try {
      const formData = new FormData();
      formData.append('emailId', userData.emailId);
      images.forEach((image) => {
        formData.append('images', image.file);
      });

      const response = await axios.post(`${basePort}/uploadPics`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log(response.data); // Handle success response

    } catch (error) {
      console.error('Error uploading images:', error); // Handle error
    }
  }
    return (
        <>
            <div className="relative">
                {share ? (
                    <ShareWithOthers sharedpicture={pictures} />
                ) : (<>
                    <img src={pictures} alt="pic" />
                    <div className='absolute bottom-0 mb-3'>
                        <button className='p-3 bg-blue-500 hover:bg-blue-700 rounded-lg m-2 text-white' onClick={handleSave}>Save to Your Pics</button>
                        <button className='p-3 bg-blue-500 hover:bg-blue-700 rounded-lg m-2 text-white' onClick={() => setShare(!share)}>Share with Others</button>
                    </div>
                </>)}

            </div>
        </>

    );
};

export default Pics;
