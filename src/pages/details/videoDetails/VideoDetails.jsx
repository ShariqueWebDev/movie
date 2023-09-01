import React, { useRef, useState } from "react";
import "./VideoDetails.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import VideoPopup from '../../../components/videoPopup/VideoPopup'

import {AiOutlinePlayCircle} from "react-icons/ai"
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
  } from "react-icons/bs";


const VideoDetails = ({data}) => {

    const videoContainer = useRef();
    
    const [showPopup, setShowPopup] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const scrollContainer = (direction) =>{
        const referenceContainer = videoContainer.current;
        const scrollAmount = direction === "left" 
            ? referenceContainer.scrollLeft - referenceContainer.offsetWidth + 10
            : referenceContainer.scrollLeft + referenceContainer.offsetWidth + 10;

            referenceContainer.scrollTo({
                left:scrollAmount,
                behavior:"smooth",
            })
    }

  return (
    <ContentWrapper>
      <div className="video_container">
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" size={30} onClick={()=>{scrollContainer("left")}}/>
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" size={30} onClick={()=>{scrollContainer("right")}}/>

        <div className="video_content">
          <div className="heading">Official Videos</div>
          <div className="videos" ref={videoContainer}>
             {data?.results?.map((video)=>{
              return(
                <div className="video" onClick={()=>{setShowPopup(true); setVideoId(video?.key)}}>
                    <img src={`https://img.youtube.com/vi/${video?.key}/mqdefault.jpg`} alt="" />
                    <div className="play_btn">
                        <AiOutlinePlayCircle size={50}/>
                    </div>
                </div>

              )
             })

             }
           
          </div>
        </div>
      </div>
      <VideoPopup showPopup={showPopup} setShowPopup={setShowPopup} videoId={videoId} setVideoId={setVideoId}/>
    </ContentWrapper>
  );
};

export default VideoDetails;
