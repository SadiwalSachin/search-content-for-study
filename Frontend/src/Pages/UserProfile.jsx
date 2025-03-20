import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { PiUserCircleLight } from "react-icons/pi";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdVpnKey } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { IoMdPhonePortrait } from "react-icons/io";
import { FcViewDetails } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch , useSelector } from "react-redux";
import axios from "axios";
import { setUserData , setLogOut } from "../redux/Slices/userSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const UserProfile = () => {
  // const token = localStorage.getItem("token");
  const userDetails = useSelector((state)=>state?.user?.userData)

  const [loading, setLoading] = useState(false);
  // const [userDetails, setUserDetails] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const logOutUser = () => {
    localStorage.removeItem("token");
    dispatch(setLogOut());
    toast.success("User logout successfully");
    navigate("/");
  };

  // const getUserDetails = async () => {
  //   try {
  //     const response = await axios.get("https://search-content-user-service.onrender.com/api/v1/user/get-user-details", {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     const data =  response.data.user
  //     console.log(data); 
  //     dispatch(setUserData(data))
  //     setUserDetails(data);
      
  //   } catch (error) {
  //     if(error.message === "Network Error"){
  //       toast.error(`${error.message} : Try Again Later`)
  //       navigate("/")
  //     }
  //     console.error(error);
  //     console.log("some error occurred while getting user details", error);
  //   }
  // };

  // useEffect(() => {
  //   getUserDetails();
  // }, []);


  return (
    <>
      {loading ? <Loader />: ""}
      <div className="w-full h-screen absolute  bg-[#FFFFFF] z-30 top-0 flex flex-col">
        <div className="w-full px-4 py-5 cursor-pointer h-[15vh] bg-[#F4F4F5]">
          <div className="w-full flex items-center justify-between ">
            <h2 className="text-[20px]" onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </h2>
            <h2 className="text-[24px] font-semibold uppercase tracking-tighter">
              Profile
            </h2>
          </div>
        </div>
        <div className="w-full flex flex-col justify-end items-center text-center relative">
          <div className="absolute -top-14 left-[50%] -translate-x-1/2">
            <h2 className="text-[14vh]">
              <PiUserCircleLight />
            </h2>
          </div>
          <h2 className="text-2xl mt-20 font-semibold">{userDetails?.fullName}</h2>
          <p className="mt-2 py-1 px-3 bg-gray-300 w-content items-center rounded-md">
            {userDetails?.email}
          </p>
          <p className="mt-2 py-1 px-3 bg-gray-300 w-content items-center rounded-md">
            {userDetails?.branch}
          </p>
        </div>
        <div className="w-full h-[50%] mt-10">
          <div className="w-full mt-2">
            <h2 className="w-full py-2 px-3 bg-gray-200 text-xl font-semibold">
              General Settings
            </h2>
            <ul className="w-full mt-1">
              <li className="flex items-center text-xl justify-between px-4 py-2">
                <FcViewDetails />
                <p className="w-[70%]">User Details</p>{" "}
                <Link to="/userdetails">
                  <MdKeyboardArrowRight className="cursor-pointer" />
                </Link>
              </li>
              <li className="flex items-center text-xl justify-between px-4 py-2">
                <IoMdPhonePortrait />
                <p className="w-[70%]">About App</p>{" "}
                <MdKeyboardArrowRight className="cursor-pointer" />
              </li>
              <li className="flex items-center text-xl justify-between px-4 py-2">
                <RiLogoutBoxLine />
                <p className="w-[70%]">Log Out</p>{" "}
                <p onClick={logOutUser}>
                  <MdKeyboardArrowRight className="cursor-pointer" />
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
