import facebook  from "../images/facebook.svg"
import twitter  from "../images/twitter.svg" 
import instagram  from "../images/instagram.svg"
import youtube  from "../images/youtube.svg"
import snapchat  from "../images/snapchat.svg"
import linkedin  from "../images/linkedin.svg"

export default function SocialMedia() {
  return (
    <div className="flex flex-col justify-around items-center bg-blue-500 h-44">
      <h3 className="text-center pt-3 text-xl text-white">Suivez-nous sur les réseaux sociaux !</h3>
      <ul className="flex flex-wrap justify-around items-center w-1/2 h-28">
        <li className="m-2"><a href="https://fr-fr.facebook.com/"><img width={35} height={35} src={facebook} alt="logo facebook" /></a></li>
        <li className="m-2"><a href="https://twitter.com/Accueil"><img width={35} height={35} src={twitter} alt="logo twitter" /></a></li>
        <li className="m-2"><a href="https://www.instagram.com/?hl=fr"><img width={35} height={35} src={instagram} alt="logo instagram" /></a></li>
        <li className="m-2"><a href="https://www.youtube.com/"><img width={35} height={35} src={youtube} alt="logo youtube" /></a></li>
        <li className="m-2"><a href="https://www.snapchat.com/"><img width={35} height={35} src={snapchat} alt="logo snapchat" /></a></li>
        <li className="m-2"><a href="https://fr.linkedin.com/"><img width={35} height={35} src={linkedin} alt="logo linkedin" /></a></li>
      </ul>
    </div>
  )
}