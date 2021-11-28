import { forwardRef, useRef, useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";

function TableInstance({ columns, data, deleteSelected }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  // Render the UI for your table
  return (
    <div className="flex flex-col text-left">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-gray-50">
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
                      className="px-6 py-4 whitespace-nowrap"
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className="px-6 py-4 text-sm text-gray-800"
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="m-4">
              <button
                className="bg-red-500
    text-white 
    hover:bg-red-600
    font-bold
    uppercase
    text-xs
    px-4
    py-2
    rounded
    shadow
    hover:shadow-md
    outline-none
    focus:outline-none
    mr-1
    mb-1
    ease-linear
    transition-all
    duration-150"
                onClick={() => deleteSelected(selectedRowIds)}
                disabled={false}
              >
                Delete Selected
              </button>
            </div>

            <div className="flex items-center justify-center m-4">
              <button
                className="text-purple-500
      bg-transparent
      border-l border-t border-b border-purple-500
      hover:bg-purple-500 hover:text-white
      active:bg-purple-600
      font-bold
      uppercase
      text-xs
      px-4
      py-2
      rounded-l
      outline-none
      focus:outline-none
      mb-1
      ease-linear
      transition-all
      duration-150"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                {"<<"}
              </button>
              <button
                className="text-purple-500
      bg-transparent
      border-l border-t border-b border-purple-500
      hover:bg-purple-500 hover:text-white
      active:bg-purple-600
      font-bold
      uppercase
      text-xs
      px-4
      py-2
      outline-none
      focus:outline-none
      mb-1
      ease-linear
      transition-all
      duration-150"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>
              <button
                className="text-purple-500
      bg-transparent
      border border-solid border-purple-500
      hover:bg-purple-500 hover:text-white
      active:bg-purple-600
      font-bold
      uppercase
      text-xs
      px-4
      py-2
      outline-none
      focus:outline-none
      mb-1
      ease-linear
      transition-all
      duration-150"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                {">"}
              </button>
              <button
                className="text-purple-500
      bg-transparent
      border-t border-b border-r border-purple-500
      hover:bg-purple-500 hover:text-white
      active:bg-purple-600
      font-bold
      uppercase
      text-xs
      px-4
      py-2
      rounded-r
      outline-none
      focus:outline-none
      mb-1
      ease-linear
      transition-all
      duration-150"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

export default TableInstance;
