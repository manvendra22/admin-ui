import { useState, useMemo } from "react";
import TableInstance from "./TableInstance";

const Table = ({ data }) => {
  const [newData, setNewData] = useState(data);

  function updateData(updatedData) {
    setNewData(updatedData);
  }

  function deleteSelected(selectedRowIds) {
    const updatedData = data.filter((_, id) => {
      return !selectedRowIds.includes(String(id));
    });

    updateData(updatedData);
  }

  function updateSelected(values, rowId) {
    const updatedData = data.map((row) => {
      if (rowId === row.id) {
        return values;
      }
      return row;
    });

    updateData(updatedData);
  }

  // Memoize api data [required for react-table]
  const [columns, tableData] = useMemo(() => {
    const columns = [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Role",
        accessor: "role",
      },
    ];
    return [columns, newData];
  }, [newData]);

  return (
    <TableInstance
      columns={columns}
      data={tableData}
      deleteSelected={deleteSelected}
      updateSelected={updateSelected}
    />
  );
};

export default Table;
