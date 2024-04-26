import React from "react";
import Button from "./Button";
import styles from "../styles/Pagination.module.css";
import type { Pagination } from "../types/types";
import { getCurrentPage } from "../helpers/helpers";
interface PaginationProps {
  onPageChange: (page: number) => void;
  next: string | null;
  previous: string | null;
}

// Pagination component that displays the next and previous buttons to navigate through the pages of a list of items

const Pagination: React.FC<PaginationProps> = ({
  next,
  previous,
  onPageChange,
}) => {
  return (
    <div className={styles.paginationContainer}>
      {previous && (
        <Button
          onClick={() =>
            onPageChange(Math.max(1, getCurrentPage(next, previous) - 1))
          }
        >
          Previous
        </Button>
      )}
      {next && (
        <Button
          onClick={() => onPageChange(getCurrentPage(next, previous) + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
};

export default Pagination;
