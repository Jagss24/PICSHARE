import React, { useState, useRef } from 'react';
import basePort from '../basePort';
import "./uploadPic.css"
import axios from 'axios';
import Modal from './Modal';

const UploadPics = () => {
  const [images, setImages] = useState([])
  const [isDragging, setIsDragging] = useState(false)
  const [sending, setsending] = useState(false)
  const fileInPutRef = useRef(null)

  function selectFiles() {
    fileInPutRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0)
      return;

    for (let i = 0; i < files.length; i++) {
      if (!files[i].type.startsWith("image/"))
        continue;

      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages, {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            file: files[i]
          }
        ]);
      }
    }
  }


  function deleteImage(index) {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    )
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy"
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false)
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);

    const files = event.dataTransfer.files;
    const validFiles = Array.from(files).filter(file => file.type.startsWith("image/"));

    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      if (!images.some((e) => e.name === file.name)) {
        setImages((prevImages) => [
          ...prevImages, {
            name: file.name,
            url: URL.createObjectURL(file),
            file: file
          }
        ]);
      }
    }
  }
  function uploadbtn() {
    if (images.length === 0) {
      alert("Please select any image")
      return
    }
    document.getElementById('btns').classList.remove('hidden')
  }

  async function uploadImages() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if (!userData) {
      // Handle user not logged in
      alert("user not logged in")
      return;
    }
    try {
      setsending(true)
      const formData = new FormData();
      formData.append('emailId', userData.emailId);
      images.forEach((image) => {
        formData.append('images', image.file);
        console.log(image)
      });
      await axios.post(`http://localhost:1000/api/v2/uploadPics`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((res) => {
        setsending(false)
        console.log(res.data)
      }
      )
        ; // Handle success response

    } catch (error) {
      console.error('Error uploading images:', error); // Handle error
    }
  }
  return (
    <>
      <Modal />
      <div className='card'>
        <div className='top'>
          <p> Drag & Drop Uploading Images</p>
        </div>
        <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
          {
            isDragging ? (
              <span className='select'>Drag Images here</span>
            ) : (
              <>
                Drag & Drop images here or {" "}
                <span className='selects' role='button' onClick={selectFiles}
                >Browse</span>
              </>
            )
          }
          <input type='file' name='file' className='file' multiple ref={fileInPutRef} onChange={onFileSelect} />
        </div>
        <div className='container'>
          {images.map((image, index) => (
            <div className='image' key={index}>
              <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
              <img src={image.url} alt={image.name} />
            </div>
          ))}
        </div>
        <button type='button' onClick={uploadbtn}>Upload</button>
        {images.length !== 0 ? <div className='mt-32 text-center hidden' id='btns'>
          <button className={sending? 'loadin loading-spinner': '' } onClick={uploadImages}>Save to your pics</button>
          <button onClick={() => document.getElementById('email_modal').showModal()}>Share with others</button>
        </div> : <></>}
      </div>
    </>
  )
}

export default UploadPics;
