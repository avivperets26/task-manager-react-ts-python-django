import React from "react";
import Button from "./Button";
import styles from "../styles/Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalTasks: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalTasks,
  pageSize,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalTasks / pageSize); // This variable is used to calculate the total number of pages

  return (
    <div className={styles.paginationContainer}>
      {currentPage > 1 && (
        <Button onClick={() => onPageChange(currentPage - 1)}>Previous</Button> // This button is used to navigate to the previous page
      )}
      {currentPage < totalPages && (
        <Button onClick={() => onPageChange(currentPage + 1)}>Next</Button> // This button is used to navigate to the next page
      )}
    </div>
  );
};

export default Pagination;
