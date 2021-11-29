import { useState, useMemo } from "react";
import TableInstance from "./TableInstance";

function Table({ data }) {
  const [newData, setNewData] = useState(data);

  function deleteSelected(selectedRowIds) {
    console.log({ selectedRowIds });

    const updatedData = newData.filter((_, id) => {
      return !selectedRowIds.includes(String(id));
    });

    setNewData(updatedData);
  }

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
    />
  );
}

export default Table;
