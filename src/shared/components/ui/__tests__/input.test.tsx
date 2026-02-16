import { render, screen } from '@testing-library/react';

import { Input } from '../input';

describe('Input', () => {
  it('renders correctly with default props', () => {
    render(<Input placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');

    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('h-10');
    expect(input).toHaveClass('w-full');
    expect(input).toHaveClass('rounded-md');
    expect(input).toHaveClass('border');
    expect(input).toHaveClass('bg-background');
    expect(input).toHaveClass('px-3');
    expect(input).toHaveClass('py-2');
    expect(input).toHaveClass('text-sm');
  });

  it('applies custom className', () => {
    render(
      <Input className="custom-class" placeholder="Test input" />,
    );
    const input = screen.getByPlaceholderText('Test input');

    expect(input).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Input ref={ref} placeholder="Test input" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('applies custom type', () => {
    render(<Input type="email" placeholder="Test input" />);
    const input = screen.getByPlaceholderText('Test input');

    expect(input).toHaveAttribute('type', 'email');
  });

  it('forwards additional props', () => {
    render(
      <Input
        placeholder="Test input"
        data-testid="test-input"
        aria-label="Test input"
      />,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toHaveAttribute('aria-label', 'Test input');
  });
});
