import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';

import { Textarea } from '../textarea';

describe('Textarea', () => {
  it('renders a textarea with default props', () => {
    render(<Textarea data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
    expect(textarea).toHaveClass('min-h-[80px]');
    expect(textarea).toHaveClass('w-full');
    expect(textarea).toHaveClass('rounded-md');
    expect(textarea).toHaveClass('border');
    expect(textarea).toHaveClass('bg-background');
    expect(textarea).toHaveClass('px-3');
    expect(textarea).toHaveClass('py-2');
    expect(textarea).toHaveClass('text-sm');
    expect(textarea).toHaveClass('ring-offset-background');
    expect(textarea).toHaveClass('placeholder:text-muted-foreground');
    expect(textarea).toHaveClass('focus-visible:outline-none');
    expect(textarea).toHaveClass('focus-visible:ring-2');
    expect(textarea).toHaveClass('focus-visible:ring-ring');
    expect(textarea).toHaveClass('focus-visible:ring-offset-2');
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');
    expect(textarea).toHaveClass('disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(
      <Textarea className="custom-class" data-testid="textarea" />,
    );

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveClass('custom-class');
  });

  it('forwards ref to the textarea element', () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<Textarea ref={ref} data-testid="textarea-ref" />);
    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
  });

  it('handles value and onChange', async () => {
    const handleChange = jest.fn();
    render(
      <Textarea
        value="test value"
        onChange={handleChange}
        data-testid="textarea"
      />,
    );

    const textarea = screen.getByTestId('textarea');
    expect(textarea.value).toBe('test value');

    await userEvent.type(textarea, ' new');
    expect(handleChange).toHaveBeenCalledTimes(4); // One call for each character
  });

  it('applies disabled state', () => {
    render(<Textarea disabled data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled:cursor-not-allowed');
    expect(textarea).toHaveClass('disabled:opacity-50');
  });

  it('applies placeholder', () => {
    render(
      <Textarea
        placeholder="Enter text here"
        data-testid="textarea"
      />,
    );

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute(
      'placeholder',
      'Enter text here',
    );
  });

  it('applies custom props', () => {
    render(
      <Textarea
        data-testid="textarea"
        rows={5}
        cols={40}
        aria-label="Description"
        data-custom="value"
      />,
    );

    const textarea = screen.getByTestId('textarea');
    expect(textarea).toHaveAttribute('rows', '5');
    expect(textarea).toHaveAttribute('cols', '40');
    expect(textarea).toHaveAttribute('aria-label', 'Description');
    expect(textarea).toHaveAttribute('data-custom', 'value');
  });

  it('handles focus and blur events', async () => {
    const handleFocus = jest.fn();
    const handleBlur = jest.fn();

    render(
      <Textarea
        onFocus={handleFocus}
        onBlur={handleBlur}
        data-testid="textarea"
      />,
    );

    const textarea = screen.getByTestId('textarea');

    await userEvent.click(textarea);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    await userEvent.tab();
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Textarea
        placeholder="Enter your message"
        className="custom-class"
        disabled
      />,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('applies custom styles on focus', async () => {
    render(<Textarea data-testid="textarea" />);

    const textarea = screen.getByTestId('textarea');

    // Focus the textarea
    await userEvent.click(textarea);

    // Check focus styles
    expect(textarea).toHaveClass('focus-visible:ring-2');
    expect(textarea).toHaveClass('focus-visible:ring-ring');
    expect(textarea).toHaveClass('focus-visible:ring-offset-2');
  });
});
