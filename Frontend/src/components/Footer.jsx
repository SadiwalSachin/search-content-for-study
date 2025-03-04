import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { SiInstagram } from "react-icons/si";

const Footer = () => {
  return (
    <>
      <div className="w-full md:h-[28vh] py-6 md:px-[4.5vw] p-[5vh] px-[4vh] bg-[#18181B] mt-20">
        <div className="w-full  flex flex-col md:flex md:flex-row md:items-center justify-between gap-y-6 md:gap-y-0 text-white border-b-[1px] border-white py-3">
          <div>
            <h2 className="text-xl font-semibold">SEARCH</h2>
            <ul className="flex mt-2 gap-2 text-xl cursor-pointer">
              <h2><FaLinkedin/></h2>
              <h2><SiInstagram/></h2>
              <h2></h2>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Contact us</h2>
            <p>sachinsadiwal7615@gmail.com</p>
            <p>+91-7415162758</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">Feedback</h2>
            <p>give us to your valuable feedback</p>
            <input type="text" className="outline-none rounded-md md:px-4 px-3 py-1 mt-2 w-full" placeholder="Give your valuable feedback" />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-center text-white font-semibold">Copyright @ 2024</p>
          <p className="text-center text-white text-xs">Thanks for using our website till then keep learning and keep exploring</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
