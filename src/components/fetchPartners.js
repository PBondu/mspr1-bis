"use client"

import React, { createContext, useEffect, useState } from 'react';

// Permet le transfert des données aux autres composants
const DataPartnersWp = createContext();

const FetchPartners = ({ children }) => {
  const [partnersData, setPartnersData] = useState([]);
  useEffect(() => {
    async function loadpartnersData() {
      const response = await fetch('https://jayjayyaya.000webhostapp.com/wp-json/wp/v2/partners?per_page=10');
      if (!response.ok) {
        console.log("response not ok");
        return;
      }
      const partnersData = await response.json();
      setPartnersData(partnersData);
    }
    loadpartnersData();
  }, []);


  return (
    <DataPartnersWp.Provider value={partnersData}>
      {children}
    </DataPartnersWp.Provider>
  );
};
export { DataPartnersWp, FetchPartners };