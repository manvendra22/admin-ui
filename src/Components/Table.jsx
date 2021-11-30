import { useState, useMemo } from "react";
import TableInstance from "./TableInstance";

const Table = ({ data }) => {
  const [newData, setNewData] = useState(data);

  function updateData(updatedData) {
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
    <TableInstance columns={columns} data={tableData} updateData={updateData} />
  );
};

export default Table;
