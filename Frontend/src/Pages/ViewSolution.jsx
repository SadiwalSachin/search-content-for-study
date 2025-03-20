import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ViewSolution = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { pyqId } = useParams();
  const [loading, setLoading] = useState(true);
  const [solutionData, setSolutionData] = useState();

  const getSolution = async () => {
    console.log("fetching solution");
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/pyq/get-solution?pyqId=${pyqId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response?.data;

      if (data?.success) {
        console.log(data);
        setLoading(false);
        setSolutionData(data?.data);
        console.log(solutionData);

        // toast.success(data?.message)
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getSolution();
  }, []);

  return (
    <>
      {loading ? <Loader /> : ""}
      <div className="text-black h-screen flex bg-slate-200 flex-col w-full px-[4vh] md:px-[4.5vw]">
        <button
        onClick={()=>navigate(-1)}
        className="md:px-6 md:py-2 px-2 py-3 bg-zinc-700 rounded-md text-white text-xs mt-3 w-fit">
          {"<-"}BACK
        </button>
        <div className="w-full py-3 bg-[#F4F4F5] mt-3">
          <div className="flex items-center md:justify-between flex-wrap px-5 py-2">
            <p className="inline-block md:w-[90%] w-full">
              Q. {solutionData?.pyq?.question}
            </p>
            <p className="block mt-1 md:mt-0">{solutionData?.pyq?.examYear}</p>
          </div>
          <div className="w-full flex md:justify-between flex-wrap gap-y-2 md:gap-5 px-5 mt-4">
            <div className="flex md:justify-between flex-wrap md:gap-5 gap-x-3 md:text-balance text-xs">
              <h2>{solutionData?.pyq?.examType}</h2>
              <h2>Unit-{solutionData?.pyq?.unit}</h2>
              <h2>Topic-{solutionData?.pyq?.topic}</h2>
              <h2>Repeated-{solutionData?.pyq?.repeated}</h2>
              <h2>Marks-{solutionData?.pyq?.marks}</h2>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full mt-3">
          <h2>This is Solution</h2>
          {solutionData?.solutionImage && (
            <img src={solutionData?.solutionImage} />
          )}
          <h3>Solution is provided by :{solutionData?.solvedByUser_NAME}</h3>
        </div>
        <div className="w-full">
          <button
            //   onClick={searchOnYoutbe}
            className="md:px-6 md:py-2 px-2 py-3 bg-zinc-700 rounded-md text-white text-xs"
          >
            Search on YT
          </button>
        </div>
      </div>
    </>
  );
};

export default ViewSolution;
