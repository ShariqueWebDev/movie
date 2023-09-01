import React from "react";
import "./MovieCard.scss" ;
import {useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs"
import CircleRating from "../circleRating/CircleRating"
import PosterFallBack from "../../assets/no-poster.png"

const MovieCard = ({ item, endpoint, key }) => {
    const {url} = useSelector((state)=>state.home)
    const navigate  = useNavigate()

    const posterUrl = item?.poster_path ? url.poster + item.poster_path : PosterFallBack
    
  return (
      <div
        key={key}
        className="carouselItem"
        onClick={() => {
          navigate(`/${item?.media_type || endpoint}/${item?.id}`);
        }}
      >
        <div className="posterBlock">
          <img src={posterUrl} />
          <CircleRating rating={item.vote_average.toFixed(1)} />
          <div className="miniDiv categoryTitle ">{item?.media_type}</div>
        </div>
        <div className="title"> {item?.title || item?.name} </div>
        <div className="date">
          {dayjs(item?.release_date).format("MMM D, YYYY")}
        </div>
      </div>

  );
};

export default MovieCard;
