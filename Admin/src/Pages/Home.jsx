import React from "react";
import { LuUpload } from "react-icons/lu";
import { TbUsers } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const details = [
    {
      icon: <LuUpload />,
      heading: "Upload PYQs",
      subHeading:
        "Easily upload your Previous Year Questions and share them with the community.",
      btnText: "Get Started",
      url: "/addpyq",
    },
    {
      icon: <TbUsers />,
      heading: "View All Users",
      subHeading: "Browse and connect with all users",
      btnText: "View users",
      url: "/users",
    },
    {
      icon: <LuUpload />,
      heading: "View All PYQ's",
      subHeading: "View all the important pyq",
      btnText: "All PYQ",
      url: "/totalpyq",
    },
  ];

  const navigate = useNavigate()

  return (
    <div className="w-full ">
      <div className="w-full text-white flex flex-col items-center justify-center h-[60vh] bg-zinc-800">
        <h1 className="md:text-[3vw] font-semibold">Welcome to Our Services</h1>
        <h2 className="text-[1.4vw]">Add Pyq and view all the users</h2>
        <div className="mt-8 flex gap-9 w-full items-center justify-center">
          <button onClick={()=>navigate("/addpyq")} className="px-[6vh] py-3 bg-white rounded-md font-medium hover:bg-transparent hover:border-zinc-100 hover:border-2 hover:text-white text-black">
            Add PYQ
          </button>
          <button onClick={()=>navigate("/totalpyq")} className="px-[6vh] py-3 bg-transparent hover:bg-white font-medium hover:text-black border-zinc-100 border-2 rounded-md text-zinc-100">
            View PYQ
          </button>
        </div>
        <div></div>
      </div>
      <div className="w-full h-[70vh] py-6 md:px-[4.5vw] p-[5vh] px-[4vh] flex flex-col">
        <div>
          <h1 className="text-[3vw] font-semibold">Add PYQs with Ease</h1>
          <h2 className="font-medium text-[1.3vw] mt-5">
            Our intuitive interface makes it simple to add and manage your
            Previous Year Questions
          </h2>
        </div>
        <div className="flex mt-10 items-center justify-between">
          {details.map((item, index) => (
            <div className="w-[30%] h-[35vh] bg-[#F4F4F5] rounded-xl text-black px-5 flex flex-col justify-between py-8">
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-semibold text-2xl">{item.heading}</h2>
              <p className="text-[2.3vh]">{item.subHeading}</p>
              <button onClick={()=>navigate(item.url)} className="px-[6vh] py-3 w-[50%] bg-zinc-800 text-white rounded-lg">
                {item.btnText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
