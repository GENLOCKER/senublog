import { Pagination as NextUIPagination, PaginationProps } from "@heroui/react";

const Pagination: React.FC<PaginationProps> = ({ ...props }) => {
  return (
    <div className="flex justify-center mt-6">
      <NextUIPagination {...props} aria-label="Pagination" showControls />
    </div>
  );
};

export default Pagination;
