import React from "react";
import useFetch from "../../../hooks/useFetch";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Similar = ({ id, mediaType }) => {
  const { data } = useFetch(`/${mediaType}/${id}/similar`);
  const title = mediaType === "tv" ? "Similar Tv Shows" : "Similar Movies";

  return (
    <ContentWrapper>
      <div >
        <Carousel title={title} endpoint={mediaType} data={data?.results} />
      </div>
    </ContentWrapper>
  );
};

export default Similar;
