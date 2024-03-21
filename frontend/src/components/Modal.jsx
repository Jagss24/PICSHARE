import React, { useState } from 'react'
import axios from 'axios'
import basePort from '../basePort'

const Modal = ({ images, sharedpicture }) => {
    const [sending, setsending] = useState(false)
    const [inputs, setInputs] = useState({
        emailId: ""
    })
    const port = basePort
    const change = (e) => {
        const { name, value } = e.target
        setInputs({ ...inputs, [name]: value })
    }
    async function uploadshareImages() {
        const userData = JSON.parse(sessionStorage.getItem('userData'));
        if (!userData) {
            // Handle user not logged in
            alert("user not logged in")
            return;
        }
        try {
            setsending(true)
            const formData = new FormData();
            formData.append('emailId', inputs.emailId);
            images.forEach((image) => {
                formData.append('images', image.file);

            });
            formData.forEach((form) => console.log(form))
            await axios.post('http://localhost:1000/api/v2/uploadPics', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }

            }).then((res) => {
                setsending(false)
                alert(res.data.message)
                window.location.reload()
            }
            )
                ; // Handle success response

        } catch (error) {
            console.error('Error uploading images:', error); // Handle error
        }
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
        setsending(true)
        const EmailId = inputs.emailId
        const file = convertBase64ToFile(sharedpicture, 'image.jpg'); // Convert base64 to file
        const formData = new FormData();
        formData.append('emailId', EmailId);
        formData.append('image', file); // Append file to FormData
        await axios.post(`${port}/api/v2/yourPics`, formData)
            .then((res) => {
                setsending(false)
                alert(res.data.message)
                window.location.reload()
            })

    }
    return (
        <>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="upload_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-center">Enter the emailId you want to share with</h3>
                    <label className="input input-bordered flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email" className='grow' placeholder="Email" name="emailId" value={inputs.emailId} onChange={change} />
                    </label>
                    <button className='btn bg-blue-400 hover:bg-blue-800' onClick={uploadshareImages}>
                        <span className={sending ? 'loading loading-spinner' : ''}>Share</span>
                    </button>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <dialog id="camera_modal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4 text-center">Enter the emailId you want to share with</h3>
                    <label className="input input-bordered flex items-center gap-2 mb-3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="email" className='grow' placeholder="Email" name="emailId" value={inputs.emailId} onChange={change} />
                    </label>
                    <button className='btn bg-blue-400 hover:bg-blue-800' onClick={handleShare}>
                        <span className={sending ? 'loading loading-spinner' : ''}>Share</span>
                    </button>
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

export default Modal