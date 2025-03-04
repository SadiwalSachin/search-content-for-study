import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setYtSearch } from "../redux/Slices/youtubeSlice";
import {setAISearch} from "../redux/Slices/aiSlice"
import {motion} from "framer-motion"

const PyqCard = ({ data, index }) => {
  const dispatch = useDispatch();

  const query = useSelector((state) => state.youtube);

  console.log(query);

  const searchOnYoutbe = () => {
    dispatch(
      setYtSearch({
        query: data.question,
        type: "video",
      })
    );
  };

  const searchOnAI = (question) => {
    dispatch(setAISearch(question))
  }

  return (
    <>
      <motion.div
      initial={{opacity:0}}
      transition={{duration:.3,ease:"easeInOut"}}
      whileInView={{opacity:1}}
      key={index} className="w-full py-3 bg-[#F4F4F5] rounded-md">
        <div className="flex items-center md:justify-between flex-wrap px-5 py-2">
          <p className="inline-block md:w-[90%] w-full">Q. {data.question}</p>
          <p className="block mt-1 md:mt-0">{data.examYear}</p>
        </div>
        <div className="w-full flex md:justify-between flex-wrap gap-y-2 md:gap-5 px-5 mt-4">
          <div className="flex md:justify-between flex-wrap md:gap-5 gap-x-3 md:text-balance text-xs">
            <h2>{data.examType}</h2>
            <h2>Unit-{data.unit}</h2>
            <h2>Topic-{data.topic}</h2>
            <h2>Repeated-{data.repeated}</h2>
            <h2>Marks-{data.marks}</h2>
          </div>
          <div className="flex md:gap-4 gap-x-2">
            <Link
              to="/findplaylist"
              onClick={searchOnYoutbe}
              className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs"
            >
              Search on YT
            </Link>
            <Link
            to="/aiserach"
            onClick={()=>searchOnAI(data.question)}
            className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs">
              Search on AI
            </Link>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PyqCard;
