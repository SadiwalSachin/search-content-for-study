import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";
import { RiMenu3Line } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const mobileVariants = {
  initial: {
    scaleY: 0,
  },
  animate: {
    scaleY: 1,
    transition:{
      duration:.3
    }
  },
  exit: {
    scaleY: 0,
  },
};

function Navbar() {
  const [openMobileNav, setOpenMobileNav] = useState(false);
  const handleMobileMenu = () => {
    setOpenMobileNav((prev) => !prev);
  };

  return (
    <nav className="w-full py-6 md:px-[4.5vw] p-[5vh] px-[4vh] flex items-center justify-between border-b-[1px] border-zinc-300 relative bg-zinc-800 text-white">      
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
          to="/addpyq"
        >
          
          Add PYQ
        </NavLink>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/totalpyq"
        >
          Total PYQ
        </NavLink>
        <NavLink
          style={(e) => {
            return {
              color: e.isActive ? "orange" : "",
            };
          }}
          className="text-base"
          to="/users"
        >
          Users
        </NavLink>
      </div>
      <div className="nav-part2 cursor-pointer">Login / Signup</div>

      {/* Mobile Navbar */}

      <AnimatePresence>
        <motion.div
          variants={mobileVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`mobile-navigation absolute z-[1] duration-300 ease-linear bg-zinc-400  top-[0] left-0 w-full sm:hidden ${
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
              to="/addpyq"
            >
              Add PYQ
            </NavLink>
            <NavLink
              className="text-2xl hover:text-[27px] duration-300 "
              to="/users"
            >
              Users
            </NavLink>
            {/* <NavLink
              className="text-2xl hover:text-[27px] duration-300 "
              to="/imagesearch"
            >
              Image Search
            </NavLink> */}
          </div>
        </motion.div>
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
