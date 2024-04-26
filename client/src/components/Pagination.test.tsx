import { describe, it, expect, vi } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination component", () => {
  it("displays only Next button on the first page", () => {
    const handlePageChange = vi.fn();
    const { getByText, queryByText } = render(
      <Pagination
        next="http://example.com/page/2"
        previous={null}
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
        next="http://example.com/page/3"
        previous="http://example.com/page/1"
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
        next={null}
        previous="http://example.com/page/2"
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
        next="http://example.com/page/2"
        previous={null}
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
        next="http://example.com/page/3"
        previous="http://example.com/page/1"
        onPageChange={handlePageChange}
      />
    );
    fireEvent.click(getByText("Previous"));
    expect(handlePageChange).toHaveBeenCalledWith(1);
  });
});
