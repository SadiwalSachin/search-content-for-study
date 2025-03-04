import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader";
import { url } from "../Constants/constants";

const AISearch = () => {
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token")

  const { query } = useSelector((state) => state.aiSearch);
  console.log(query);
  const [searchInput, setSearchInput] = useState({
    prompt: "",
  });

  const [data, setData] = useState("");

  const onChangeHandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setSearchInput((prev) => ({ ...prev, [name]: value }));
  };

  const searchViaAi = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:4000/api/v1/search/gemini-ai`,
        searchInput,
        {
          headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response) {
        console.log(response);
        setLoading(false);
        setData(response.data.data);
      } else {
        console.log("Some error occured");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (query) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.post(
            "http://localhost:4000/api/v1/search/gemini-ai",
            { prompt: query }, // Send an object with the prompt property
            { 
              headers: {
                Authorization:`Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log(response);
          setData(response.data.data);
        } catch (error) {
          console.error("Error fetching AI data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="md:px-[4.5vw] px-[2vh] bg-[#FFFFFF] w-full flex flex-col items-center text-white ">
        <h1 className="md:text-[3vw] w-full text-[3.9vh] mt-10 text-[#18181B] md:w-[80%] md:mt-16 text-center">
          AI-powered search......
        </h1>
        <div className="h-[7vh] md:w-[60%] w-full rounded-3xl mt-6 overflow-hidden flex items-center bg-[#FFFFFF] border-[1px]">
          <input
            onChange={onChangeHandler}
            name="prompt"
            value={searchInput.prompt}
            className="h-full w-[90%] bg-transparent outline-none text-black px-6 focus:bg-transparent"
            type="text"
            placeholder="Enter a text here.."
          />
          <button
            onClick={searchViaAi}
            className="md:px-[4vh] px-3 py-[1vh] rounded-3xl bg-[#18181B] md:mr-2 mr-1 text-white"
          >
            Search
          </button>
        </div>
        <div
          className="w-full min-h-[50vh] md:min-h-[70vh] mt-10
         bg-[#F4F4F5] rounded-2xl
      "
        >
          <div className="right mt-5 md:mt-0 md:min-h-full w-full text-black px-2 py-3">
            <div className="w-full border-b-[1px] pb-3">
              <h2 className="text-center w-full md:text-3xl uppercase font-semibold">
                -- google --
              </h2>
            </div>
            <p>{data}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AISearch;
