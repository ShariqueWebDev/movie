import React, { useRef } from "react";
import "./Carousel.scss";
import CircleRating from "../circleRating/CircleRating";

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import PosterFallBack from "../../assets/no-poster.png";

function Carousel({ data, isLoading, endpoint, title }) {

  const { url, genres } = useSelector((state) => state.home);
  const navigate = useNavigate();
  console.log(data)

  const carouselContainer = useRef();

  const navigationCarousel = (direction) => {
    const scrollContainer = carouselContainer.current;
    const scrollAmount = direction === "left" ?
    scrollContainer.scrollLeft - (scrollContainer.offsetWidth + 15) : 
    scrollContainer.scrollLeft + (scrollContainer.offsetWidth + 15);

    scrollContainer.scrollTo({
      left: scrollAmount,
      behavior:  "smooth",
    });
  };

  
  let initial = true

  return (
    <div className="carousel">
        <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>{navigationCarousel("left")}}/>
        <BsFillArrowRightCircleFill className="carouselRightNav arrow" onClick={()=>{navigationCarousel("right")}}/>
     {/* {data ? <Spinner initial={false}/>} */}
        {title && <div className="carousel_title">{title}</div>}
       {data ? <div className="carouselItems" ref={carouselContainer}>
          {data?.map((item)=>{
            const posterUrl = item?.poster_path ? url.poster + item?.poster_path : PosterFallBack
            return(
                <div className="carouselItem" key={item?.id} onClick={()=>{navigate(`/${item?.media_type || endpoint}/${item?.id}`)}}>
                  <div className="posterBlock">
                    <img src={posterUrl} />
                     <CircleRating rating={item.vote_average.toFixed(1)}/>
                    <div className="miniDiv categoryTitle ">{item?.media_type}</div> 
                    {item?.genre_ids?.map((g)=>{
                      if(!genres[g]?.name) return;
                      return(
                        <div key={g} className="miniDiv genersTitle">{genres[g]?.name}</div>
                      )
                    })}
                  </div>
                  <div className="title"> {item?.title || item?.name} </div>
                  <div className="date">{dayjs(item?.release_date).format("MMM D, YYYY")}</div>
                 </div>
                )
            })
          }
          </div> :(<div className="error" style={{padding:"10px", textAlign:"center", fontSize:"20px"}}>Server Not Responded</div>)}
    </div>
  );
}

export default Carousel;
