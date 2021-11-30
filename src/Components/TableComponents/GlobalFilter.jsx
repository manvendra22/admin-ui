import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  const [value, setValue] = useState(globalFilter);

  // Debounced function for setting the global filter
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
      className="input px-3 py-3"
    />
  );
};

export default GlobalFilter;
