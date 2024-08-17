import PropTypes from "prop-types";

const Pagination = ({ table }) => {
  const {
    getCanPreviousPage,
    getCanNextPage,
    getPageCount,
    nextPage,
    previousPage,
    setPageIndex,
    getState,
  } = table;

  const { pageIndex } = getState().pagination;
  const totalPages = getPageCount();

  // Determine which pages to show
  const pagesToShow = () => {
    const range = 1; // Number of pages to show before and after the current page
    let start = Math.max(pageIndex - range, 0);
    let end = Math.min(pageIndex + range, totalPages - 1);
    // Adjust the start and end if there are not enough pages before or after the current page
    if (end - start < range * 2) {
      if (start === 0) {
        end = Math.min(range * 2, totalPages - 1);
      } else if (end === totalPages - 1) {
        start = Math.max(totalPages - range * 2 - 1, 0);
      }
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="pagination mt-4 flex items-center justify-between p-2 pb-3">
      <button
        onClick={() => previousPage()}
        disabled={!getCanPreviousPage()}
        className="flex items-center gap-2 px-4 py-2 font-[600] border-[1px] border-[#D0D5DD] text-[#344054] rounded"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8334 6.99996H1.16675M1.16675 6.99996L7.00008 12.8333M1.16675 6.99996L7.00008 1.16663"
            stroke="#344054"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Previous</span>
      </button>
      <div className="flex items-center">
        {pagesToShow()[0] > 0 && (
          <>
            <button
              onClick={() => setPageIndex(0)}
              className="px-4 py-2 rounded text-[#475467]"
            >
              1
            </button>
            {pagesToShow()[0] > 1 && (
              <span className="px-4 py-2 text-[#475467]">...</span>
            )}
          </>
        )}
        {pagesToShow().map((page) => (
          <button
            key={page}
            onClick={() => setPageIndex(page)}
            className={`px-4 py-2 rounded ${
              pageIndex === page
                ? "bg-gray-200 text-[#1D2939]"
                : "text-[#475467]"
            }`}
          >
            {page + 1}
          </button>
        ))}
        {pagesToShow()[pagesToShow().length - 1] < totalPages - 1 && (
          <>
            {pagesToShow()[pagesToShow().length - 1] < totalPages - 2 && (
              <span className="px-4 py-2 text-[#475467]">...</span>
            )}
            <button
              onClick={() => setPageIndex(totalPages - 1)}
              className="px-4 py-2 rounded text-[#475467]"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>
      <button
        onClick={() => nextPage()}
        disabled={!getCanNextPage()}
        className="flex items-center gap-2 px-4 py-2 font-[600] border-[1px] border-[#D0D5DD] text-[#344054] rounded"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.16663 6.99996H12.8333M12.8333 6.99996L6.99996 1.16663M12.8333 6.99996L6.99996 12.8333"
            stroke="#344054"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Next Page
      </button>
    </div>
  );
};

Pagination.propTypes = {
  table: PropTypes.shape({
    getPageOptions: PropTypes.func,
    getPageCount: PropTypes.func,
    setPageIndex: PropTypes.func,
    getState: PropTypes.func,
    previousPage: PropTypes.func,
    nextPage: PropTypes.func,
    gotoPage: PropTypes.func,
    getCanPreviousPage: PropTypes.func,
    getCanNextPage: PropTypes.func,
    state: PropTypes.shape({
      pageIndex: PropTypes.number,
    }),
  }).isRequired,
};

export default Pagination;
