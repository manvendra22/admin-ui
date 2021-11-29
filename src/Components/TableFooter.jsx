import Pagination from "./Pagination";

const TableFooter = ({
  deleteSelected,
  selectedRowIds,
  ...paginationProps
}) => {
  return (
    <div className="flex justify-between m-4">
      <button
        className="btn bg-red-500 text-white hover:bg-red-600"
        onClick={() => deleteSelected(Object.keys(selectedRowIds))}
        disabled={false}
      >
        Delete Selected
      </button>
      <Pagination {...paginationProps} />
    </div>
  );
};

export default TableFooter;
