export default function CompactPagination({ currentPage, totalItems, limit, onPageChange }) {
  const totalPages = Math.ceil(totalItems / limit);
  if (totalPages === 0) return null;

  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - delta && i <= currentPage + delta)
      ) {
        range.push(i);
      } else if (range[range.length - 1] !== "...") {
        range.push("...");
      }
    }
    return range;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex gap-2 mt-4 items-center">
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="px-2 py-0 border bg-white text-black"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={idx} className="px-2 py-1">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-2 py-0 border ${
              p === currentPage ? "bg-green-500 text-white" : "bg-white text-black"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        className="px-2 py-0 border bg-white text-black"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}
