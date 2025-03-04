import React from "react";

const Loader = () => {
  return (
    <>
      <div className="verify top-0 left-0 absolute z-40 bg-zinc-500 opacity-35 h-screen w-full grid">
        <div className="spinner animate-spin w-[100px] h-[100px] place-self-center border-[5px] border-t-zinc-900 rounded-full "></div>
      </div>
    </>
  );
};

export default Loader;
