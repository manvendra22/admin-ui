const Pagination = ({
  gotoPage,
  previousPage,
  nextPage,
  canPreviousPage,
  canNextPage,
}) => {
  return (
    <div className="flex items-center justify-center text-purple-500">
      <button
        className="btn disabled:opacity-50"
        onClick={() => gotoPage(0)}
        disabled={!canPreviousPage}
      >
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            d="M18.41 7.41L17 6l-6 6l6 6l1.41-1.41L13.83 12l4.58-4.59m-6 0L11 6l-6 6l6 6l1.41-1.41L7.83 12l4.58-4.59z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <button
        className="btn disabled:opacity-50"
        onClick={() => previousPage()}
        disabled={!canPreviousPage}
      >
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <button
        className="btn disabled:opacity-50"
        onClick={() => nextPage()}
        disabled={!canNextPage}
      >
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
      <button
        className="btn disabled:opacity-50"
        onClick={() => gotoPage(pageCount - 1)}
        disabled={!canNextPage}
      >
        <svg width="1.5em" height="1.5em" viewBox="0 0 24 24">
          <path
            d="M5.59 7.41L7 6l6 6l-6 6l-1.41-1.41L10.17 12L5.59 7.41m6 0L13 6l6 6l-6 6l-1.41-1.41L16.17 12l-4.58-4.59z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
