import { useState } from "react";
import EditableCell from "./EditableCell";

const EditableRow = ({ row, editSelected, updateSelected }) => {
  const [values, setValues] = useState(row.values);

  function saveSelected() {
    updateSelected(values, row.original.id);
    editSelected(null);
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

export default EditableRow;
