export default function FilterSelect({ source, onClick }) {
  return (
    <option className="pl-2 my-1 text-xl text-slate-700" onClick={onClick}>{source}</option>
  );
}