import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { Fragment, type JSX, useCallback } from 'react';

import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib/utils';

/**
 * Props for the Pagination component.
 *
 * @interface PaginationProps
 * @property {number} currentPage - The currently active page (1-indexed). Should be between 1 and `totalPages`.
 * @property {number} totalPages - The total number of pages available. Must be >= 1.
 * @property {(page: number) => void} onPageChange - Callback invoked when the user requests a different page.
 *    Receives the target page number as an argument. The parent is responsible for bounds-checking and updating
 *    the `currentPage` prop accordingly.
 * @property {string} [className] - Optional additional class names to apply to the outer container for layout/styling.
 *
 * @example
 * <Pagination
 *   currentPage={2}
 *   totalPages={10}
 *   onPageChange={(p) => setPage(p)}
 * />
 */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination component renders a paginated navigation control with:
 * - Previous / Next buttons.
 * - Page number buttons.
 * - Ellipses when the full range is too large.
 *
 * It always shows the first and last page, and a sliding window of pages centered
 * around the current page (up to 5 visible numeric pages total, with ellipses as needed).
 *
 * Accessibility:
 * - The container has `role="navigation"` and an `aria-label`.
 * - The previous/next buttons are disabled at bounds and include screen-reader-only labels.
 * - Current page is visually marked via the `default` variant button.
 *
 * @component
 * @param {PaginationProps} props - Component properties.
 * @param {number} props.currentPage - Active page number (1-indexed).
 * @param {number} props.totalPages - Total pages available.
 * @param {(page: number) => void} props.onPageChange - Called when user selects a page; receives new page number.
 * @param {string} [props.className] - Additional classes for outer container.
 * @returns {JSX.Element} The pagination navigation UI.
 *
 * @example
 * // Show pages for a dataset with 20 pages, currently on page 1
 * <Pagination
 *   currentPage={1}
 *   totalPages={20}
 *   onPageChange={(page) => console.log('Go to page', page)}
 * />
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps): JSX.Element {
  /**
   * Returns a consecutive range of page numbers inclusive.
   *
   * @param {number} start - Starting page number (inclusive).
   * @param {number} end - Ending page number (inclusive).
   * @returns {number[]} Array of page numbers from start to end.
   *
   * @example
   * getPageRange(3, 5); // [3,4,5]
   */
  const getPageRange = (start: number, end: number): number[] => {
    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );
  };

  const handlePrevious = useCallback(() => {
    onPageChange(currentPage - 1);
  }, [onPageChange, currentPage]);

  const handleNext = useCallback(() => {
    onPageChange(currentPage + 1);
  }, [onPageChange, currentPage]);

  const handlePageClick = useCallback(
    (page: number) => {
      onPageChange(page);
    },
    [onPageChange],
  );

  /**
   * Generates the list of items to render in the pagination bar. The list includes:
   * - Numeric page entries (numbers).
   * - Ellipsis strings `'...'` indicating skipped ranges.
   *
   * Rules:
   * 1. Always show first and last page.
   * 2. Show up to `maxPagesToShow` numeric pages in total (sliding window around current).
   * 3. Insert ellipses when there is a gap between the fixed first/last and the sliding window.
   * 4. Ensure continuity if pages are adjacent (e.g., when current is near the start or end).
   *
   * @returns {(number | string)[]} Array mixing page numbers and ellipsis placeholders.
   */
  const generatePageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 5; // desired visible numeric pages (excluding ellipses)
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    // If total is small, show all pages
    if (totalPages <= maxPagesToShow) {
      return getPageRange(1, totalPages);
    }

    let start = Math.max(1, currentPage - halfMaxPages);
    let end = Math.min(totalPages, currentPage + halfMaxPages);

    // Adjust when near the start or end to keep window size consistent
    if (currentPage <= halfMaxPages) {
      end = maxPagesToShow;
    } else if (currentPage > totalPages - halfMaxPages) {
      start = totalPages - maxPagesToShow + 1;
    }

    // Always include first page
    pages.push(1);

    // Decide between showing page 2 or ellipsis after first page
    if (start > 2) {
      // gap exists, show ellipsis
      pages.push('...');
    } else {
      // contiguous, show page 2 (covers start === 1 or 2)
      pages.push(2);
    }

    // Middle block: pages between the fixed ends and edges (excluding 1,2 and last-1,last)
    if (start > 2 || end < totalPages - 1) {
      const middleStart = Math.max(3, start);
      const middleEnd = Math.min(totalPages - 2, end);
      const middlePages = getPageRange(middleStart, middleEnd);
      pages.push(...middlePages);
    }

    // Decide between showing page before last or ellipsis before last page
    if (end < totalPages - 1) {
      pages.push('...');
    } else if (end === totalPages - 1) {
      pages.push(totalPages - 1);
    }

    // Always include last page if there is more than one
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  /**
   * Computed list of page indicators to render.
   * Contains numbers and `'...'` strings for truncated ranges.
   *
   * @type {(number | string)[]}
   */
  const pages: (number | string)[] = generatePageNumbers();

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
    >
      <div className="flex flex-row items-center space-x-1">
        {/* Previous button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrevious}
          disabled={currentPage <= 1}
          className="h-9 w-9 p-0"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Go to previous page</span>
        </Button>

        {/* Page number buttons / ellipses */}
        {pages.map((page, index) => (
          <Fragment
            key={
              typeof page === 'number'
                ? `page-${page}`
                : `ellipsis-${index}`
            }
          >
            {page === '...' ? (
              <div
                className="flex h-9 w-9 items-center justify-center"
                aria-hidden="true"
              >
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More pages</span>
              </div>
            ) : (
              <Button
                variant={currentPage === page ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePageClick(page as number)}
                className="h-9 w-9 p-0"
                aria-current={
                  currentPage === page ? 'page' : undefined
                }
                aria-label={`Go to page ${page}`}
              >
                {page}
              </Button>
            )}
          </Fragment>
        ))}

        {/* Next button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleNext}
          disabled={currentPage >= totalPages}
          className="h-9 w-9 p-0"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Go to next page</span>
        </Button>
      </div>
    </nav>
  );
}
