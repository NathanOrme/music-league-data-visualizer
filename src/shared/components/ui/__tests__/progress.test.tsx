import { render, screen } from '@testing-library/react';

import { Progress } from '../progress';

describe('Progress', () => {
  it('renders with default props', () => {
    render(<Progress value={50} />);

    const progress = screen.getByRole('progressbar');
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute('aria-valuenow', '50');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
  });

  it('applies custom className', () => {
    render(<Progress value={30} className="custom-class" />);

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveClass('custom-class');
  });

  it('applies custom max prop', () => {
    render(<Progress value={75} max={200} />);

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '75');
    expect(progress).toHaveAttribute('aria-valuemax', '200');
  });

  it('has proper accessibility attributes', () => {
    render(<Progress value={50} max={100} />);

    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('role', 'progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '50');
    expect(progress).toHaveAttribute('aria-valuemin', '0');
    expect(progress).toHaveAttribute('aria-valuemax', '100');
  });
});
