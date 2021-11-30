import { useState } from "react";

const TableLayout = ({
  selectedRowIds,
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  editIndex,
  editSelected,
  updateSelected,
}) => {
  const selectedRows = Object.keys(selectedRowIds);

  return (
    <table className="min-w-full divide-y divide-gray-200" {...getTableProps()}>
      <thead className="bg-gray-100">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase tracking-wider"
                {...column.getHeaderProps()}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody
        className="bg-white divide-y divide-gray-200"
        {...getTableBodyProps()}
      >
        {page.map((row, i) => {
          prepareRow(row);
          return (
            <tr
              className={`px-6 py-4 whitespace-nowrap ${
                selectedRows.includes(String(i)) ? "bg-gray-50" : ""
              }`}
              {...row.getRowProps()}
            >
              {editIndex === i ? (
                <EditableRow
                  row={row}
                  editSelected={editSelected}
                  updateSelected={updateSelected}
                />
              ) : (
                row.cells.map((cell) => {
                  return (
                    <td
                      className="px-6 py-4 text-sm text-gray-800"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const EditableRow = ({ row, editSelected, updateSelected }) => {
  const [values, setValues] = useState(row.values);

  function saveSelected() {
    updateSelected(values, row.original.id);
  }

  return row.cells.map((cell) => {
    return (
      <td className="px-6 py-4 text-sm text-gray-800" {...cell.getCellProps()}>
        <EditableCell
          cell={cell}
          values={values}
          setValues={setValues}
          editSelected={editSelected}
          saveSelected={saveSelected}
        />
      </td>
    );
  });
};

const EditableCell = ({
  cell,
  values,
  setValues,
  editSelected,
  saveSelected,
}) => {
  if (cell.column.id === "selection") {
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

export default TableLayout;
