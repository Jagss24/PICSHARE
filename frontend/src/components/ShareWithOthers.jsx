import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const ShareWithOthers = ({ sharedpicture }) => {
    const port = "http://localhost:1000"
    const [inputs, setInputs] = useState({
        emailId: ""
    })

    const change = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value })
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

    const handleShare = async () => {
        const EmailId = inputs.emailId
        const file = convertBase64ToFile(sharedpicture, 'image.jpg'); // Convert base64 to file
        const formData = new FormData();
        formData.append('emailId', EmailId);
        formData.append('image', file); // Append file to FormData
        await axios.post(`${port}/api/v2/yourPics`, formData)
            .then((res) => alert(res.data.message))
    }
    return (
        <div className="flex justify-center items-center h-screen w-full shadow-lg rounded-md border border-gray-400">
            <div className="flex justify-center items-start flex-col gap-3 border px-6 rounded-md shadow-lg">
                <label htmlFor="emailId" className="mb-3 text-2xl font-bold">Enter the Email ID you want to share with</label>
                <input type="email" name="emailId" value={inputs.emailId} onChange={change} placeholder="EmailId" className="border text-lg w-auto border-gray-300 rounded-lg p-3 px-5 bg-transparent focus:outline-none focus:border-blue-500 text-center text-black" />
                <Link className="py-2 px-4 bg-blue-500 hover:bg-blue-700 rounded-lg m-2 text-white" onClick={handleShare} to='/camera' >Share</Link>
            </div>

        </div>
    );
};

export default ShareWithOthers
