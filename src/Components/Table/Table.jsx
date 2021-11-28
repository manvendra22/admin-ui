import { useMemo } from "react";
import TableInstance from "./TableInstance";

function Table({ data }) {
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
    return [columns, data];
  }, [data]);

  return <TableInstance columns={columns} data={tableData} />;
}

export default Table;
