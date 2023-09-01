import React from "react";
import "./MobileMenu.scss"
import {VscChromeClose} from 'react-icons/vsc'

function MobileMenu({setMobileMenu, navigationHandler, reset}) {
  return (
    <div className="mobile_menu_container" style={{translate:reset}}>
      <div className="menu_items">
        <ul>
          <li className="menu_item" onClick={()=>{navigationHandler("movie")}}>Movies</li>
          <li className="menu_item" onClick={()=>{navigationHandler("tv")}} >Tv show</li>
        </ul>
        <div className="close">
            <VscChromeClose onClick={()=>{setMobileMenu(false)}}  />
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
