import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Camera } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {useNavigate} from "react-router-dom"
import Loader from './Loader';

const ProvideSolution = ({setShowProvideSolutionComponent,id}) => {
  const token = localStorage.getItem("token")
  const [solutionText, setSolutionText] = useState('');
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store actual file object
  const [showCamera, setShowCamera] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const navigate = useNavigate()

  const userData = useSelector((state)=>state?.user?.userData)
  // console.log("userData",userData);
  
  // Handle text input change
  const handleTextChange = (e) => {
    setSolutionText(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImageFile(file); // Store the file object for form submission
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result); // For preview only
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle camera open
  const handleOpenCamera = () => {
    setShowCamera(true);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error("Error accessing camera:", err);
        setErrorMessage("Could not access camera. Please check permissions.");
        setShowCamera(false);
      });
  };

  // Handle taking photo
  const handleTakePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageDataUrl = canvas.toDataURL('image/png');
      setImage(imageDataUrl); // For preview
      
      // Convert base64 to file object
      canvas.toBlob((blob) => {
        const file = new File([blob], "camera-photo.png", { type: "image/png" });
        setImageFile(file); // Store the file object for form submission
      }, 'image/png');
      
      // Stop camera stream
      const stream = video.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      setShowCamera(false);
    }
  };

  // Handle camera close
  const handleCloseCamera = () => {
    const stream = videoRef.current?.srcObject;
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    setErrorMessage('');
    
    if (!solutionText.trim()) {
      setErrorMessage('Please enter a solution text.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append('solutionText', solutionText);
      
      if (imageFile) {
        formData.append('solutionImage', imageFile);
      }

      console.log(imageFile);
      console.log(`Pyq Id : ${id} , username ${userData?.fullName} userId = ${userData?._id}`);
      
     const response = await axios.post(`http://localhost:4000/api/v1/pyq/add-pyq-solution?pyqId=${id}&username=${userData?.fullName}&userId=${userData?._id}`,
      formData,
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
     )

     console.log(response);
     if(response?.data?.success){
      toast.success(response?.data?.message)
      navigate(-1)      
     }else{
      toast.error(response?.data?.message)
      navigate(-1)
     }
    } catch (error) {
      console.error("Error submitting solution:", error);
      setErrorMessage(`Failed to submit solution: ${error.message}`);
      navigate(-1)
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=>{
    document.body.style.overflow = 'hidden';
    return ()=>{
      document.body.style.overflow = ''
    }
  },[])

  return (
    <>
    {isSubmitting ? <Loader/> : ""}
    <div className='h-screen w-full z-[30] bg-transparent'>
    <div className='w-[95%] md:w-1/2 h-auto bg-gray-400 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center rounded-md p-5 shadow-lg'>
      <div className='w-full flex justify-between items-center mb-4'>
        <h2 className='text-xl font-bold'>Provide Solution</h2>
        <button 
          className='text-gray-500 hover:text-gray-700 text-xl font-bold'
          onClick={() => setShowProvideSolutionComponent(false)}
        >
          X
        </button>
      </div>
      
      {errorMessage && (
        <div className='w-full mb-4 p-3 bg-red-100 text-red-700 rounded-md'>
          {errorMessage}
        </div>
      )}
      
      <div className='w-full mb-4'>
        <textarea 
          className='w-full p-4 rounded-md border border-gray-300 min-h-32' 
          placeholder='Enter Solution'
          value={solutionText}
          onChange={handleTextChange}
        />
      </div>
      
      {image && (
        <div className='w-full mb-4'>
          <img 
            src={image} 
            alt="Solution" 
            className='max-h-64 max-w-full object-contain rounded-md border border-gray-300' 
          />
          <button 
            className='mt-2 text-red-500 hover:text-red-700'
            onClick={() => {
              setImage(null);
              setImageFile(null);
            }}
          >
            Remove Image
          </button>
        </div>
      )}
      
      {showCamera && (
        <div className='w-full mb-4 relative'>
          <video 
            ref={videoRef} 
            autoPlay 
            className='w-full h-64 object-cover border border-gray-300 rounded-md'
          />
          <canvas ref={canvasRef} className='hidden'></canvas>
          
          <div className='mt-2 flex justify-center gap-2'>
            <button 
              className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'
              onClick={handleTakePhoto}
            >
              Take Photo
            </button>
            <button 
              className='bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md'
              onClick={handleCloseCamera}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className='w-full flex gap-4 mb-4'>
        <button 
          className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'
          onClick={handleOpenCamera}
          disabled={isSubmitting}
        >
          <Camera size={20} />
          Open Camera
        </button>
        
        <button 
          className='bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-md'
          onClick={() => fileInputRef.current?.click()}
          disabled={isSubmitting}
        >
          Upload Image
        </button>
        <input 
          type="file" 
          ref={fileInputRef} 
          className='hidden' 
          accept="image/*"
          onChange={handleFileUpload}
        />
      </div>
      
      <button 
        className={`w-full font-bold py-3 rounded-md ${
          isSubmitting 
            ? 'bg-blue-400 cursor-not-allowed' 
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Solution'}
      </button>
    </div>
    </div>
    </>
  );
};

export default ProvideSolution;