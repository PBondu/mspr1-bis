"use client"

import logo from "../images/logo.png"
import burger from "../images/HamburgerMenu.svg"
import { useState, useEffect } from "react";

export default function Header() {

  const [isVisible, setIsVisible] = useState("none");

  function handleClickToggle() {
    isVisible === "none" ? setIsVisible("flex") : setIsVisible("none")
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (isVisible === "flex" && !event.target.closest(".burger")) {
        setIsVisible("none");
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <header className="flexRow spaceAround alignCenter bg-blue-500 top-0 pr-3">
      <div className="flexRow centerAll w-full">
        <img
          src={logo}
          width={96}
          height={64}
          alt="Logo du festival Zikos"
        />
      </div>

      <div>
        <img
        className="burger bg-slate-700 absolute right-5 top-6 w-12 h-12 p-2 text-m cursor-pointer rounded-xl" onClick={handleClickToggle}
          src={burger}
          width={30}
          height={30}
          alt="Menu Hamburger"
        />
      </div>

      <div style={{ display: isVisible }} className="burger flex-col w-fit h-52 top-20 right-5 py-2 px-5 absolute justify-around items-end rounded-lg select-none text-white text-lg bg-slate-700">
        <a onClick={handleClickToggle} href="#prog">PROGRAMMATION</a>
        <a onClick={handleClickToggle} href="#billet">BILLETTERIE</a>
        <a onClick={handleClickToggle} href="#info">INFORMATIONS</a>
        <a onClick={handleClickToggle} href="#follow">NOUS SUIVRE</a>
        <a onClick={handleClickToggle} href="#map">CARTE INTERACTIVE</a>
      </div>
    </header>
  );
}