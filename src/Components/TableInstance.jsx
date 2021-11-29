import { forwardRef, useRef, useEffect } from "react";
import { useTable, usePagination, useRowSelect } from "react-table";

import TableLayout from "./TableLayout";
import TableFooter from "./TableFooter";

function TableInstance({ columns, data, deleteSelected }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    // pageOptions,
    // pageCount,
    gotoPage,
    nextPage,
    previousPage,
    // setPageSize,
    // selectedFlatRows,
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
        {
          id: "actions",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: () => <div>Actions</div>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <Actions row={row} deleteSelected={deleteSelected} />
            </div>
          ),
        },
      ]);
    }
  );

  return (
    <div className="flex flex-col text-left">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <TableLayout
              getTableProps={getTableProps}
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
            />
            <TableFooter
              deleteSelected={deleteSelected}
              selectedRowIds={selectedRowIds}
              gotoPage={gotoPage}
              previousPage={previousPage}
              nextPage={nextPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Actions = ({ row, deleteSelected }) => {
  return (
    <div className="flex">
      <button className="btn text-blue-500 hover:text-blue-600">
        <svg width="1.4em" height="1.4em" viewBox="0 0 48 48">
          <g
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinejoin="round"
          >
            <path
              d="M42 26v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h14"
              strokeLinecap="round"
            ></path>
            <path d="M14 26.72V34h7.317L42 13.308L34.695 6L14 26.72z"></path>
          </g>
        </svg>
      </button>
      <button
        className="btn text-red-500 hover:text-red-600"
        onClick={() => deleteSelected([String(row.index)])}
      >
        <svg width="1.4em" height="1.4em" viewBox="0 0 24 24">
          <path
            d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6v12M8 9h8v10H8V9m7.5-5l-1-1h-5l-1 1H5v2h14V4h-3.5z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};

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
