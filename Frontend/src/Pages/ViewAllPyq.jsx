import React, { useEffect, useState } from "react";
import axios from "axios";
import PyqCard from "../components/PyqCard";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../redux/Slices/pyqSlice";
import Loader from "../components/Loader";
import { IoClose } from "react-icons/io5";
import { url } from "../Constants/constants";

const ViewAllPyq = () => {
  const [loading, setLoading] = useState(false);

  const brnachCode = [
    {
      branch: "ECE",
      code: [
        "EC-211",
        "EC-302",
        "EC-303",
        "EC-212",
        "EC-305",
        "EC-308",
        "EC-304",
      ],
    },
    {
      branch: "ME",
      code: [
        "ME-301",
        "ME-302",
        "ME-303",
        "ME-304",
        "ME-305",
        "ME-306",
        "ME-308",
      ],
    },
    {
      branch: "IT",
      code: [
        "IT-301",
        "IT-302",
        "IT-303",
        "IT-304",
        "IT-305",
        "IT-309",
        "IT-310",
      ],
    },
  ];

  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const token = localStorage.getItem("token")

  const dispatch = useDispatch();
  const filters = useSelector((state) => state.pyq);

  // console.log("filter state ki value :", filters);

  const [allPyq, setAllPyq] = useState([]);
  const [filteredPyq, setFilteredPyq] = useState([]);

  const allPyqData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/pyq/get-pyqs`,
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        },
      );

      if (response) {
        console.log("all pyq fetched");
        console.log("response is there :", response);
        setAllPyq(response.data.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("some error occured while fetching all pyq");
      console.log(error);
    }
  };

  useEffect(() => {
    allPyqData();
  }, []);

  useEffect(() => {
    const filterPYQ = () => {
      let filtered = allPyq;

      if (filters.collegeYear) {
        filtered = filtered.filter(
          (pyq) => pyq.collegeYear === filters.collegeYear
        );
      }
      if (filters.collegeYear == 1) {
        dispatch(setFilter({ name: "branch", value: "" }));
        filtered = filtered.filter(
          (pyq) => pyq.collegeYear === filters.collegeYear
        );
      }
      if (filters.branch) {
        filtered = filtered.filter((pyq) => pyq.branch === filters.branch);
      }
      if (filters.subjectCode) {
        filtered = filtered.filter(
          (pyq) => pyq.subjectCode === filters.subjectCode
        );
      }
      if (filters.unit) {
        if (filters.unit == "All") {
        } else {
          filtered = filtered.filter((pyq) => pyq.unit == filters.unit);
        }
      }
      if (filters.examType) {
        filtered = filtered.filter((pyq) => pyq.examType === filters.examType);
      }
      if (filters.examYear) {
        filtered = filtered.filter((pyq) => pyq.examYear === filters.examYear);
      }
      if (filters.MidSem) {
        filtered = filtered.filter((pyq) => pyq.MidSem == filters.MidSem);
      }
      if (filters.marks) {
        if (filters.marks === "All") {
        } else {
          filtered = filtered.filter((pyq) => pyq.marks == filters.marks);
        }
      }

      setFilteredPyq(filtered);
    };

    filterPYQ();
  }, [filters, allPyq]);

  const handleFilterChange = (e) => {
    dispatch(setFilter({ name: e.target.name, value: e.target.value }));
  };

  return (
    <>
      {loading ? <h1>Loading</h1> : ""}
      <div className="w-full bg-[#FFFFFF]">
        <div className="py-4 md:px-[4.6vw] p-[5vh] px-[4vh] w-full md:h-[23vh] ">
          <div className="w-[99%] h-full hidden bg-[#FFFFFF] border-[#18181B] border-2 rounded-xl md:flex items-center md:justify-normal flex-wrap gap-x-5 gap-y-2 justify-center md:px-10 md:gap-3 py-3 md:py-0">
            <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
              <h2 className="md:font-semibold">College Year</h2>
              <select
                onChange={handleFilterChange}
                name="collegeYear"
                id="collegeYear"
                className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
            {filters.collegeYear != 1 ? (
              <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                <h2 className="md:font-semibold">Branch</h2>
                <select
                  onChange={handleFilterChange}
                  name="branch"
                  id="branch"
                  className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                >
                  <option value="ECE">ECE</option>
                  <option value="EX">EX</option>
                  <option value="IT">IT</option>
                  <option value="CSE">CSE</option>
                  <option value="ME">ME</option>
                  <option value="PCT">PCT</option>
                  <option value="AU">AU</option>
                </select>
              </div>
            ) : (
              ""
            )}
            {filters.collegeYear != 1 ? (
              <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                <h2 className="md:font-semibold">Subject Code</h2>
                <select
                  onChange={handleFilterChange}
                  name="subjectCode"
                  id="subject"
                  className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                >
                  {brnachCode.map((item) => {
                    console.log(item);
                    console.log("forEach chal raha hai");
                    if (filters.branch === item.branch) {
                      return item.code.map((item, index) => (
                        <option key={index} value={item}>
                          {item}
                        </option>
                      ));
                    }
                  })}
                </select>
              </div>
            ) : (
              <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                <h2 className="md:font-semibold">Subject Code</h2>
                <select
                  onChange={handleFilterChange}
                  name="subjectCode"
                  id="subjectCode"
                  className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                >
                  <option value="EC-302">EC-302</option>
                  <option value="BT-103">BT-103</option>
                  <option value="BT-119">BT-119</option>
                  <option value="BT-207">BT-207</option>
                  <option value="ME">ME</option>
                  <option value="PCT">PCT</option>
                  <option value="AU">AU</option>
                </select>
              </div>
            )}
            <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
              <h2 className="md:font-semibold">Select Unit</h2>
              <select
                onChange={handleFilterChange}
                name="unit"
                id="subject"
                className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
              >
                <option value="All">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
            <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
              <h2 className="font-semibold">Exam Type</h2>
              <select
                onChange={handleFilterChange}
                name="examType"
                className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
              >
                <option value="PYQ">PYQ</option>
                <option value="MidSem">MidSem</option>
              </select>
            </div>
            {filters.examType === "PYQ" ? (
              <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                <h2 className="font-semibold">Exam Year</h2>
                <select
                  onChange={handleFilterChange}
                  name="examYear"
                  id="year"
                  className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                >
                  <option value="unit">Select Year</option>
                  <option value="Nov-Dec-2022">Nov-Dec-2022</option>
                  <option value="May-2023">May-2023</option>
                  <option value="Jan-Feb-2023">Jan-Feb-2023</option>
                </select>
              </div>
            ) : (
              <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                <h2 className="font-semibold">Mid Sem</h2>
                <select
                  onChange={handleFilterChange}
                  name="MidSem"
                  className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                >
                  <option value="MidSem">MidSem</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
            )}

            <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
              <h2 className="font-semibold">Marks</h2>
              <select
                onChange={handleFilterChange}
                name="marks"
                id="marks"
                className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
              >
                <option value="All">All</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          {/* Mobile Filter */}
          <div className="flex flex-col md:hidden">
            <div className="flex justify-between">
              <h2
                onClick={() => setShowMobileFilter((prev) => !prev)}
                className="text-xl font-semibold md:hidden cursor-pointer"
              >
                Filter
              </h2>{" "}
              {showMobileFilter ? (
                <h2 className="text-xl cursor-pointer" onClick={() => setShowMobileFilter(false)}><IoClose/></h2>
              ) : (
                ""
              )}
            </div>
            {showMobileFilter ? (
              <div className="w-[99%] md:hidden mt-3 h-full bg-[#FFFFFF] border-[#18181B] border-2 rounded-xl items-center md:justify-normal flex flex-wrap gap-x-5 gap-y-2 justify-center md:px-10 md:gap-3 py-3 md:py-0">
                <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                  <h2 className="md:font-semibold">College Year</h2>
                  <select
                    onChange={handleFilterChange}
                    name="collegeYear"
                    id="collegeYear"
                    className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                {filters.collegeYear != 1 ? (
                  <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                    <h2 className="md:font-semibold">Branch</h2>
                    <select
                      onChange={handleFilterChange}
                      name="branch"
                      id="branch"
                      className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                    >
                      <option value="ECE">ECE</option>
                      <option value="EX">EX</option>
                      <option value="IT">IT</option>
                      <option value="CSE">CSE</option>
                      <option value="ME">ME</option>
                      <option value="PCT">PCT</option>
                      <option value="AU">AU</option>
                    </select>
                  </div>
                ) : (
                  ""
                )}
                {filters.collegeYear != 1 ? (
                  <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                    <h2 className="md:font-semibold">Subject Code</h2>
                    <select
                      onChange={handleFilterChange}
                      name="subjectCode"
                      id="subject"
                      className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                    >
                      {brnachCode.map((item) => {
                        console.log(item);
                        console.log("forEach chal raha hai");
                        if (filters.branch === item.branch) {
                          return item.code.map((item, index) => (
                            <option key={index} value={item}>
                              {item}
                            </option>
                          ));
                        }
                      })}
                    </select>
                  </div>
                ) : (
                  <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                    <h2 className="md:font-semibold">Subject Code</h2>
                    <select
                      onChange={handleFilterChange}
                      name="subjectCode"
                      id="subjectCode"
                      className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                    >
                      <option value="EC-302">EC-302</option>
                      <option value="BT-103">BT-103</option>
                      <option value="BT-119">BT-119</option>
                      <option value="BT-207">BT-207</option>
                      <option value="IT">IT</option>
                      <option value="CSE">CSE</option>
                      <option value="ME">ME</option>
                      <option value="PCT">PCT</option>
                      <option value="AU">AU</option>
                    </select>
                  </div>
                )}
                <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                  <h2 className="md:font-semibold">Select Unit</h2>
                  <select
                    onChange={handleFilterChange}
                    name="unit"
                    id="subject"
                    className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                  >
                    <option value="All">All</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                </div>
                <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                  <h2 className="font-semibold">Exam Type</h2>
                  <select
                    onChange={handleFilterChange}
                    name="examType"
                    className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                  >
                    <option value="PYQ">PYQ</option>
                    <option value="MidSem">MidSem</option>
                  </select>
                </div>
                {filters.examType === "PYQ" ? (
                  <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                    <h2 className="font-semibold">Exam Year</h2>
                    <select
                      onChange={handleFilterChange}
                      name="examYear"
                      id="year"
                      className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                    >
                      <option value="unit">Select Year</option>
                      <option value="Nov-Dec-2022">Nov-Dec-2022</option>
                      <option value="Jan-Feb-2023">Jan-Feb-2023</option>
                      <option value="May-2023">May-2023</option>
                      <option value="2022">2022</option>
                    </select>
                  </div>
                ) : (
                  <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                    <h2 className="font-semibold">Mid Sem</h2>
                    <select
                      onChange={handleFilterChange}
                      name="MidSem"
                      className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                    >
                      <option value="MidSem">MidSem</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </select>
                  </div>
                )}

                <div className="border-2 border-[#18181B] rounded-md md:px-4 md:py-2 px-1">
                  <h2 className="font-semibold">Marks</h2>
                  <select
                    onChange={handleFilterChange}
                    name="marks"
                    id="marks"
                    className="md:px-4 md:py-1 rounded-md outline-none md:mt-2"
                  >
                    <option value="All">All</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="10">10</option>
                  </select>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="py-6 md:px-[4.5vw] p-[5vh] px-[4vh] bg-[#FFFFFF] w-full flex-col flex gap-y-5 h-[80vh] no-scrollbar overflow-auto">
          {allPyq.map((item, index) => (
            <PyqCard data={item} key={index} index={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ViewAllPyq;
