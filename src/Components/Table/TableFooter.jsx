import Pagination from "../Pagination";

const TableFooter = ({
  deleteSelected,
  selectedRowIds,
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <div className="flex justify-between m-4">
      <button
        className="btn bg-red-500 text-white hover:bg-red-600"
        onClick={() => deleteSelected(selectedRowIds)}
        disabled={false}
      >
        Delete Selected
      </button>
      <Pagination
        gotoPage={gotoPage}
        previousPage={previousPage}
        nextPage={nextPage}
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
      />
    </div>
  );
};

export default TableFooter;
