import { FetchConcertData } from "./components/fetchConcertWp";
import { SortData } from "./components/sortConcertData";
import { FetchMapData } from "./components/fetchMapWp";
import { FetchPartners } from "./components/fetchPartners";
import { Geoloc } from "./components/geoloc";
import Header from "./components/header";
import LineUp from "./components/lineUp"
import Map from "./components/map";
import Welcome from "./components/welcome"
import Title from "./components/title";
import Billeterie from "./components/billeterie";
import Infos from "./components/infoPratiques";
import SocialMedia from "./components/socialMedia";
import Partners from "./components/partners";
import arrowUp from "./images/arrow-up-solidWhite.svg"

export default function Page() {
  return (
    <>
      <FetchConcertData>
        <div id="accueil"></div>
        <Header />
        <Welcome />
        <div id="prog"></div>
        <Title title="Programmation" />
        <SortData>
          <LineUp />
        </SortData>

        <div id="billet"></div>
        <Title title="Billeterie" />
        <Billeterie />

        <div id="info"></div>
        <Title title="Informations" />
        <Infos />

        <div id="follow"></div>
        <Title title="Réseaux Sociaux" />
        <SocialMedia />

        <Title title="Nos Partenaires" />
        <FetchPartners>
          <Partners />
        </FetchPartners>

        <Geoloc>
          <FetchMapData>
            <div id="map"></div>
            <Title title="Carte du Festival" />
            <Map />
          </FetchMapData>
        </Geoloc>
        
      </FetchConcertData>
      <a href="#accueil" className="fixed bottom-0 right-0 p-2 mr-3 mb-4 z-50 w-fit h-fit bg-slate-300/[.7] rounded-xl"><img src={arrowUp} width={25} height={25} alt="" /></a>

    </>
  );
}
