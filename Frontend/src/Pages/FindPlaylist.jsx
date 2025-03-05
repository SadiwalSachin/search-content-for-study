import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import YoutubeVideo from "../components/YoutubeVideo";
import Loader from "../components/Loader";

const FindPlaylist = () => {
  const [loading, setLoading] = useState(false);

  const pyqSearch = useSelector((state) => state.youtube);
  console.log(pyqSearch);

  const token = localStorage.getItem("token")
  const [data, setData] = useState([]);

  const [searchContent, setSerachContent] = useState({});

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSerachContent((prev) => ({ ...prev, [name]: value }));
  };

  const searchContentOnYT = async () => {
   try {
    setLoading(true)
     const response = await axios.post(
       `https://search-content-pyq-service.onrender.com/api/v1/search/search-on-yt`,
       searchContent,
       {
        headers:{
          Authorization:`Bearer ${token}`
        }
       }
     );
 
     if (response) {
       console.log("Youtube video has came");
       setLoading(false)
       setData(response.data);
       console.log(data);
     }
   } catch (error) {
    setLoading(false)
    console.log(error);
    
   }
  };

  useEffect(() => {
    if (pyqSearch.query === "") {
    } else {
      const searchContentOnYT = async () => {
        setLoading(true)
        const response = await axios.post(
          "https://searchcontent.onrender.com/prompt/search-on-yt",
          pyqSearch
        );

        if (response) {
          console.log("Youtube video has came");
          setLoading(false)
          setData(response.data);
          console.log(data);
        }
      };

      searchContentOnYT();
    }
  }, []);

  useEffect(() => {
    console.log(searchContent);
  }, [searchContent]);

  const link = "";

  return (
    <>
    {loading ? <Loader/> : ""}
      <div className="md:px-[4.5vw] min-h-screen px-[2vh] bg-[#FFFFFF] w-full flex flex-col items-center">
        <div className="w-full flex items-center justify-center">
          <h1 className="md:text-[3vw] text-black w-[80%] text-center md:mt-16 mt-10 text-[3vh] font-semibold">
            Find your playlist here.....
          </h1>
        </div>
        <div className="h-[6vh] md:w-[60%] w-full rounded-3xl mt-6 overflow-hidden flex gap-4 items-center bg-slate-50 border-[1px]">
          <input
            onChange={onChangeHandler}
            name="query"
            value={searchContent.query}
            className="h-full w-[70%] bg-transparent outline-none text-black px-6"
            type="text"
            placeholder="Serach here.."
          />
          <select
            onChange={onChangeHandler}
            name="type"
            value={searchContent.type}
            className="h-full w-[30%] border-zinc-500 rounded-3xl border bg-transparent outline-none text-black md:px-6"
            type="text"
            placeholder="Enter type"
          >
            <option value="video">Video</option>
            <option value="playlist">playlist</option>
          </select>
        </div>
        <button
          onClick={searchContentOnYT}
          className="px-[8vh] py-[1.4vh] rounded-3xl bg-[#18181B] mt-10 mr-2 text-white"
        >
          Search
        </button>

        <div className=" min-h-screen  w-full mt-10 rounded-3xl grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-wrap md:px-8 md:py-10 px-1">
          {data.map((item, index) => (
            <YoutubeVideo item={item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default FindPlaylist;
