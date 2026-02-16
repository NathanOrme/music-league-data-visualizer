import { fireEvent, render, screen } from '@testing-library/react';

import { Switch } from '../switch';

describe('Switch', () => {
  it('renders Switch component', () => {
    render(<Switch data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toHaveRole('switch');
    expect(switchElement).toHaveAttribute('type', 'button');
  });

  it('applies default unchecked state', () => {
    render(<Switch data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'false');
    expect(switchElement).toHaveClass('bg-gray-600');
  });

  it('applies checked state when checked prop is true', () => {
    render(<Switch checked={true} data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveClass('bg-teal-600');
  });

  it('calls onCheckedChange when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Switch onCheckedChange={handleChange} data-testid="switch" />,
    );

    const switchElement = screen.getByTestId('switch');
    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it('calls onCheckedChange with opposite value when clicked', () => {
    const handleChange = jest.fn();
    render(
      <Switch
        checked={true}
        onCheckedChange={handleChange}
        data-testid="switch"
      />,
    );

    const switchElement = screen.getByTestId('switch');
    fireEvent.click(switchElement);

    expect(handleChange).toHaveBeenCalledWith(false);
  });

  it('does not call onCheckedChange when disabled', () => {
    const handleChange = jest.fn();
    render(
      <Switch
        disabled
        onCheckedChange={handleChange}
        data-testid="switch"
      />,
    );

    const switchElement = screen.getByTestId('switch');
    fireEvent.click(switchElement);

    expect(handleChange).not.toHaveBeenCalled();
  });

  it('applies disabled styles when disabled', () => {
    render(<Switch disabled data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('aria-disabled', 'true');
    expect(switchElement).toHaveClass(
      'cursor-not-allowed',
      'opacity-50',
    );
  });

  it('applies custom className', () => {
    render(<Switch className="custom-class" data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('custom-class');
  });

  it('applies id attribute', () => {
    render(<Switch id="test-switch" data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('id', 'test-switch');
  });

  it('forwards ref correctly', () => {
    const ref = {
      current: null,
    } as React.RefObject<HTMLButtonElement>;

    render(<Switch ref={ref} data-testid="switch" />);

    expect(ref.current).toBeTruthy();
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has correct accessibility attributes', () => {
    render(
      <Switch checked={true} disabled={false} data-testid="switch" />,
    );

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveAttribute('role', 'switch');
    expect(switchElement).toHaveAttribute('aria-checked', 'true');
    expect(switchElement).toHaveAttribute('aria-disabled', 'false');
  });

  it('has correct focus styles', () => {
    render(<Switch checked={false} data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass(
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-offset-2',
      'focus-visible:ring-gray-500',
    );
  });

  it('has correct focus styles when checked', () => {
    render(<Switch checked={true} data-testid="switch" />);

    const switchElement = screen.getByTestId('switch');
    expect(switchElement).toHaveClass('focus-visible:ring-teal-500');
  });
});
