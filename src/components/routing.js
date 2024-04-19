import L, { marker } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";


const createRoutineMachineLayer = ({ latDestination, lngDestination, latUser, lngUser }) => {

  const instance = L.Routing.control({
    waypoints: [
      L.latLng(latUser, lngUser),
      L.latLng(latDestination, lngDestination)
    ],    
    lineOptions: {
      styles: [{ color: "green", weight: 4 }]
    },
    addWaypoints: false,
    draggableWaypoints: false,
    position:'bottomleft',
    language:'fr',
    fitSelectedRoutes:true,
    routeWhileDragging:true,
    showAlternatives: false,
    // corrige le bug marker notfound
    createMarker: function() { return null; },
  });
  return instance;

};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;