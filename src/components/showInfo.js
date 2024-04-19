import moment from "moment";

export default function ShowInfo({ group, spot, time }){
  return(
      <li className="flex justify-center items-center h-fit">
        <div className="flex flex-col justify-center items-center w-72 h-24 my-5 p-2 bg-blue-500 text-white text-xl select-none shadow-lg rounded-md">
          <p className="flex justify-center items-center h-10 w-4/5 font-bold">{group}</p>
          <div className="flex flex-row justify-between h-14 w-full">
            <p className="flex items-center w-1/2">{spot}</p>
            <p className="flex justify-center items-center w-1/2">{moment(time).format("D/M [-] H:mm")}</p> 
          </div>
        </div>
      </li>
  );
}