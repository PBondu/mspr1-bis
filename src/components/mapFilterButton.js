export default function MapFilterButton({ name, ping, onClick }) {
  return (
    <button onClick={onClick} className="flex flex-row justify-center bg-slate-700 w-fit h-10 px-3 text-m text-white items-center rounded-xl">
      <img width={16} height={16} alt="" className="mr-1" src={ping} />
      {name}
    </button>
  )
}