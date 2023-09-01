import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchDataFromApi } from "../../utils/api";

import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Spinner from "../../components/spinner/Spinner";
import MovieCard from "../../components/movieCard/MovieCard";

import noResult from "../../assets/no-results.png";
import "./SearchResult.scss"

function SearchResult() {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);
  const [loading, setLoading] = useState(false);
  const { query } = useParams();

  const fetchInitialData = () => {
    setLoading(true);
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        setData(res);
        setPageNum((prev) => prev + 1);
        setLoading(false);
      }
    );
  };

  console.log(data);

  const fetchNextPageData = () => {
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {
          setData({
            ...data,
            results: [...data?.results, ...res?.results],
          });
        } else {
          setData(res);
        }
        setPageNum((prev) => prev + 1);
      }
    );
  };

  useEffect(() => {
    setPageNum(1);
    fetchInitialData();
  }, [query]);

  return (
    <div className="search_container">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results.length > 0 ?

            <>
            <div className="search_title">
              {`search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
            </div>
            <InfiniteScroll
              className="content"
              dataLength={data?.results?.length || []}
              next={fetchNextPageData}
              hasMore={pageNum <= data?.total_results}
              loader ={<Spinner/>}
              style={{display:"flex", flexWrap:"wrap", gap:"25px", paddingTop:"20px"}}
            >
              {data?.results.map((item, index)=>{
                if(item.media_type === "person") return;
                return(
                    <MovieCard key={index} item={item} endpoint={item?.media_type} />
                )

              })

              }
            </InfiniteScroll>
          </>:<div className="searchNotFound"><div className="img_center"><img src={noResult} alt="" /></div></div>
          }
        </ContentWrapper>
      )}
    </div>
  );
}

export default SearchResult;
