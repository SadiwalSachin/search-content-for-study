import React from "react";
import { LuSearch } from "react-icons/lu";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { FaRegCirclePlay } from "react-icons/fa6";
import { MdOutlineCameraAlt } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {motion} from "framer-motion"

const Home = () => {
  const navigate = useNavigate();

  const details = [
    {
      icon: <MdOutlineLibraryBooks />,
      heading: "View All PYQs",
      subHeading: "Browse through a vast collection of previous year questions to aid your exam preparation.",
      btnText: "View PYQ",
      url: "/viewallpyq",
    },
    {
      icon: <FaRegCirclePlay />,
      heading: "Find Playlist",
      subHeading: "Browse through a vast collection of playlist of questions and videos to aid your exam preparation.",
      btnText: "View Playlist",
      url: "/findplaylist",
    },
    {
      icon: <MdOutlineCameraAlt />,
      heading: "Search On AI",
      subHeading: "Browse through a vast collection of playlist of questions and videos to aid your exam preparation.",
      btnText: "Search",
      url: "/imagesearch",
    }
  ];

  return (
    <div className=" w-full flex flex-col items-center  bg-[#FFFFFF] mb-20">
      <div className="w-full h-[55vh] md:h-[40vh] text-white  flex bg-[#18181B] flex-col items-center justify-center md:px-[4.5vw] px-[4vh]  ">
        <motion.h1 
        initial={{opacity:0,x:-200}}
        animate={{opacity:1,x:0}}
        transition={{duration:.4}}
        className="md:text-[2.5vw] tracking-tighter leading-none text-[3.5vh] text-center font-semibold">
          Your One-Stop Solution for Seamless Academic Management
        </motion.h1>
        <h2 className="md:text-[1.3vw] text-xs text-center md:font-medium mt-4">
          SEARCH offers a range of features to enhance your educational
          experience, including Previous Year Questions, user management, and
          more.
        </h2>
        <motion.div
        transition={{staggerChildren:.2}}
        className="md:mt-8 mt-6 flex flex-col md:flex md:flex-row md:gap-9 gap-2 w-full items-center justify-center">
          <motion.button
          initial={{scale:0,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{ease:"easeInOut",duration:.3}}
            onClick={() => navigate("/viewallpyq")}
            className="md:px-[6vh] md:py-3 px-[3vw] py-1 bg-transparent hover:bg-white font-medium hover:text-black border-zinc-100 border-2 rounded-md text-zinc-100"
          >
            View All PYQs
          </motion.button>
          <motion.button
          initial={{scale:0,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{ease:"easeInOut",duration:.3}}
            onClick={() => navigate("/aiserach")}
            className="md:px-[6vh] md:py-3 px-[3vw] py-1 bg-transparent hover:bg-white font-medium hover:text-black border-zinc-100 border-2 rounded-md text-zinc-100"
          >
            Search On AI
          </motion.button>
          <motion.button
          initial={{scale:0,opacity:0}}
          animate={{scale:1,opacity:1}}
          transition={{ease:"easeInOut",duration:.3}}
            onClick={() => navigate("/findplaylist")}
            className="md:px-[6vh] md:py-3 px-[3vw] py-1 bg-transparent hover:bg-white font-medium hover:text-black border-zinc-100 border-2 rounded-md text-zinc-100"
          >
            Find Your Own Playlist
          </motion.button>
        </motion.div>
      </div>
      <div className="md:w-[80%]  bg-[#FFFFFF] px-[7vw]">
       <div>
       <h1 className="md:text-[2.7vw] text-[4vh] font-semibold text-[#09090B] md:mt-10 mt-5">
          Explore Our Features
        </h1>
        <h2 className="md:text-[1.3vw] mt-3 leading-none">
          Discover how SEARCH can enhance your academic journey.
        </h2>
       </div>
        <div className="flex w-full mt-10 items-center gap-x-10 flex-wrap gap-y-10">
        {details.map((item, index) => (
            <motion.div
            key={index}
            initial={{opacity:0}}
            transition={{duration:.7,ease:"easeInOut"}}
            whileInView={{opacity:1}}
            className="md:w-[45%] h-[35vh] bg-[#F4F4F5] rounded-xl text-black px-5 flex flex-col justify-between md:py-8 py-5">
              <h2 className="text-3xl">{item.icon}</h2>
              <h2 className="font-semibold text-2xl">{item.heading}</h2>
              <p className="text-[2.3vh]">{item.subHeading}</p>
              <button onClick={()=>navigate(item.url)} className="md:px-[6vh] md:py-3 px-[3vw] py-1 w-[50%] bg-zinc-800 text-white mt-2 rounded-lg">
                {item.btnText}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
