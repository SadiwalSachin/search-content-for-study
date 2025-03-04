import React from "react";
import axios, { all } from "axios";
import { useState, useEffect } from "react";
import PyqCard from "../components/PyqCard";
import SelectPyq from "../components/SelectPyq";

const TotalPyq = () => {

  const [allPyq, setAllPyq] = useState([]);

  const allPyqData = async () => {
    try {
      const response = await axios.get("http://localhost:6767/pyq/findallpyq");

      if (response) {
        console.log("all pyq fetched");
        console.log("response is there :", response);
        setAllPyq(response.data.data);
      }
    } catch (error) {
      console.log("some error occured while fetching all pyq");
      console.log(error);
    }
  };

  useEffect(() => {
    allPyqData();
  }, []);

  return (
    <>
      <div className="py-6 md:px-[4.5vw] p-[5vh] px-[4vh] bg-zinc-600 w-full flex-col flex gap-y-5">
        <SelectPyq />
        {allPyq.map((item, index) => (
          <PyqCard data={item} index={index} />
        ))}
      </div>
    </>
  );
};

export default TotalPyq;
