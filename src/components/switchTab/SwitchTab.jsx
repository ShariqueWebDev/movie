import React, { useState } from 'react'
import "./SwitchTab.scss"

function SwitchTab({data, onTabChange}) {

  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0)

  const activeTab = (tab, index) =>{
     setLeft(index * 60);
     setTimeout(() => {
      setSelectedTab(index)
     }, 300);
     onTabChange(tab, index)
  }
  return (
    <div className='switchingTabs'>
        <div className="tabItems">
          {data.map((tab, index)=>{
            return (
            <span key={index} className={`tabItem ${selectedTab === index ? "active" : ""}`} onClick={()=>{activeTab(tab, index)}}>{tab}</span>
            )
          })}
          <div className={`movingBg`} style={{left}}></div>
        </div>
    </div>
  )
}

export default SwitchTab
