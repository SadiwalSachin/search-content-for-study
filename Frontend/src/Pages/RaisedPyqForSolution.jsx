import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import ProvideSolution from "../components/ProvideSolution";
import { raisePyq } from "../redux/Slices/raisedPyqSlice";
import Loader from "../components/Loader";

const RaisedPyqForSolution = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const raisedPyq = useSelector((state) => state.raisedPyq.raisedPyq);
  const [allRaisedPyqData, setAllRaisedPyqData] = useState([]);
  const [loadingForProvideSolution, setLoadingForProvideSolution] = useState(false);
  const [loading,setLoading] = useState(false)
  const [pyqID, setPyqID] = useState();
  console.log(raisedPyq);
  console.log(allRaisedPyqData);

  const giveSolution = (id) => {
    setLoadingForProvideSolution(true)
    setPyqID(id);
  };

  const fetchInitialRaised = async () => {

    setLoading(true)

    try {
      const response = await axios.get(
        `https://search-content-pyq-service.onrender.com/api/v1/pyq/get-raised-pyq`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      const data = response?.data?.data;
      if (response?.data?.success) {
        setLoading(false)
        console.log(data);
        dispatch(raisePyq(data));
        // setAllRaisedPyqData((prev)=>[...prev,...data])
        console.log(allRaisedPyqData);
      }
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };
  // initial fetch of raised pyq data
  useEffect(() => {
    if (!raisedPyq.length) {
      fetchInitialRaised();
    }
  }, []);

  return (
    <>
      {loadingForProvideSolution ? (
        <ProvideSolution
          setShowProvideSolutionComponent={setLoadingForProvideSolution}
          id={pyqID}
        />
      ) : (
        ""
      )}
      {loading ? <Loader/> : ""}
      <div className="md:px-[4.5vw] bg-[#FFFFFF] w-full flex flex-col items-center h-screen">
        <h1 className="md:text-[3vw] text-black w-[80%] text-center md:mt-16 mt-10 text-[3vh] font-semibold">
          Raised PyQ For Solution
        </h1>

        <div className="py-6 md:px-[4.5vw] p-[5vh] px-[2vh] bg-[#FFFFFF] w-full flex-col flex gap-y-5 h-[80vh] no-scrollbar overflow-auto">
          {raisedPyq?.map((data, index) => (
            <div
              key={index}
              className="w-full py-3 bg-[#F4F4F5] rounded-md mt-2"
            >
              <div className="flex items-center md:justify-between flex-wrap px-5 py-2">
                <p className="inline-block md:w-[90%] w-full">
                  Q. {data?.pyq?.question}
                </p>
                <p className="block mt-1 md:mt-0">{data?.pyq?.examYear}</p>
              </div>
              <div className="w-full  justify-between flex md:justify-between flex-wrap gap-y-2 md:gap-5 px-5 mt-4">
                <div className="flex md:justify-between flex-wrap md:gap-5 gap-x-3 md:text-balance text-xs">
                  <h2>Marks-{data?.pyq?.marks}</h2>
                </div>
                <div className="flex md:gap-4 gap-x-2">
                  <button
                    onClick={() => giveSolution(data?.pyqId)}
                    className="md:px-6 md:py-2 px-2 py-1 bg-zinc-700 rounded-md text-white text-xs"
                  >
                    Provide Solution
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RaisedPyqForSolution;
