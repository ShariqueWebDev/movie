import React from "react";
import "./VideoPopup.scss";
import ReactPlayer from "react-player";

const VideoPopup = ({showPopup, setShowPopup, videoId, setVideoId}) => {
  return (
    <>
      {showPopup && <div className="video_popup" >
        <div className="opacity_layer" onClick={()=>{setShowPopup(false); setVideoId(null)}}></div>
        <div className="video_container">
          <div className="btn" onClick={()=>{setShowPopup(false); setVideoId(null)}}>Close</div>
          <div className="">
           {videoId !== null && <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoId}`}
              controls
            /> || <div className="msg" style={{color:"white"}}>Video not found</div> }
          </div>
        </div>
      </div>}
    </>
  );
};

export default VideoPopup;
