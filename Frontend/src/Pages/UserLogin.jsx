import React, { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate ,Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import {setIsLoggedIn} from "../redux/Slices/authSlice.js"

const UserLogin = () => {

    const navigate = useNavigate();
    const [userInfo,setUserInfo] = useState({
        email:"",
        password:""
    })

    const dispatch = useDispatch();
    const [seePassword,setSeePassword] = useState(false)
    const [loading,setLoading] = useState(false)

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value;
        setUserInfo((prev)=>{
            return {...prev, [name]:value}
        })
    }
    
    const onSubmitHandler = async(event) =>{
      event.preventDefault()
      // console.log(userInfo);
      
      try {
        setLoading(true)
        // console.log("User is trying to login ");
        const response = await axios.post("https://search-content-user-service.onrender.com/api/v1/user/login",userInfo)
        // console.log(response);
        if(response.data.success){
          // console.log("User logged in successfully");
          toast.success(response.data.message);
          localStorage.setItem("token",response.data.token)
          dispatch(setIsLoggedIn(true))
          navigate("/");
          setLoading(false)
        } else {
          // console.log("User not logged in");
          toast.error(response.data.message);
          setLoading(false)
        }
        
      } catch (error) {
        toast.error(error.message);
        setLoading(false)
        // console.error("Some error occurred while trying to login",error);
      }

    }
  return (
    <>
     <div className="w-full h-full bg-[#F4F4F5] opacity-96 flex items-center justify-center absolute top-0 left-0 z-10">
        <div className="w-[90%] md:w-[35%] rounded-xl border-2 border-black py-2 flex flex-col gap-y-3">
          <form onSubmit={onSubmitHandler} action="" className="w-full h-full">
            <div className="w-full px-5 py-3 flex items-center justify-between">
              <h1 className="md:text-[1.5vw] font-semibold">
                Login Your Account
              </h1>
              <h2
                onClick={() => navigate("/")}
                className="text-2xl cursor-pointer"
              >
                <RxCross1 />
              </h2>
            </div>
            <div className="w-full flex flex-col md:flex md:flex-row justify-between px-5 gap-x-8">
              <div className="flex flex-col w-full gap-y-2">
                <label htmlFor="email">Email</label>
                <input
                disabled={loading}
                  required
                  onChange={onChangeHandler}
                  type="email"
                  id="email"
                  name="email"
                  value={userInfo.email}
                  className="px-4 py-2 outline-none rounded-md"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="w-full px-5 flex flex-col gap-y-2 mt-2">
              <label htmlFor="password">Password</label>
              <div className="w-full bg-[#FFFFFF] flex items-center  rounded-md">
                <input
                disabled={loading}
                  placeholder="Enter password"
                  onChange={onChangeHandler}
                  name="password"
                  value={userInfo.password}
                  type={`${seePassword ? "text" : "password"}`}
                  className="px-4 py-2 outline-none rounded-md bg-transparent flex-grow "
                />{" "}
                <h2
                  onClick={() => setSeePassword((prev) => !prev)}
                  className="text-2xl cursor-pointer w-[10%]"
                >
                  {seePassword ? <FaEyeSlash /> : <IoMdEye />}
                </h2>
              </div>
              <button disabled={loading} className={`mt-4 bg-[#18181B] text-white py-2  rounded-md ${loading ? "opacity-50" : ""}`}>
                Login
              </button>
                <h2 className="flex gap-x-2 mt-3 ">
                  Don't have an account ?{" "}
                  <Link
                    to="/signup"
                    className="cursor-pointer"
                  >
                    Create Account
                  </Link>
                </h2>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default UserLogin