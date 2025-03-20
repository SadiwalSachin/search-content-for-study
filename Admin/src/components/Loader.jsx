import React , {useEffect} from "react";
import { TailSpin } from "react-loader-spinner";

const Loader = () => {

  useEffect(()=>{
    document.body.style.overflow = 'hidden'

    return ()=>{
    document.body.style.overflow = ''
    }
  },[])


  return (
    <>
<div className="h-screen top-0 left-0 w-screen fixed flex items-center justify-center z-[100] opacity-30 bg-gray-100">
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
    </>
  );
};

export default Loader;
