import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
  // useAsyncDebounce,
} from "react-table";

import TableLayout from "./TableLayout";
import TableFooter from "./TableFooter";
import Actions from "./Utils/Actions";
import GlobalFilter from "./Utils/GlobalFilter";
import IndeterminateCheckbox from "./Utils/IndeterminateCheckbox";

function TableInstance({ columns, data, deleteSelected }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllPageRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
        {
          id: "actions",
          Header: () => <div>Actions</div>,
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
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded">
            <GlobalFilter
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <TableLayout
              selectedRowIds={state.selectedRowIds}
              getTableProps={getTableProps}
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
            />
            <TableFooter
              deleteSelected={deleteSelected}
              selectedRowIds={state.selectedRowIds}
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

export default TableInstance;
