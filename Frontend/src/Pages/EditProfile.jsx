import axios from "axios";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { url } from "../Constants/constants";
import Loader from "../components/Loader";
import {useDispatch, useSelector} from "react-redux"
import { setUserData } from "../redux/Slices/userSlice";

const EditProfile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({});
  const [loading , setLoading] = useState(false)
  const dispatch = useDispatch()
  
  const onchangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const updateUserDetails = async (event) => {
    event.preventDefault();
    setLoading(true)
    // console.log(userData);
    try {
      const response = await axios.post("https://search-content-user-service.onrender.com/api/v1/user/update-user-details",
        userData,
        {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // console.log("User details updated successfully");
        // console.log(response);
        setLoading(false)
        dispatch(setUserData(response?.data?.data))
        toast.success(response.data.message);
        navigate(-1)
      } else {
        // console.log("User details not updated");
        // console.log(response);
        setLoading(false)
        toast.error(response.data.message);
        navigate(-1)
      }
    } catch (error) {
      // console.log("Some error occured while updating user details");
      // console.log(error);
      setLoading(false)
      toast.error(error.message);
      navigate(-1)
    }
  };


  return (
    <>
    {loading ? <Loader/> : ""}
      <div className="w-full h-screen absolute z-10 bg-[#FFFFFF] top-0 flex flex-col">
        <div className="w-full px-4 py-5 cursor-pointer h-[15vh] bg-[#F4F4F5] mb-5">
          <div className="w-full flex items-center justify-between ">
            <h2 className="text-[20px]" onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </h2>
            <h2 className="text-[24px] font-semibold uppercase tracking-tighter">
              update profile
            </h2>
          </div>
        </div>
        <form action="" onSubmit={updateUserDetails}>
          <div className="w-full px-6 mt-2">
          <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
              <h2 className="font-semibold text-xl uppercase">
                your email address
              </h2>
              <input
                onChange={onchangeHandler}
                name="email"
                value={userData?.email}
                type="email"
                className="outline-none mt-2"
                placeholder="Enter Your Email Address"
              />
            </div>
          <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
              <h2 className="font-semibold text-xl uppercase">
                your full name
              </h2>
              <input
                onChange={onchangeHandler}
                name="fullName"
                value={userData?.fullName}
                type="text"
                className="outline-none mt-2"
                placeholder="Enter Full Name"
              />
            </div>
            <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
              <h2 className="font-semibold text-xl uppercase">
                your college name
              </h2>
              <input
                onChange={onchangeHandler}
                name="collegeName"
                value={userData?.collegeName}
                type="text"
                className="outline-none mt-2"
                placeholder="Enter College Name"
              />
            </div>
            <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
              <h2 className="font-semibold text-xl uppercase">branch</h2>
              <input
                onChange={onchangeHandler}
                name="branch"
                value={userData?.branch}
                type="text"
                className="outline-none mt-2"
                placeholder="Enter Branch"
              />
            </div>
            <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
              <h2 className="font-semibold text-xl uppercase">semester</h2>
              <input
                onChange={onchangeHandler}
                name="semester"
                value={userData?.semester}
                type="number"
                min={1}
                max={8}
                className="outline-none mt-2 w-full"
                placeholder="Enter Semester"
              />
            </div>
            <div className="flex items-center justify-center mt-7">
              <button
                onClick={updateUserDetails}
                className="px-10 bg-gray-300 py-2 uppercase font-semibold border rounded-xl"
              >
                update
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;
