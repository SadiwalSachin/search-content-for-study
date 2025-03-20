import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import axios from "axios";
import { PiUserCircleLight } from "react-icons/pi";
import { useSelector } from "react-redux";

const UserDetails = () => {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const userData = useSelector((state)=>state?.user?.userData)
  const navigate = useNavigate();


  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="w-full h-screen absolute bg-[#FFFFFF] top-0 flex flex-col">
        <div className="w-full px-4 py-5 cursor-pointer h-[15vh] bg-[#F4F4F5]">
          <div className="w-full flex items-center justify-between ">
            <h2 className="text-[20px]" onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </h2>
            <h2 className="text-[24px] font-semibold uppercase tracking-tighter">Details</h2>
          </div>
        </div>
        <div className="w-full flex flex-col justify-end items-center h-[20vh] text-center relative py-4">
          <div className="absolute -top-14 left-[50%] -translate-x-1/2">
            <h2 className="text-[14vh]">
              <PiUserCircleLight />
            </h2>
          </div>
          <h2 className="text-2xl font-semibold">{userData?.fullName}</h2>
          <p className="mt-2 py-1 px-3 bg-gray-300 w-content items-center rounded-md">
            {userData?.email}
          </p>
        </div>
        <div className="w-full px-6 mt-2">
          <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
            <h2 className="font-semibold text-xl uppercase">your college name</h2>
            <p className="mt-1">{userData?.collegeName ? userData.collegeName : "......"}</p>
          </div>
          <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
            <h2 className="font-semibold text-xl uppercase">branch</h2>
            <p className="mt-1">{userData?.branch ? userData.branch : "......"}</p>
          </div>
          <div className="py-1 border-b-[1px] border-zinc-800 mt-2">
            <h2 className="font-semibold text-xl uppercase">semester</h2>
            <p className="mt-1">{userData?.semester ? userData.semester : "......"}</p>
          </div>
          <div className="flex items-center justify-center mt-5">
            <Link
            to="/userdetails/editprofile"
            className="px-10 bg-gray-300 py-2 uppercase font-semibold border rounded-xl">
              Edit 
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
