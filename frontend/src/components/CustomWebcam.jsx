import React from 'react';
import Webcam from 'react-webcam';
import { useRef, useState, useCallback } from 'react';
import Pics from './Pics';
import { GoMirror } from 'react-icons/go';

const CustomWebcam = ({ onPictureTaken }) => {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    if (!user) {
        alert('Please Signin First')
        window.location.href = '/signin'
    }
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);
    const [pictures, setPictures] = useState(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const retake = () => {
        setImgSrc(null);
        setPictures(null)
    };

    const handleDone = () => {
        setPictures(imgSrc);
    };

    const downloadImage = () => {
        const downloadLink = document.createElement('a');
        downloadLink.href = imgSrc;
        downloadLink.download = 'webcam_image.jpg';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return (
        <div className="flex justify-center items-center h-screen gap-2 flex-col lg:flex-row md:flex-row">
            <div className="flex justify-center items-center flex-col">
                <div className="relative">
                    {imgSrc ? (
                        <img src={imgSrc} alt="webcam" />
                    ) : (
                        <Webcam
                            height={600}
                            width={600}
                            ref={webcamRef}
                            mirrored={mirrored}
                            screenshotFormat="image/jpeg"
                            screenshotQuality={1}
                            className="border border-black"
                        />
                    )}
                    <div className="absolute bottom-0 mb-3">
                        {imgSrc ? (
                            <>
                                <button
                                    onClick={handleDone}
                                    className="p-3 bg-blue-500 hover:bg-blue-700 rounded-lg m-2"
                                >
                                    Done
                                </button>
                                <button
                                    onClick={downloadImage}
                                    className="p-3 bg-blue-500 hover:bg-blue-700 rounded-lg m-2"
                                >
                                    Download photo
                                </button>
                                <button
                                    onClick={retake}
                                    className="p-3 bg-blue-500 hover:bg-blue-700 rounded-lg m-2"
                                >
                                    Retake photo
                                </button>
                            </>
                        ) : (
                            <div className='flex justify-between items-center gap-96'>
                                <button
                                    onClick={capture}
                                    className="p-3 bg-blue-500 hover:bg-blue-300 rounded-lg ml-4"
                                >
                                    Capture photo
                                </button>
                                <GoMirror className='p-3 bg-blue-500 cursor-pointer text-white text-5xl hover:bg-blue-300 rounded-md'
                                    onClick={() => setMirrored(!mirrored)} />

                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className=''>
                {pictures && <Pics pictures={pictures} />}
            </div>

        </div>
    );
};

export default CustomWebcam;
