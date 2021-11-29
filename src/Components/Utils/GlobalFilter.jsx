import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  const onChange = useDebouncedCallback((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <input
      value={value || ""}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder="Search by name, email or role"
      className="px-3 py-3 placeholder-gray-400 text-gray-600 rounded text-sm border border-gray-400 outline-none focus:outline-none w-full"
    />
  );
};

export default GlobalFilter;
