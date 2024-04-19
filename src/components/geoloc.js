"use client"

import React from "react";
import { createContext } from "react";
import { useGeolocated } from "react-geolocated";

const DataGeoloc = createContext();

const Geoloc = ({ children }) => {
    const { coords } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });

      return (
        <DataGeoloc.Provider value={coords}>
          {children}
        </DataGeoloc.Provider>
      );
};

export { DataGeoloc, Geoloc };