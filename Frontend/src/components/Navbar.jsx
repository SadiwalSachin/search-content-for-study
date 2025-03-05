import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { LuUserCircle2 } from "react-icons/lu";
import { useSelector } from "react-redux";

const mobileVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    scaleY: 0,
  },
};

function Navbar() {

  const isLoggedIn = useSelector((state)=> {
    return state.authUser.isLoggedIn
  }) && localStorage.getItem("token")

  const [openMobileNav, setOpenMobileNav] = useState(false);
  const handleMobileMenu = () => {
    setOpenMobileNav((prev) => !prev);
  };

  return (
    <nav className="w-full py-4 md:px-[4.5vw] px-[3vh] flex items-center justify-between border-b-[1px] border-zinc-300 relative bg-[#242427] text-white">
      <div className="logo-and-menubar flex items-center">
        <span
          onClick={handleMobileMenu}
          className={`menu-bar ${
            openMobileNav ? "hidden" : "block"
          } sm:hidden mr-4 text-2xl cursor-pointer`}
        >
          <RiMenu3Line />
        </span>
        <h2 className="logo font-semibold text-2xl uppercase">SEARCH</h2>
      </div>
      <div className="nav-part1 md:flex items-center gap-[3vw] hidden sm:flex">
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/aiserach"
        >
          AI Search
        </NavLink>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/findplaylist"
        >
          Find Playlist
        </NavLink>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/viewallpyq"
        >
          All PYQs
        </NavLink>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/connect"
        >
          Connect
        </NavLink>
      </div>
      <div className="flex">
      {isLoggedIn ? (
        <NavLink
          to="/userprofile"
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
        >
          <h2 className="text-3xl">
            <LuUserCircle2 />
          </h2>
        </NavLink>
      ) : (
        <NavLink to="/login" className="nav-part2 cursor-pointer font-semibold uppercase">
          Login / Signup
        </NavLink>
      )}

      </div>
     
      {/* Mobile Navbar */}

      <AnimatePresence>
        <motion.div
          variants={mobileVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`mobile-navigation absolute z-[1] duration-300 ease-linear bg-[#F4F4F5] top-[0] left-0 w-full sm:hidden ${
            openMobileNav ? "block h-screen" : "hidden"
          }`}
        >
          <span
            onClick={handleMobileMenu}
            className={`cross ${
              !openMobileNav ? "hidden" : "block"
            } md:hidden absolute z-[2] text-3xl hover:text-[35px] duration-300 top-7 left-6 text-black`}
          >
            <RxCross2 />
          </span>
          <div
            onClick={handleMobileMenu}
            className="nav-links flex flex-col gap-3 mt-32 px-6 z-[2] text-black"
          >
            <NavLink
              className="text-2xl hover:text-[27px] duration-300 "
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className="text-2xl hover:text-[27px] duration-300 "
              to="/aiserach"
            >
              AI Search
            </NavLink>
            <NavLink
              className="text-2xl hover:text-[27px] duration-300 "
              to="/findplaylist"
            >
              Find Playlist
            </NavLink>
            <NavLink
              className="text-2xl hover:text-[27px] duration-300 "
              to="/viewallpyq"
            >
              All PYQs
            </NavLink>
          </div>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
