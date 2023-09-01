import React, { useState } from "react";
// import "../trending/Trending.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

function  TopRated() {
  const [endpoint, setEndpoint] = useState("movie");
  const { data, isLoading } = useFetch(`/${endpoint}/top_rated`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Movies" ? "movie" : "tv");
  };
  return (
    <div className="carousel_section">
      <ContentWrapper>
        <h1 className="carousel_title">Top Rated</h1>
        <SwitchTab data={["Movies", "Tv"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} isLoading={isLoading} endpoint={endpoint}/>
    </div>
  );
}

export default TopRated;
