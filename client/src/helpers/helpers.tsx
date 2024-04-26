export function getCurrentPage(
  next: string | null,
  previous: string | null
): number {
  let page: number;

  if (next) {
    // Extract the page number from the next URL and subtract 1
    const url = new URL(next);
    page = Number(url.searchParams.get("page")) - 1;
  } else if (previous) {
    // Extract the page number from the previous URL and add 1
    const url = new URL(previous);
    page = Number(url.searchParams.get("page")) + 1;
  } else {
    // If there's no next or previous URL, we're on the first page
    page = 1;
  }

  // Ensure that the page number is at least 1
  return Math.max(page, 1);
}
