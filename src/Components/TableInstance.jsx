import { useState } from "react";
import {
  useTable,
  usePagination,
  useRowSelect,
  useGlobalFilter,
} from "react-table";

import TableLayout from "./TableComponents/TableLayout";
import TableFooter from "./TableComponents/TableFooter";
import Actions from "./TableComponents/Actions";
import GlobalFilter from "./TableComponents/GlobalFilter";
import IndeterminateCheckbox from "./TableComponents/IndeterminateCheckbox";

const TableInstance = ({ columns, data, deleteSelected, updateSelected }) => {
  const [editIndex, setEditIndex] = useState(null);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    pageCount,
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
            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
          ),
          Cell: ({ row }) => (
            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
          ),
        },
        ...columns,
        {
          id: "actions",
          Header: () => <div>Actions</div>,
          Cell: ({ row }) => (
            <div>
              <Actions
                row={row}
                editSelected={editSelected}
                deleteSelected={deleteSelected}
              />
            </div>
          ),
        },
      ]);
    }
  );

  function editSelected(i) {
    setEditIndex(i);
  }

  return (
    <div className="flex flex-col text-left">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow border-b border-gray-200 sm:rounded">
            <GlobalFilter
              globalFilter={state.globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
            <TableLayout
              getTableProps={getTableProps}
              headerGroups={headerGroups}
              getTableBodyProps={getTableBodyProps}
              page={page}
              prepareRow={prepareRow}
              selectedRowIds={state.selectedRowIds}
              editIndex={editIndex}
              editSelected={editSelected}
              updateSelected={updateSelected}
            />
            <TableFooter
              pageCount={pageCount}
              pageIndex={state.pageIndex}
              gotoPage={gotoPage}
              previousPage={previousPage}
              nextPage={nextPage}
              canPreviousPage={canPreviousPage}
              canNextPage={canNextPage}
              selectedRowIds={state.selectedRowIds}
              deleteSelected={deleteSelected}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableInstance;
