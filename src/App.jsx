import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {BrowserRouter, Route, Routes} from "react-router-dom"

import { fetchDataFromApi } from "./utils/api";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Home from "./pages/home/Home";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header"
import Details from './pages/details/Details'
import SearchResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from "./pages/pageNotFound/PageNotFound";


function App() {
  const dispatch = useDispatch();
  const {url} = useSelector((state) => state.home);

  useEffect(() => {
    fetchDataConfig();
    genresCall()
  }, []);

  const fetchDataConfig = () => {
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);
      const url = {
        backdrop : res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original"
      }
      dispatch(getApiConfiguration(url));
    });
  };

  // GET GENRES ID
  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};

    endPoints.forEach((url)=>{
      promises.push(fetchDataFromApi(`/genre/${url}/list`))
    })

    const data = await Promise.all(promises);
    data?.map(({genres})=>{
      return genres.map((item)=>(allGenres[item.id] = item))
    })

    dispatch(getGenres(allGenres));
  }

  return (
    <>
      <BrowserRouter>
      <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/:mediaType/:id" element={<Details/>} />
          <Route exact path="/search/:query" element={<SearchResult/>} />
          <Route exact path="/explore/:mediaType" element={<Explore/>} />
          <Route exact path="*" element={<PageNotFound/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
