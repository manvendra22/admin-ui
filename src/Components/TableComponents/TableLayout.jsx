import EditableRow from "./EditableRow";

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

export default TableLayout;
