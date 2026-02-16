/**
 * @jest-environment jsdom
 */

import { describe, it, jest } from '@jest/globals';
import { render, screen } from '@testing-library/react';

import { Label } from '../label';

// Mock the dependencies
jest.mock('@/shared/lib/utils', () => ({
  cn: (...classes: any[]) => classes.filter(Boolean).join(' '),
}));

jest.mock('@radix-ui/react-label', () => ({
  Root: ({ children, className, ref, ...props }: any) => (
    <label ref={ref} className={className} {...props}>
      {children}
    </label>
  ),
}));

jest.mock('class-variance-authority', () => ({
  cva: (baseClasses: string) => () => baseClasses,
}));

describe('Label', () => {
  it('renders without crashing', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders as a label element', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label.tagName).toBe('LABEL');
  });

  it('applies default styling classes', () => {
    render(<Label>Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    );
  });

  it('accepts and applies custom className', () => {
    render(<Label className="custom-class">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 custom-class',
    );
  });

  it('forwards htmlFor attribute correctly', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('forwards other HTML attributes', () => {
    render(
      <Label
        data-testid="custom-label"
        id="label-id"
        title="Label title"
      >
        Test Label
      </Label>,
    );

    const label = screen.getByTestId('custom-label');
    expect(label).toHaveAttribute('id', 'label-id');
    expect(label).toHaveAttribute('title', 'Label title');
  });

  it('supports ref forwarding', () => {
    const ref = { current: null };
    render(<Label ref={ref}>Test Label</Label>);

    expect(ref.current).not.toBeNull();
  });

  it('renders children correctly', () => {
    render(
      <Label>
        <span>Complex</span> Label Content
      </Label>,
    );

    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Label Content')).toBeInTheDocument();
  });

  it('works with form inputs', () => {
    render(
      <div>
        <Label htmlFor="email-input">Email Address</Label>
        <input id="email-input" type="email" />
      </div>,
    );

    const label = screen.getByText('Email Address');
    const input = screen.getByRole('textbox');

    expect(label).toHaveAttribute('for', 'email-input');
    expect(input).toHaveAttribute('id', 'email-input');
  });

  it('handles empty content', () => {
    render(<Label />);
    // Should render an empty label
    const label = document.querySelector('label');
    expect(label).toBeInTheDocument();
    expect(label?.textContent).toBe('');
  });

  it('applies accessibility attributes correctly', () => {
    render(
      <Label
        htmlFor="required-input"
        aria-required="true"
        role="label"
      >
        Required Field
      </Label>,
    );

    const label = screen.getByText('Required Field');
    expect(label).toHaveAttribute('for', 'required-input');
    expect(label).toHaveAttribute('aria-required', 'true');
    expect(label).toHaveAttribute('role', 'label');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Label onClick={handleClick}>Clickable Label</Label>);

    const label = screen.getByText('Clickable Label');
    label.click();

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('combines multiple class names correctly', () => {
    render(
      <Label className="text-red-500 font-bold custom-spacing">
        Styled Label
      </Label>,
    );

    const label = screen.getByText('Styled Label');
    expect(label).toHaveClass(
      'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-red-500 font-bold custom-spacing',
    );
  });

  it('has correct display name', () => {
    // The display name should be set from Radix UI Root component
    // In our mock, we don&apos;t set displayName, so it may be undefined
    expect(Label.displayName).toBe(undefined);
  });

  it('works with different content types', () => {
    render(
      <Label>
        Label with <strong>bold</strong> and <em>italic</em> text
      </Label>,
    );

    expect(screen.getByText('bold')).toBeInTheDocument();
    expect(screen.getByText('italic')).toBeInTheDocument();
    expect(screen.getByText(/Label with/)).toBeInTheDocument();
  });

  it('maintains semantic structure', () => {
    render(
      <form role="form">
        <Label htmlFor="username">Username</Label>
        <input id="username" name="username" type="text" />
      </form>,
    );

    const form = screen.getByRole('form');
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');

    expect(form).toContainElement(label);
    expect(form).toContainElement(input);
    expect(label).toHaveAttribute('for', 'username');
  });
});
