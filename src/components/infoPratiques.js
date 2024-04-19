import DropDown from "./dropDown"

export default function Infos() {
  return (
    // Informations pratiques fropdown + static text
    <div className="flex flex-col justify-around bg-blue-500 text-white pl-3 min-h-32 py-3">
      <DropDown button="Infos Pratiques">
        <div className="my-2 h-40 flex flex-col justify-around">
          <h3 className="text-xl">Informations Zikos Festival</h3>
          <p>Le festival se déroulera du 21 au 22 juin 2024 inclus</p>
          <p><strong>Horaires :</strong> 10h - 22h</p>
          <p><strong>Adresse :</strong> Parc de Bercy 75012 Paris - Entrée près de l&#39;Accord Hotel Arena</p>
        </div>
      </DropDown>
      <hr className="w-3/4 my-4 text-white" />
      {/* Faq dropdown + toutes les questions en statique */}
      <DropDown button="Foire Aux Questions">
        <div className="my-2 h-64 flex flex-col justify-around">
          <p><strong>Q : </strong>Quels sont les dates et les horaires du festival ?</p>
          <p><strong>R : </strong>Consulter la section Infos Pratiques</p>
          <hr className="w-3/4 my-2 text-white" />
          <p><strong>Q : </strong>Où Acheter les billets d&#39;entrée ?</p>
          <p><strong>R : </strong>Lien de la billetterie sur la page d&#39;accueil</p>
          <hr className="w-3/4 my-2 text-white" />
          <p><strong>Q : </strong>Comment se rendre au Zikos Festival ?</p>
          <p><strong>R : </strong>métro ligne 6 Bercy</p>
        </div>
      </DropDown>
    </div>


  )
}