import React from "react";
import "./contentWrapper.scss"

function ContentWrapper({ children }) {
  return <div className="content_wrapper">{children}</div>;
}

export default ContentWrapper;
