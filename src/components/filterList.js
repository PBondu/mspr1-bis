export default function FilterList({ source, onClick }) {
  return (
    <button className="pl-2 my-1 text-xl text-slate-700" onClick={onClick}>{source}</button>
  );
}