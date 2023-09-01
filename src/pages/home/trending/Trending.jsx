import React, { useState } from "react";
import "./Trending.scss";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTab from "../../../components/switchTab/SwitchTab";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";

function Trending() {
  const [endpoint, setEndpoint] = useState("day");
  const { data, isLoading } = useFetch(`/trending/movie/${endpoint}`);

  const onTabChange = (tab) => {
    setEndpoint(tab === "Day" ? "day" : "week");
  };
  return (
    <div className="carousel_section">
      <ContentWrapper>
        <h1 className="carousel_title">Trending</h1>
        <SwitchTab data={["Day", "Week"]} onTabChange={onTabChange} />
      </ContentWrapper>
      <Carousel data={data?.results} isLoading={isLoading} endpoint={endpoint} />
    </div>
  );
}

export default Trending;
