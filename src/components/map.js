"use client"

import React, { useEffect, useState, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Tooltip, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { DataMapWp } from './fetchMapWp';
import { DataConcertWp } from './fetchConcertWp';
import MapFilterButton from './mapFilterButton';
import moment from 'moment';
import { DataGeoloc } from './geoloc';
import RoutingMachine from './routing';
import bluePing from "../images/location-dot-solid-bleu.svg";
import orangePing from "../images/location-dot-solid-orange.svg";
import yellowPing from "../images/location-dot-solid-jaune.svg";
import posPing from "../images/circle-dot-solid.svg";
import fullSreenIcon from "../images/expand-solid.svg"

export default function Map() {
  // Récupère les datas de wp
  const mapInfo = useContext(DataMapWp);
  const concertInfo = useContext(DataConcertWp);
  const geoloc = useContext(DataGeoloc);

  // UseState d'acitvation du composant d'itinéraire
  const [isActive, setIsActive] = useState(false);
  // Fonction d'activation de l'itinéraire
  const toggleComponent = () => {
    setIsActive(!isActive);
    setKey(prevKey => prevKey + 1); // Met à jour la clé pour forcer le reload
  };

  // Donne la height de la map
  const [classMap, setClassMap] = useState("h-72 z-10");
  // Ajoute une clef unique pour forcer react à reload le composant map
  const [key, setKey] = useState(0);

  // Coordonées pour tracer les limites du festival
  const polyline = [
    [48.83864333787564, 2.376534274111051],
    [48.84000619367437, 2.379150680292162],
    [48.83930711683455, 2.3800085183843227],
    [48.838961105496054, 2.3799656264796947],
    [48.8388339986898, 2.3802980387404116],
    [48.83907408905306, 2.3803623765973336],
    [48.83819845982036, 2.381681302664056],
    [48.835303125153395, 2.385232916573945],
    [48.83380595964049, 2.38248783467899],
    [48.8353384351207, 2.3806002334218506],
    [48.83547261276951, 2.3807396321118413],
    [48.836955604950674, 2.3788416653329008],
    [48.836955604950674, 2.3788416653329008],
    [48.83864333787564, 2.376534274111051]
  ]

  const [sortedMapData, setSortedMapData] = useState([]);
  // Met à jour le tableau qui sera à trier à partir de des données wp de base
  useEffect(() => {
    setSortedMapData([...mapInfo]);
  }, [mapInfo]);

  // Permet de filtrer en fonction du ping sélectionné
  // La donnée d'entrée étant l'équivalanet du nom du ping sélectionné dans la REST API
  function handleClickFilterByPing(ping) {
    const mapInfoToFilter = [...mapInfo];
    var mapInfoFiltered = [];
    mapInfoToFilter.filter(object => object.acf.type.includes(ping)).map(filteredSpot => (
      mapInfoFiltered.push(filteredSpot)
    ));
    setSortedMapData(mapInfoFiltered)
  };

  // find dans concert info pour trouver l'objet qui a la date puis trouver le spot de l'objet et faire un find dans le  tableau map et rehcercher par spot
  function handleClickFilterByPresentHour() {
    // Date actuelle
    // Format exemple : "2024-03-22"
    const actualTime = moment().format("YYYY[-]MM[-]DD");

    // Récupère les infos des concerts et de la map
    const concertInfoToFilter = [...concertInfo];
    
    var concertInfoFiltered = [];
    const mapInfoToFilter = [...mapInfo];
    var mapInfoFiltered = [];

    // Récupère l'objet à la date d'aujourd'hui
    concertInfoToFilter.filter(object => object.acf.horaires.includes(actualTime)).map(filteredDate => (
      concertInfoFiltered.push(filteredDate)
    ));

    // Récupère et met à jour la carte en fonction des pings sélectionnés par le nom de scène
    concertInfoFiltered.map((concert) => {
      mapInfoToFilter.filter(object => object.acf.name.includes(concert.acf.spot)).map(filteredDate => (
        mapInfoFiltered.push(filteredDate)
      ));
      setSortedMapData(mapInfoFiltered)
    });
    // Permet de n'afficher aucun ping si aucun ping ne correspond à la date actuelle
    return concertInfoFiltered.length === 0 ? setSortedMapData([]) : null
  };

  // fonction qui met la map en full screen en changeant la class name
  function fullScreenMap() {
    const newClassMap = classMap === "h-72 z-10" ? "h-screen z-10" : "h-72 z-10";
    setClassMap(newClassMap);
    setKey(prevKey => prevKey + 1); // Met à jour la clé pour forcer le reload
  };


  // Permet d'attendre que la geoloc soit opérationnelle avant de charger le point de localisation
  if (!geoloc) {
    return <div className="h-24 bg-[#febd02] text-[#e72a1c] flex justify-center items-center text-xl"><p>Carte en cours de chargement ...</p></div>
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-[#febd02] h-56">
        <h3 className="text-[#e72a1c] text-xl h-1/4 pt-2">Filtres de la carte</h3>
        <div className="flex flex-row flex-wrap justify-around items-center w-full h-32 ">
          <MapFilterButton onClick={() => { handleClickFilterByPing("Scène") }} name="Scène" ping= {bluePing} />
          <MapFilterButton onClick={() => { handleClickFilterByPing("Shop") }} name="Shop" ping= {orangePing} />
          <MapFilterButton onClick={() => { handleClickFilterByPing("Toilette") }} name="Toilette" ping= {yellowPing} />
          <MapFilterButton onClick={handleClickFilterByPresentHour} name="Concerts en cours" ping= {bluePing} />
        </div>
        <button className="flex flex-row justify-center bg-slate-700 w-fit h-10 px-3 mb-4 text-m text-white items-center rounded-xl" onClick={() => { setSortedMapData(mapInfo) }}>Effacer Filtres</button>
      </div>

      {/* Bouton activant l'itinéraire en activant le composant */}
      <div className="bg-[#febd02] py-2 pl-2 h-fit">
        <button className="flex flex-row justify-center bg-slate-700 w-fit h-10 px-3 text-m text-white items-center rounded-xl" onClick={toggleComponent}>
          {isActive ? "Désactiver L'itinéraire" : "Itinéraire vers le festival"}
        </button>
      </div>

      <div className="relative">
        {/* Bouton du full screen */}
        <a className="absolute top-0 right-0 z-50 bg-slate-700 p-2 w-fit h-fit mr-2 mt-2 rounded-xl" href="#leaflet-container" onClick={fullScreenMap}><img src={fullSreenIcon} width={20} height={20} alt="" /></a>
        
        {/* début de la map */}
        <MapContainer key={key} id='leaflet-container' className={classMap} center={[48.83658898990498, 2.38145401832107]} zoom={15} scrollWheelZoom={false}>
          {/* Donnée obligatoire */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Limites du festival */}
          <Polyline positions={polyline} pathOptions={{ color: "red" }} />
          {/* Cercle + tooltip afichant l'entrée du festival */}
          <Circle center={[48.8390670275882, 2.380160591399623]} pathOptions={{ color: "Blue" }} radius={25}>
            <Tooltip direction="top" offset={[0, -20]} opacity={0.8} permanent>
              Entrée du festival
            </Tooltip>
          </Circle>
          {/* Afiiche les marqueurs de la map */}
          {sortedMapData.map((marker) => (
            // Le ternaire sert à changer la couleur en fonction du type de commodité
            marker.acf.type === "Scène" ? (
              <Marker key={marker.id} position={[marker.acf.latitude, marker.acf.longitude]} icon={new Icon({ iconUrl: bluePing, iconSize: [18, 30], iconAnchor: [10, 30] })}>
                <Popup offset={[0, -20]}>
                  <div className='font-bold'>
                    {marker.acf.name}
                  </div>
                  <br />
                  <h3>Programmation :</h3>
                  <br />
                  {concertInfo
                    .filter(object => object.acf.spot.includes(marker.acf.name))
                    .map((filteredSpot => (
                      <div key={filteredSpot.id}>
                        {filteredSpot.acf.groupe}
                      </div>
                    )))
                  }
                </Popup>
              </Marker>)
              : marker.acf.type === "Shop" ? (
                <Marker key={marker.id} position={[marker.acf.latitude, marker.acf.longitude]} icon={new Icon({ iconUrl: orangePing, iconSize: [18, 30], iconAnchor: [10, 30] })}>
                  <Popup offset={[0, -20]}>
                    <div className='font-bold'>
                      {marker.acf.name}
                    </div>
                    <br />
                    {marker.acf.desc}
                  </Popup>
                </Marker>)
                : marker.acf.type === "Toilette" ? (
                  <Marker key={marker.id} position={[marker.acf.latitude, marker.acf.longitude]} icon={new Icon({ iconUrl: yellowPing, iconSize: [18, 30], iconAnchor: [10, 30] })}>
                    <Popup offset={[0, -20]}>
                      <div className='font-bold'>
                        {marker.acf.name}
                      </div>
                      <br />
                      {marker.acf.desc}
                    </Popup>
                  </Marker>)
                  : null
          ))};
          {/* Point de position de l'utilisateur */}
          <Marker position={[geoloc.latitude, geoloc.longitude]} icon={new Icon({ iconUrl: posPing, iconSize: [18, 30], iconAnchor: [10, 30] })}></Marker>

          {isActive && <RoutingMachine
            latUser={geoloc.latitude}
            lngUser={geoloc.longitude}
            latDestination={48.839180010906304}
            lngDestination={2.3802137374877934}
          />}
          
        </MapContainer>
        {/* fin de la map */}
      </div>
    </>
  )
}