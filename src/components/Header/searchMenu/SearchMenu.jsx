import React, { useState } from "react";
import "./SearchMenu.scss";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";

function SearchMenu({setShowSearchBar, reset}) {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
    
  const searchQueryHandler = (event) =>{
    if(event.key === "Enter" && query.length > 0){
      navigate(`/search/${query}`)
      setShowSearchBar(false)
    }
  }

  return (
    <div className="search_bar_content" style={{translate:reset}}>
      <div className="search_bar">
        <input type="text" placeholder="search Movie or Tv show" autoFocus onChange={(e)=>{setQuery(e.target.value)}} onKeyUp={searchQueryHandler} />
      <div className="close">
        <VscChromeClose onClick={()=>{setShowSearchBar(false)}}/>
      </div>
      </div>
    </div>
  );
}

export default SearchMenu;
