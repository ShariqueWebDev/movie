import React, { useEffect, useState } from "react";
import "./Header.scss";
import { useNavigate } from "react-router-dom";

import MobileMenu from "../mobileMenu/MobileMenu";
import SearchMenu from "./searchMenu/SearchMenu";

import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";

function Header() {
  const [show, setShow] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const [reset, setReset] = useState('')

  const navigate = useNavigate()

  const scrollHandler = () =>{
    if (window.scrollY > 400 && window.scrollY > lastScroll){
      setShow(true)
      setReset("0 -70px")
    }
    else{
      setShow(false)
      setReset("")
    }
    setLastScroll(window.scrollY)
  }

  useEffect(()=>{
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [window.scrollY])

  const navigationHandler = (type) =>{
    navigate(`/explore/${type}`);
    setMobileMenu(false);
  }

  return (
    <div>
      <header className={`${show ? "top" : ""}`} >
        <div className="header_content">
          <div className="logo" onClick={()=>{navigate("/"); setMobileMenu(false); setShowSearchBar(false)}}>MovieFlex</div>
          <div className="menu_items">
            <ul>
              <li className="menu_item" onClick={()=>{navigationHandler("movie")}} >Movies</li>
              <li className="menu_item" onClick={()=>{navigationHandler("tv")}} >Tv show</li>
            </ul>
            <div className="search_icon">
              <HiOutlineSearch
                onClick={() => {
                  setShowSearchBar(!showSearchBar);
                }}
              />
            </div>
          </div>
          {/* Mobile Hamburger Menu and Search Icon Start */}
          <div className="mobile_list_menu">
            <div className="list">
              <div className="search_icon">
                <HiOutlineSearch
                  onClick={() => {
                    setShowSearchBar(!showSearchBar);
                    setMobileMenu(false);
                  }}
                />
              </div>
              <div className="hamburger_line">
                <SlMenu
                  onClick={() => {
                    setMobileMenu(true);
                    setShowSearchBar(false);
                  }}
                />
              </div>
            </div>
          </div>
          {/* Mobile Hamburger Menu and Search Icon End */}
        </div>
      </header>
      <div>{mobileMenu && <MobileMenu reset={reset} setMobileMenu={setMobileMenu} navigationHandler={navigationHandler} />}</div>
      {showSearchBar && <SearchMenu reset={reset} setShowSearchBar={setShowSearchBar} />}
    </div>
  );
}

export default Header;
