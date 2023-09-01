import React, { useRef } from "react";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import { useSelector } from "react-redux";
import avatar from "../../../assets/avatar.png";
import "./Cast.scss";

import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
  } from "react-icons/bs";

const Cast = ({ cast }) => {
  const { url } = useSelector((state) => state.home);
  const slideContainer = useRef()

  const castSliderContainer = (direction) =>{
    const refContainer = slideContainer.current;
    const scrollAmount = direction === "left" 
    ? refContainer.scrollLeft - (refContainer.offsetWidth + 10):
    refContainer.scrollLeft + (refContainer.offsetWidth + 10);

    refContainer.scrollTo({
        left:scrollAmount,
        behavior:"smooth"
    })
  }

  return (
    <ContentWrapper>
        <div className="slider">
            <div className="heading">Top Cast</div>
                <div className="left_btn navigate" onClick={()=>{castSliderContainer("left")}}><BsFillArrowLeftCircleFill/></div>
                <div className="right_btn navigate" onClick={()=>{castSliderContainer("right")}}><BsFillArrowRightCircleFill/></div>
            <div className="cast_container" ref={slideContainer}>
                {cast?.slice(0, 20)?.map((item) => {
                const imgUrl = item?.profile_path ? url.profile + item?.profile_path : avatar;
                return (
                    <div className="main_container">
                    <div className="cast_img">
                        <img src={imgUrl} alt="" />
                    </div>
                    <div className="details">
                        <div className="name">{item?.name}</div>
                        <div className="role">{item?.character}</div>
                    </div>
                    </div>
                );
                })}
            </div>
      </div>
    </ContentWrapper>
  );
};

export default Cast;
