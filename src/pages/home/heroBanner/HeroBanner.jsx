import React, { useEffect, useState} from "react";
import "./HeroBanner.scss";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useSelector } from "react-redux";

import LazyImageWrapper from "../../../components/lazyImageWrapper/LazyImageWrapper";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

function HeroBanner() {
  const { url } = useSelector((state) => state.home);
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");
  
  const navigate = useNavigate();
  const location = useLocation()
  
  const { data, isLoading } = useFetch("/movie/upcoming");
  // HERO BANNER RANDOM IMAGE SECTION AND LOGIC
  useEffect(() => {
    const bg = url.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data]);

  console.log(background)

  useEffect(()=>{
    window.scrollTo(0, 0)
  },[location])

  const observer = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
        else{
            entry.target.classList.remove("show")
        }
    })
})

const hiddenElement = document.querySelectorAll(".hero_banner");
hiddenElement.forEach((e)=>observer.observe(e));

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
      <div className="hero_banner hidden" >
        {!isLoading && (
          <div className="backdrop_img">
            <LazyImageWrapper src={background} />
          </div>
        )}
        {/* BLANK LAYER */}
        <div className="opacity_layer"></div>
        <ContentWrapper>
          <div className="hero_banner_content">
            <div className="title">Welcome</div>
            <div className="sub_title">
              Millions of movies, TV shows and people to discovered Explore now
            </div>
            <div className="search_input">
              <input
                type="text"
                onKeyUp={searchQueryHandler}
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                placeholder="Search for a movie or tv show..."
              />
              <button>Search</button>
            </div>
          </div>
        </ContentWrapper>
      </div>
  );
}

export default HeroBanner;
