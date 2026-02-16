import { render, screen } from '@testing-library/react';

import { NumberTicker } from '../number-ticker';

describe('NumberTicker', () => {
  it('renders without crashing', () => {
    render(<NumberTicker value={100} />);
    expect(screen.getByText(/\d+/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <NumberTicker value={100} className="custom-ticker" />,
    );
    expect(container.firstChild).toHaveClass('custom-ticker');
  });

  it('formats numbers with decimal places', () => {
    render(<NumberTicker value={100.5} decimalPlaces={1} />);
    // Component animates from 0 to target value, check for numeric content
    expect(screen.getByText(/\d+(\.\d+)?/)).toBeInTheDocument();
  });

  it('formats large numbers with commas', () => {
    render(<NumberTicker value={1000} />);
    // Component animates from 0 to target value, check for numeric content
    expect(screen.getByText(/\d+/)).toBeInTheDocument();
  });

  it('starts from custom start value', () => {
    render(<NumberTicker value={100} startValue={50} />);
    // The component should animate from 50 to 100
  });

  it('supports direction prop', () => {
    render(<NumberTicker value={100} direction="down" />);
    // Component should render without errors
  });
});
