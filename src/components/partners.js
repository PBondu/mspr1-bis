"use client"

import { useContext } from 'react';
import { DataPartnersWp } from "./fetchPartners";

export default function Partners() {
  const partnersInfo = useContext(DataPartnersWp);
  return (
    <div className="flex flex-col justify-around items-center bg-white text-black text-xl h-96">
      <h3>Partenaires Insitutionnels</h3>
      <div className="flex flex-wrap justify-around w-3/4">
      {partnersInfo.map((partner, index) => (
        partner.acf.type === "Partenaires Insitutionnels" ?  (   
          <img key={index} width={80} height={80} src={partner.acf.logo} alt={partner.acf.name} />)
        : null
      ))}
      </div>
      <h3>Partenaires Officiels</h3>
      <div className="flex flex-wrap justify-around w-4/5 h-40">
      {partnersInfo.map((partner, index) => (
        partner.acf.type === "Partenaires Officiels" ?  (   
          <img className="object-contain" key={index} width={80} src={partner.acf.logo} alt={partner.acf.name} />)
        : null
      ))}
      </div>
    </div>
  )
}