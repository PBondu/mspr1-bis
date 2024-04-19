"use client"

import { useState, useEffect } from "react"

export default function DropDown({ children, button, classe }) {

  const [isToggle, setIsToggle] = useState("+");
  const [isVisible, setIsVisible] = useState("none");

  function handleClickToggle() {
    isVisible === "none" ? setIsVisible("flex"): setIsVisible("none")
  };
  
  useEffect(() => {
    isVisible === "flex" ? setIsToggle("-") : setIsToggle("+");
    return () => {
      setIsToggle("+");
    }
  }, [handleClickToggle])
  

  return (
    
    <div className={classe}>
      <button className=" bg-slate-700 w-fit h-fit p-2 text-xl text-white rounded-xl" onClick={handleClickToggle}>{button} {isToggle}</button>
      <div style={{display:isVisible}}>
        {children}
      </div>
    </div>

  );
};