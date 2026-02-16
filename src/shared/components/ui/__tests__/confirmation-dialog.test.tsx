import { fireEvent, render, screen } from '@testing-library/react';

import { ConfirmationDialog } from '../confirmation-dialog';

describe('ConfirmationDialog', () => {
  const baseProps = {
    open: true,
    onOpenChange: jest.fn(),
    title: 'Delete item',
    description: 'Are you sure?',
    onConfirm: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the dialog content with title and description', () => {
    render(<ConfirmationDialog {...baseProps} />);

    expect(screen.getByText('Delete item')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cancel' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Confirm' }),
    ).toBeInTheDocument();
  });

  it('invokes onConfirm and closes on confirmation', () => {
    render(
      <ConfirmationDialog
        {...baseProps}
        confirmText="Delete"
        cancelText="Keep"
      />,
    );

    fireEvent.click(screen.getByRole('button', { name: 'Delete' }));

    expect(baseProps.onConfirm).toHaveBeenCalledTimes(1);
    expect(baseProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes when cancel is clicked', () => {
    render(<ConfirmationDialog {...baseProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(baseProps.onConfirm).not.toHaveBeenCalled();
    expect(baseProps.onOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders destructive variant icon and button style', () => {
    render(
      <ConfirmationDialog
        {...baseProps}
        variant="destructive"
        confirmText="Remove"
      />,
    );

    const confirmButton = screen.getByRole('button', {
      name: 'Remove',
    });

    expect(confirmButton).toHaveClass('bg-destructive');
    expect(
      document.querySelector('svg.text-destructive'),
    ).toBeInTheDocument();
  });
});
