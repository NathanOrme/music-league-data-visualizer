import { fireEvent, render, screen } from '@testing-library/react';

import { Pagination } from '../pagination';

describe('Pagination', () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    mockOnPageChange.mockClear();
  });

  it('renders pagination with correct number of pages', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should render 5 page buttons + previous/next buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(7); // 5 pages + prev + next

    // Check if page numbers are correct
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows ellipsis when there are many pages', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should show ellipsis for large page counts
    const ellipsis = document.querySelector('[aria-hidden="true"]');
    expect(ellipsis).toBeInTheDocument();

    // Should still show first and last pages
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('calls onPageChange with correct page number when a page is clicked', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    // Click on page 3
    const page3Button = screen.getByText('3');
    fireEvent.click(page3Button);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it('disables previous button on first page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByLabelText('Previous page');
    expect(prevButton).toBeDisabled();

    // Should not call onPageChange when clicking disabled button
    fireEvent.click(prevButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('disables next button on last page', () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();

    // Should not call onPageChange when clicking disabled button
    fireEvent.click(nextButton);
    expect(mockOnPageChange).not.toHaveBeenCalled();
  });

  it('highlights the current page', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const currentPageButton = screen.getByText('3');
    expect(currentPageButton).toHaveClass('bg-primary');
    expect(currentPageButton).toHaveClass('text-primary-foreground');
    expect(currentPageButton).toHaveAttribute('aria-current', 'page');
  });

  it('applies custom className to the container', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={mockOnPageChange}
        className="custom-class"
      />,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-class');
  });

  it('renders correctly with only one page', () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={1}
        onPageChange={mockOnPageChange}
      />,
    );

    // Should only render one page button + disabled prev/next buttons
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(3); // 1 page + prev + next

    const prevButton = screen.getByLabelText('Previous page');
    const nextButton = screen.getByLabelText('Next page');

    expect(prevButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('navigates to previous page when previous button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const prevButton = screen.getByLabelText('Previous page');
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  it('navigates to next page when next button is clicked', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  it('has proper accessibility attributes', () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />,
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'pagination');

    const currentPage = screen.getByText('3');
    expect(currentPage).toHaveAttribute('aria-current', 'page');

    const pageButtons = screen.getAllByRole('button');
    pageButtons.forEach((button, _index) => {
      // Skip prev/next buttons which have different aria-labels
      if (
        !['Previous page', 'Next page'].includes(
          button.getAttribute('aria-label') || '',
        )
      ) {
        expect(button).toHaveAttribute(
          'aria-label',
          expect.stringContaining('Go to page'),
        );
      }
    });
  });
});
