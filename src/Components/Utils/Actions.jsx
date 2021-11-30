const Actions = ({ row, deleteSelected, editSelected }) => {
  return (
    <div className="flex">
      <button
        className="btn text-blue-500 hover:text-blue-600"
        onClick={() => editSelected(row.index)}
      >
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

export default Actions;
