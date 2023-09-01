import React from 'react'
import useFetch from "../../hooks/useFetch"

import "./Details.scss"
import { useParams } from 'react-router-dom'
import DetailsBanner from './detailBanner/DetailsBanner'
import Cast from './cast/Cast'
import VideoDetails from './videoDetails/VideoDetails'
import Similar from './carousels/Similar'
import Recommendation from './carousels/Recommendation'

function Details() {
  const {id, mediaType} =  useParams()
  const {data} = useFetch(`/${mediaType}/${id}/videos`)
  const {data: credits} = useFetch(`/${mediaType}/${id}/credits`)

  return (

    <div >
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast cast={credits?.cast} />
      <VideoDetails data={data} />
      <Similar id={id} mediaType={mediaType} />
      <Recommendation id={id} mediaType={mediaType} />
    </div>
  )
}

export default Details
