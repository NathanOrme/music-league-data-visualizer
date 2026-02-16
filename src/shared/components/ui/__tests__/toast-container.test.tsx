import { fireEvent, render, screen } from '@testing-library/react';

import type { Toast } from '@/shared/hooks/useToast';

import { ToastContainer } from '../toast-container';

describe('ToastContainer', () => {
  const toasts: Toast[] = [
    { id: 'toast-1', message: 'Saved!', type: 'success' },
    { id: 'toast-2', message: 'Failed!', type: 'error' },
  ];

  it('returns null when there are no toasts', () => {
    const { container } = render(
      <ToastContainer toasts={[]} onRemove={jest.fn()} />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('renders toasts with correct position classes', () => {
    render(
      <ToastContainer
        toasts={toasts}
        onRemove={jest.fn()}
        position="top-left"
      />,
    );

    const wrapper = screen.getByText('Saved!').closest('div')
      ?.parentElement?.parentElement;

    expect(wrapper).toHaveClass('top-4');
    expect(wrapper).toHaveClass('left-4');
  });

  it('applies toast styles and removes toast on click', () => {
    const onRemove = jest.fn();

    render(<ToastContainer toasts={toasts} onRemove={onRemove} />);

    const successToast = screen
      .getByText('Saved!')
      .closest('[role="alert"]');
    const errorToast = screen
      .getByText('Failed!')
      .closest('[role="alert"]');

    expect(successToast).toHaveClass('border-green-500/20');
    expect(errorToast).toHaveClass('border-red-500/20');

    fireEvent.click(
      screen.getAllByRole('button', {
        name: /close notification/i,
      })[0],
    );

    expect(onRemove).toHaveBeenCalledWith('toast-1');
  });
});
