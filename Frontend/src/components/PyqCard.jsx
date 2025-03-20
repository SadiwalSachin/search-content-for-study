import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setYtSearch } from "../redux/Slices/youtubeSlice";
import { setAISearch } from "../redux/Slices/aiSlice";
import { motion } from "framer-motion";
import { raisePyq } from "../redux/Slices/raisedPyqSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "./Loader";

const PyqCard = ({ data, index }) => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state?.user?.userData);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  // console.log(data);

  const query = useSelector((state) => state.youtube);
  const navigate = useNavigate();

  // console.log(query);

  const searchOnYoutbe = () => {
    dispatch(
      setYtSearch({
        query: data.question,
        type: "video",
      })
    );
    navigate("/findplaylist");
  };

  // raise pyq for soltion
  const raiseForSolution = async (id) => {
    console.log("Pyq raised");

    try {
      setLoading(true);
      const response = await axios.post(
        `https://search-content-pyq-service.onrender.com/api/v1/pyq/raise-pyq-for-solution?pyqId=${id}&username=${userData?.fullName}&userId=${userData?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
      
      const data = response?.data;
      console.log(data);
    
      if (data?.success) {
        setLoading(false);
        dispatch(raisePyq([data]));
        toast.success(data?.message);
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log("Error occured while raising pyq", error);
    }
  };

  return (
    <>
      {loading ? <Loader /> : ""}
      <motion.div
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        whileInView={{ opacity: 1 }}
        key={index}
        className="w-full py-3 bg-[#F4F4F5] rounded-md"
      >
        <div className="flex items-center md:justify-between flex-wrap px-5 py-2">
          <p className="inline-block md:w-[90%] w-full">Q. {data?.question}</p>
          <p className="block mt-1 md:mt-0">{data?.examYear}</p>
        </div>
        <div className="w-full flex md:justify-between flex-wrap gap-y-2 md:gap-5 px-5 mt-4">
          <div className="flex md:justify-between flex-wrap md:gap-5 gap-x-3 md:text-balance text-xs">
            <h2>{data?.examType}</h2>
            <h2>Unit-{data?.unit}</h2>
            <h2>Topic-{data?.topic}</h2>
            <h2>Repeated-{data?.repeated}</h2>
            <h2>Marks-{data?.marks}</h2>
          </div>
          <div className="flex md:gap-4 gap-x-2">
            <button
              onClick={searchOnYoutbe}
              className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs"
            >
              Search on YT
            </button>
            {/* {data?.solved === "NOTSOLVED" && (
              <button
                onClick={() => raiseForSolution(data?.id)}
                className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs"
              >
                Raise For Solution
              </button>
            )}

            {data?.solved === "SOLVING" && (
              <h2 className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs">
                Solving......
              </h2>
            )}

            {data?.solved === "SOLVED" && (
              <Link
                to={`/viewallpyq/view-solution/${data?.id}`}
                className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs"
              >
                View Solution
              </Link>
            )} */}

            {/* <Link
            to="/aiserach"
            onClick={()=>searchOnAI(data.question)}
            className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs">
              Search on AI
            </Link> */}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PyqCard;
