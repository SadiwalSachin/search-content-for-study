import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";


const Loader = () => {
  return (
    <div className="h-[100vh] absolute flex items-center justify-center z-[100] w-full opacity-20 bg-gray-100">
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="black"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
