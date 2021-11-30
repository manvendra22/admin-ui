const EditableCell = ({
  cell,
  values,
  setValues,
  editSelected,
  saveSelected,
}) => {
  if (cell.column.id === "selection") {
    // go back button in selection column
    return (
      <button className="text-red-500" onClick={() => editSelected(null)}>
        <svg width="1.4em" height="1.4em" viewBox="0 0 48 48">
          <path
            clipRule="evenodd"
            d="M44 40.836c-4.893-5.973-9.238-9.362-13.036-10.168c-3.797-.805-7.412-.927-10.846-.365V41L4 23.545L20.118 7v10.167c6.349.05 11.746 2.328 16.192 6.833c4.445 4.505 7.009 10.117 7.69 16.836z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
            fill="none"
          ></path>
        </svg>
      </button>
    );
  }

  if (cell.column.id === "actions") {
    // save button in actions column
    return (
      <button
        className="btn text-indigo-600 hover:text-indigo-700"
        onClick={saveSelected}
      >
        Save
      </button>
    );
  }

  const value = values[cell.column.id];

  function updateValues(e) {
    setValues({ ...values, [cell.column.id]: e.target.value });
  }

  return (
    <input className="input px-2 py-1" value={value} onChange={updateValues} />
  );
};

export default EditableCell;
