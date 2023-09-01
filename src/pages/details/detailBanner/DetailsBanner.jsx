
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../hooks/useFetch";
// import Genres from "../../../components/genres/Genres";
import CircleRating from "../../../components/circleRating/CircleRating";
// import Img from "../../../components/lazyLoadImage/Img.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import {AiOutlinePlayCircle} from "react-icons/ai"
import VideoPopup from "../../../components/videoPopup/VideoPopup";
const DetailsBanner = ({ video, crew }) => {

    const [showPopup, setShowPopup] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const {id, mediaType} =  useParams()
    const {data, isLoading} = useFetch(`/${mediaType}/${id}`)

    const {url} = useSelector((state)=> state.home)

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };
    
    let ratingVotes = data?.vote_average
    console.log(ratingVotes)

    const genresId = data?.genres?.map((gen)=>{
        return(
            <div className="genres">{gen?.name}</div>
        )
    })

    const director = crew?.filter((dir)=>dir.job === "Director" || dir.job === "Producer");

    const writer = crew?.filter((wrt)=>wrt.job === "Screenplay" || wrt.job === "Story" || wrt.job === "Writer")

    return (
        <div className="details_Banner">
            {!isLoading ? (
                <>
                    {!!data && <React.Fragment>
                        <div className="backdrop_img">
                            <img src={url.backdrop + data.backdrop_path} alt="" />
                        </div>
                        <div className="opacity_layer"></div>
                        <ContentWrapper>
                            <div className="contents">
                                <div className="left">
                                    {data.poster_path ? (
                                        <img src={url.backdrop + data.poster_path} alt="" />
                                    ) : (
                                        <img src={PosterFallback}/>
                                    )} 
                                </div>
                                <div className="right">
                                    <div className="right_section">
                                        {!!data.title ?<div className="poster_title">{data.title} ({dayjs().format("YYYY")})</div>:<div className="poster_title">{"Error: Title has not mentioned"}</div>}
                                        <i className="subtitle">{data.tagline}</i>
                                        <div className="genreses">
                                            {/* GENRES CATEGORIES */}
                                            {genresId}
                                        </div>
                                        <div className="rating_box">
                                            <div className="rating">
                                                <div className="circle" style={{color:`${ratingVotes <= 5 ? "red":`${ratingVotes<=8 && ratingVotes>5?"orange":"green"}`}`, backgroundColor:`${ratingVotes <= 5 ? "red":`${ratingVotes<=8 && ratingVotes>5?"orange":"green"}`}`}}>
                                                    <div className="inner_circle">
                                                        {(ratingVotes).toFixed(1)}
                                                    </div>
                                                </div>
                                            </div>
                                             <div className="playbtn_container" onClick={()=>{setShowPopup(true); setVideoId(video?.key)}}>
                                                <div className="play_container">
                                                    <AiOutlinePlayCircle className="playbtn" size={95}/>
                                                </div>
                                                <div className="text">Watch Trailer</div>

                                             </div>
                                        </div>
                                        <div className="overview">
                                            <div className="public_view">
                                                 Overview
                                            </div>
                                            <div className="description">
                                                {data.overview}
                                            </div>
                                        </div>
                                         <div className="status_details">
                                            {data.status && <div className="status">
                                                <div className="status_title">
                                                    Status    
                                                </div>    
                                                <div className="status_response">
                                                {data.status}    
                                                </div>    
                                            </div>}
                                            {data.release_date && <div className="status">
                                                <div className="status_title">
                                                    Release Date
                                                </div>    
                                                <div className="status_response">    
                                                    <div className="">{dayjs(data.release_date).format("MMM DD YYYY")}</div>
                                                </div>    
                                            </div>}
                                            {data.runtime && <div className="status">
                                                <div className="status_title">
                                                   Runtime
                                                </div>    
                                                <div className="status_response">
                                                    <div className="">{ toHoursAndMinutes(data.runtime)}</div>   
                                                </div>    
                                            </div>}
                                         </div>
                                         <div className="under_line"></div>
                                    </div>
                                    {director?.length > 0 && <div className="credit_info">
                                        <span className="dir_title">
                                            Director :{" "}
                                        </span>
                                         <span>
                                            {director?.map((d, i)=>{
                                                return(
                                                    <span  className="dir_name" key={i}>
                                                        {d?.name}
                                                        { director.length - 1 !== i && ", "}
                                                    </span>
                                                )
                                            }) }
                                         </span>
                                    </div>}
                                    <div className="under_line"></div>
                                    {!!writer?.length > 0 && <div className="credit_info">
                                        <span className="dir_title">
                                            Writer :{" "}
                                        </span>                                     
                                         <span>
                                            {writer?.map((w, i)=>{
                                                return(
                                                    <>
                                                        {w?.name.length > 0 ? <span  className="dir_name" key={i}>
                                                            {w?.name}
                                                            { writer.length - 1 !== i && ", "}
                                                        </span> : <div className="dir_name" style={{fontSize:"16px", color:"white"}}>Not available</div> }
                                                    </>
                                                )
                                            }) }
                                         </span> 
                                    </div>}
                                    <div className="under_line"></div>
                                    {data?.created_by?.length > 0 && <div className="credit_info">
                                        <span className="dir_title">
                                            Creator :{" "}
                                        </span>                                       
                                         <span>
                                            {data?.created_by?.map((w, i)=>{
                                                return(
                                                    <span  className="dir_name" key={i}>
                                                        {w?.name}
                                                        { data.created_by?.length - 1 !== i && ", "}
                                                    </span>
                                                )
                                            }) }
                                         </span>
                                    </div>}
                                </div>
                            </div>
                            <VideoPopup showPopup={showPopup} setShowPopup={setShowPopup} videoId={videoId} setVideoId={setVideoId} />
                        </ContentWrapper>
                        
                    </React.Fragment>} 
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )} 
        </div>
    );
};

export default DetailsBanner;
