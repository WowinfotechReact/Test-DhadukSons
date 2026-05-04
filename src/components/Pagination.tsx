import Pagination from "react-bootstrap/Pagination";
import "./pagination.css";

interface PaginationComponentProps {
  pageNo: number;
  pageSize: number;
  totalCount: number;
  onPageChange: (pageNo: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  pageNo,
  pageSize,
  totalCount,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handleClick = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Create a pagination range (limit to max 5 pages displayed around current)
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const start = Math.max(2, pageNo - delta);
    const end = Math.min(totalPages - 1, pageNo + delta);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <Pagination
      className="justify-content-center custom-pagination"
      style={{ marginTop: "10px" }}
    >
      <Pagination.First
        onClick={() => handleClick(1)}
        disabled={pageNo === 1}
      />
      <Pagination.Prev
        onClick={() => handleClick(pageNo - 1)}
        disabled={pageNo === 1}
      />

      <Pagination.Item active={pageNo === 1} onClick={() => handleClick(1)}>
        {1}
      </Pagination.Item>

      {pageNumbers[0] > 2 && <Pagination.Ellipsis disabled />}

      {pageNumbers.map((page) => (
        <Pagination.Item
          key={page}
          active={pageNo === page}
          onClick={() => handleClick(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
        <Pagination.Ellipsis disabled />
      )}

      {totalPages > 1 && (
        <Pagination.Item
          active={pageNo === totalPages}
          onClick={() => handleClick(totalPages)}
        >
          {totalPages}
        </Pagination.Item>
      )}

      <Pagination.Next
        onClick={() => handleClick(pageNo + 1)}
        disabled={pageNo === totalPages}
      />
      <Pagination.Last
        onClick={() => handleClick(totalPages)}
        disabled={pageNo === totalPages}
      />
    </Pagination>
  );
};

export default PaginationComponent;
