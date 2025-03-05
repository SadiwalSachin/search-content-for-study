import React, { useState } from 'react'
import { FaEyeSlash } from 'react-icons/fa';
import { IoMdEye } from 'react-icons/io';
import { RxCross1 } from 'react-icons/rx';
import { useNavigate , Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

const UserSignUp = () => {

    const navigate = useNavigate();
    const [seePassword,setSeePassword] = useState(false)
    const [userInfo,setUserInfo] = useState({
        fullName:"",
        email:"",
        password:"",
        branch:"",
    })

    const [loading,setLoading] = useState(false)

    const onChangeHandler = (event) => {
      console.log(event.target.value);
        const name = event.target.name;
        const value = event.target.value;
        setUserInfo((prev)=> ({...prev, [name]:value}));
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        console.log(userInfo);
        setLoading(true)
        console.log("User trying to create account");
        try {
          const response = await axios.post("https://search-content-user-service.onrender.com/api/v1/user/register", userInfo)
          console.log("Response coming after trying to register",response);
          if(response.data.success) {
            console.log("User created successfully");
            toast.success(response.data.message);
            navigate("/login");
            setUserInfo({})
            setLoading(false)
          }else{
            console.log("User not created",response);
            toast.error(response.data.message);
            setUserInfo({})
            setLoading(false)
          }
        } catch (error) {
          toast.error(error.message);
          console.log("Some error occurred while registering user",error);
          setUserInfo({})
        }
     }
    
  return (
    <div className="w-full h-full bg-[#F4F4F5] opacity-96 flex items-center justify-center absolute top-0 left-0 z-10">
    <div className="w-[90%] md:w-[35%] rounded-xl border-2 border-black py-2 flex flex-col gap-y-3">
      <form onSubmit={onSubmitHandler} action="" className="w-full h-full">
        <div className="w-full px-5 py-3 flex items-center justify-between">
          <h1 className="md:text-[1.5vw] font-semibold">
            Create Your Account
          </h1>{" "}
          <h2
            onClick={() => navigate("/")}
            className="text-2xl cursor-pointer"
          >
            <RxCross1 />
          </h2>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-row justify-between px-5 gap-x-8">
          <div className="flex flex-col flex-grow gap-y-2">
            <label htmlFor="fullName">Full Name</label>
            <input
            disabled={loading}

              onChange={onChangeHandler}
              required
              type="text"
              name="fullName"
              value={userInfo.fullName}
              id="fullName"
              className="px-4 py-2 outline-none rounded-md"
              placeholder="Enter your full name"
            />
          </div>
        </div>
        <div className="w-full flex flex-col md:flex md:flex-row justify-between px-5 gap-x-8 mt-2">
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
          <div className="w-full flex flex-col px-5 gap-x-8 mt-2">
              <label htmlFor="brnach">Branch</label>
              <select
            disabled={loading}

                required
                type="text"
                onChange={onChangeHandler}
                name="branch"
                value={userInfo.branch}
                id="branch"
                className="px-4 py-2 rounded-md"
                placeholder="Enter college name"
              >
                <option value="college">Branch</option>
                <option value="ECE">ECE</option>
                <option value="EX">EX</option>
                <option value="CSE">CSE</option>
                <option value="ME">ME</option>
                <option value="PCT">PCT</option>
              </select>
          </div>
        <div className="w-full px-5 flex flex-col gap-y-2 mt-2">
          <label htmlFor="password">Password</label>
          <div className="w-full bg-[#FFFFFF] flex items-center  rounded-md">
            <input
              minLength={6}
              maxLength={10}
              pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$" 
              title='Password must be at least 6 characters long'
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
            Sign Up
          </button>
            <h2 className="flex gap-x-2 mt-3">
              Already have an account ?
              <Link
              to="/login"
                className="cursor-pointer"
              >
                Login
              </Link>
            </h2>
        </div>
      </form>
    </div>
  </div>
  )
}

export default UserSignUp