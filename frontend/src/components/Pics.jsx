import React, { useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import basePort from '../basePort';

const Pics = ({ pictures }) => {
    const port = basePort
    const [loading, setLoading] = useState(false)
    const userData = JSON.parse(sessionStorage.getItem('userData'))
    if (!userData) {
        alert('Please Signin First')
        window.location.href = '/signin'
    }
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
        setLoading(true)
        const emailId = userData.emailId
        const file = convertBase64ToFile(pictures, 'image.jpg'); // Convert base64 to file
        const formData = new FormData();
        formData.append('emailId', emailId);
        formData.append('image', file); // Append file to FormData
        await axios.post(`${port}/api/v2/yourPics`, formData)
            .then((res) => {
                setLoading(false)
                alert(res.data.message)
            })
    }
    return (
        <>
            <Modal sharedpicture={pictures} />
            <div className="relative">
                <img src={pictures} alt="pic" />
                <div className='absolute bottom-0 mb-3'>
                    <button className='btn bg-blue-500 hover:bg-blue-700 text-white' onClick={handleSave}>
                        <span className={loading ? "loading loading-spinner" : ""}>Save to Your Pics</span></button>
                    <button className='btn bg-blue-500 hover:bg-blue-700 ml-3 text-white'
                        onClick={() => document.getElementById('camera_modal').showModal()}>
                            Share with Others
                    
                    </button>
                </div>
            </div>
        </>

    );
};

export default Pics;
