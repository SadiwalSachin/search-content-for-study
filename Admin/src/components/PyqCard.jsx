import React from "react";
import { useState } from "react";
import {useNavigate} from "react-router-dom"
import axios from "axios"
import EditPyq from "./EditPyq";
import { toast } from "react-toastify";

const PyqCard = ({data , index}) => {

  const [editPyqState,setEditPyqState]=useState(false)

  const deletePyq = async () => {
    try {
     const response =  await axios.post("http://localhost:6767/pyq/deletepyq",{id:data._id})
     if(response){
      console.log("response after trying to delete pyq :",response)
      toast.success(response.data.message)
     }
    } catch (error) {
      
    }
  }
  const navigate = useNavigate()

  return (
    <>
      {editPyqState ? <EditPyq id={data._id} editPyqState={editPyqState} setEditPyqState={setEditPyqState}/>:""}
      <div key={index} className="w-full py-3 bg-[#F4F4F5] rounded-md">
        <div className="flex items-center justify-between px-5 py-2">
          <p className="inline-block w-[90%]">
           Q.{data.question}
          </p>
          <p className="block">{data.year}</p>
        </div>
        <div className="w-full flex justify-between gap-5 px-5 mt-4">
          <div className="flex justify-between gap-5">
            <h2>{data.examType}</h2>
            <h2>Unit-{data.unit}</h2>
            <h2>Topic-{data.topic}</h2>
            <h2>Repeated-{data.repeated}</h2>
            <h2>Marks-{data.marks}</h2>
            <p>{data.branch}</p>
            <p>{data.examYear}</p>
            <p>{data.subjectCode}</p>
          </div>
          <div className="flex gap-4">
            <button
            onClick={()=>setEditPyqState(true)}
             className="px-6 py-2 bg-zinc-700 rounded-md text-white">
              Edit
            </button>
            <button 
            onClick={deletePyq}
            className="px-6 py-2 bg-zinc-700 rounded-md text-white">
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PyqCard;
