import React from "react";
import Carousel from "../../../components/carousel/Carousel";
import useFetch from "../../../hooks/useFetch";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./Recommendation.scss";

const Recommendation = ({ id, mediaType }) => {
  const { data } = useFetch(`/${mediaType}/${id}/recommendations`);

  return (
    <ContentWrapper>
      {data?.results &&
        <div>
          <Carousel
            data={data?.results}
            endpoint={mediaType}
            title={"Recommendations"}
          />
        </div> ||  <div>video not available</div>
       }
    </ContentWrapper>
  );
};

export default Recommendation;
