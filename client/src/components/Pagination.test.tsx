import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  it("displays only Next button on the first page", () => {
    const handlePageChange = vi.fn();
    const { getByText, queryByText } = render(
      <Pagination
        currentPage={1}
        totalTasks={15}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    );
    expect(getByText("Next")).toBeInTheDocument();
    expect(queryByText("Previous")).toBeNull();
  });

  it("displays both Previous and Next buttons on a middle page", () => {
    const handlePageChange = vi.fn();
    const { getByText } = render(
      <Pagination
        currentPage={2}
        totalTasks={15}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    );
    expect(getByText("Previous")).toBeInTheDocument();
    expect(getByText("Next")).toBeInTheDocument();
  });

  it("displays only Previous button on the last page", () => {
    const handlePageChange = vi.fn();
    const { getByText, queryByText } = render(
      <Pagination
        currentPage={3}
        totalTasks={15}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    );
    expect(getByText("Previous")).toBeInTheDocument();
    expect(queryByText("Next")).toBeNull();
  });

  it("calls onPageChange with the correct page when Next is clicked", () => {
    const handlePageChange = vi.fn();
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalTasks={15}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    );
    fireEvent.click(getByText("Next"));
    expect(handlePageChange).toHaveBeenCalledWith(2);
  });

  it("calls onPageChange with the correct page when Previous is clicked", () => {
    const handlePageChange = vi.fn();
    const { getByText } = render(
      <Pagination
        currentPage={2}
        totalTasks={15}
        pageSize={5}
        onPageChange={handlePageChange}
      />
    );
    fireEvent.click(getByText("Previous"));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
