import React, { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";


const Loader = () => {

  useEffect(()=>{
    document.body.style.overflow = 'hidden'

    return ()=>{
    document.body.style.overflow = ''
    }
  },[])

  return (
    <div className="h-screen w-full fixed flex items-center justify-center z-[100] w-screen opacity-30 bg-gray-100">
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
