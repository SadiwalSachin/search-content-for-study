import React from "react";
import {Link} from "react-router-dom"
const YoutubeVideo = ({ item, index }) => {

    let ytLink = ""

    if(item.id.kind === "youtube#playlist"){
        ytLink = `https://www.youtube.com/playlist?list=${item.id.playlistId}`
    }
    if(item.id.kind === "youtube#video"){
        ytLink = `https://www.youtube.com/watch?v=${item.id.videoId}`
    }

  return (
    <>
      <Link
      to={ytLink}
        key={index}
        className=" md:w-[25vw] sm:w-[40vh] w-full pb-4 bg-[#F4F4F5] border-zinc-400 cursor-pointer border-2 rounded-2xl flex flex-col overflow-hidden"
      >
        <div className="w-full relative h-[150px] sm:h-[180px] md:h-[200px] ">
          <img
            className="h-full w-full object-cover object-center"
            src={item.snippet.thumbnails.high.url}
            alt=""
          />
        </div>
        <h2 className="ml-2 mt-2 text-xs">{item.snippet.title}</h2>
        <h3 className="ml-2 text-xs">{item.snippet.channelTitle}</h3>
      </Link>
    </>
  );
};

export default YoutubeVideo;
