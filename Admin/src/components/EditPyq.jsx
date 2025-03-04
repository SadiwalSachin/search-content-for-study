import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";

const EditPyq = ({ editPyqState, setEditPyqState, id }) => {
  const [loading, setLoading] = useState(true);

  const [questionImage, setQuestionImage] = useState("");
  const [data, setData] = useState({});

  const onChnageHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(data)
    const formData = new FormData();

    for (const key in data) {
     formData.append(`${key}` , data[key])
    }
    formData.append("image", questionImage);
    formData.append("id",id)
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:6767/pyq/editpyq",
        formData
      );

      if (response) {
        toast.success(response.data.message);
        console.log(response);
      } else {
        console.log("Axios request failed of saving question");
      }
    } catch (error) {
      toast.error(error.message);
      console.log("error during question saving : ", error);
      console.log(error.message);
    }
  };

  useEffect(() => {
    console.log(id);
    const editpyq = async (id) => {
      try {
        console.log("trying to fetch data for editnig pyq");
        const response = await axios.post(
          "http://localhost:6767/pyq/findeditingpyq",
          { id: id }
        );
        console.log(response);
        setData(response.data.data);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)
      }
    };

    editpyq(id);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" py-6 md:px-[4.5vw] p-[5vh] px-[4vh] w-full  bg-[#27272A] absolute">
          <Link
            onClick={() => setEditPyqState(false)}
            to="/totalpyq"
            className="px-4 py-2 bg-zinc-700 rounded-md text-white absolute top-5"
          >
            back
          </Link>
          <h1 className="md:text-[2.5vw] text-xl text-center text-white">
            Edit Question
          </h1>
          <form
          onSubmit={handleFormSubmit}
          className=" w-full  border-zinc-300 rounded-md md:mt-10 mt-6 py-5 border"
          action=""
        >
          <div className="w-full md:flex md:px-10 px-3 gap-10">
            <div className="md:w-[50%] md:flex md:flex-col items-center">
              <label
                className="block w-full text-md text-white"
                htmlFor="question"
              >
                Question
              </label>
              <textarea
                placeholder="Enter Question"
                cols={50}
                name="question"
                value={data.question}
                onChange={onChnageHandler}
                type="text"
                id="question"
                className="w-full outline-none rounded-md mt-3 py-4 p-2"
              />
            </div>
            <div className="md:w-[20%] md:flex md:flex-col items-center">
              <label
                className="w-full text-md text-white"
                htmlFor="unit"
              >
                Unit
              </label>
              <select
                placeholder="Enter Unit"
                type="number"
                name="unit"
                value={data.unit}
                onChange={onChnageHandler}
                id="unit"
                className="outline-none w-full p-2 rounded-md mt-3"
              >
                <option value="select unit">Unit</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="md:w-[20%] md:flex md:flex-col items-center">
              <label
                className="w-full text-md text-white"
                htmlFor="repeated"
              >
                Repeated
              </label>
              <input
                placeholder="Enter Repeated Time"
                type="number"
                name="repeated"
                value={data.repeated}
                onChange={onChnageHandler}
                id="repeated"
                className="outline-none w-full p-2 rounded-md mt-3"
              />
            </div>
            <div className="md:w-[10%] md:flex md:flex-col items-center">
              <label
                className="w-full text-md text-white"
                htmlFor="marks"
              >
                Marks
              </label>
              <select
                placeholder="Enter marks"
                type="number"
                name="marks"
                value={data.marks}
                onChange={onChnageHandler}
                id="marks"
                className="outline-none w-full p-2 rounded-md mt-3"
              >
                <option value="select unit">Marks</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
          <div className="w-full md:flex items-center justify-between md:px-10 px-3 mt-8">
            <div className="md:w-[30%] md:flex md:flex-col">
              <label className="text-md w-[full] text-white" htmlFor="examtype">
                Exam type
              </label>
              <select
                placeholder="Select Exam Type"
                id="examtype"
                name="examType"
                value={data.examType}
                onChange={onChnageHandler}
                className="outline-none py-2 rounded-md mt-3 w-full text-black"
              >
                <option value="Select ExamType">Exam Type</option>
                <option value="PYQ">PYQ</option>
                <option value="MidSem">MidSem</option>
              </select>
            </div>
            <div className="md:w-[30%] md:flex md:flex-col">
              <label className="text-md w-[full] text-white" htmlFor="year">
                Exam Year
              </label>
              <input
                placeholder="Enter Exam Year"
                type="text"
                id="year"
                name="examYear"
                value={data.examYear}
                onChange={onChnageHandler}
                className="outline-none p-2 rounded-md mt-3 w-full"
              />
            </div>
            <div className="md:w-[30%] md:flex md:flex-col">
              <label
                className="w-[full] text-md text-white"
                htmlFor="midsemnumber"
              >
                MidSem Number
              </label>
              <select
                placeholder="Enter MidSem Number"
                type="text"
                name="midSemNumber"
                value={data.midSemNumber}
                onChange={onChnageHandler}
                id="midsemnumber"
                className="outline-none p-2 rounded-md mt-3 w-full"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
          <div className="w-full flex flex-col md:px-10 px-3 mt-8">
            <div className="w-full">
              <label className="w-[full] text-md text-white" htmlFor="topic">
                Topic
              </label>
              <input
                placeholder="Enter Topic"
                type="text"
                id="topic"
                name="topic"
                value={data.topic}
                onChange={onChnageHandler}
                className="outline-none p-2 rounded-md mt-3 w-full text-black"
              />
            </div>
            <div className="w-full mt-5 flex items-center gap-10">
            <div className="w-[50%]">
              <label className="w-[full] text-md text-white" htmlFor="subjectCode">
                Branch
              </label>
              <select
                placeholder="Enter Subject"
                type="text"
                id="branch"
                name="branch"
                value={data.branch}
                onChange={onChnageHandler}
                className="outline-none p-2 rounded-md mt-3 w-full text-black"
              >
                <option value="ECE">ECE</option>
                <option value="EX">EX</option>
                <option value="CSE">CSE</option>
                <option value="AU">AU</option>
                <option value="IT">IT</option>
                <option value="PCT">PCT</option>
                <option value="ME">ME</option>
              </select>
            </div>
            <div className="w-[50%]">
              <label className="w-[full] text-md text-white" htmlFor="subjectCode">
                Subject Code
              </label>
              <select
                placeholder="Enter Subject"
                type="text"
                id="subjectCode"
                name="subjectCode"
                value={data.subjectCode}
                onChange={onChnageHandler}
                className="outline-none p-2 rounded-md mt-3 w-full text-black"
              >
                <option value="Enter Subject Code">Enter Subject Code</option>
                <option value="EC-304">EC-304</option>
                <option value="EC-302">EC-302</option>
                <option value="BT-119">BT-119</option>
                <option value="BT-103">BT-103</option>
                <option value="BT-201">BT-201</option>
                <option value="BT-201">BT-201</option>
                <option value="BT-201">BT-201</option>

              </select>
            </div>
            <div className="w-[50%]">
              <label className="w-[full] text-md text-white" htmlFor="collegeYear">
                College Year
              </label>
              <select
                placeholder="Enter College Year"
                type="text"
                id="collegeYear"
                name="collegeYear"
                value={data.collegeYear}
                onChange={onChnageHandler}
                className="outline-none p-2 rounded-md mt-3 w-full text-black"
              >
                <option value="Enter Subject Code">Enter College Year</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            </div>
            <div className="w-full mt-5">
              <label className="w-[full] text-md text-white" htmlFor="image">
                Image
              </label>
              <input
                placeholder="Select Image"
                type="file"
                id="topic"
                onChange={(event) => setQuestionImage(event.target.files[0])}
                name="questionImage"
                className="outline-none bg-zinc-100 p-2 rounded-md mt-3 w-full text-black"
              />
            </div>
          </div>
          <div className="w-full flex justify-end md:px-10 px-3 mt-8">
            <button className="px-4 py-2 bg-zinc-700 rounded-md text-white">
              Save Question
            </button>
          </div>
        </form>
        </div>
      )}
    </>
  );
};

export default EditPyq;
