import Pagination from "./Pagination";

const TableFooter = ({
  deleteSelected,
  selectedRowIds,
  ...paginationProps
}) => {
  const selectedRows = Object.keys(selectedRowIds);

  return (
    <div className="flex justify-between m-5">
      <button
        className="btn bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
        onClick={() => deleteSelected(selectedRows)}
        disabled={selectedRows.length === 0}
      >
        Delete Selected
      </button>
      <Pagination {...paginationProps} />
    </div>
  );
};

export default TableFooter;
