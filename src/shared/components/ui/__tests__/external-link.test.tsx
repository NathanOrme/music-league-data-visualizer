import { render, screen } from '@testing-library/react';
import React from 'react';

import { ExternalLink } from '../external-link';

describe('ExternalLink', () => {
  it('renders a link with default props', () => {
    render(
      <ExternalLink
        href="https://example.com"
        data-testid="external-link"
      >
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveTextContent('Test Link');

    // Check default classes
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('items-center');
    expect(link).toHaveClass('text-sm');
    expect(link).toHaveClass('font-medium');
    expect(link).toHaveClass('text-primary');
    expect(link).toHaveClass('underline-offset-4');
    expect(link).toHaveClass('hover:underline');

    // Should render the external link icon by default
    const icon = link.querySelector('svg');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass('ml-0.5');
    expect(icon).toHaveClass('h-4');
    expect(icon).toHaveClass('w-4');
  });

  it('applies custom className', () => {
    render(
      <ExternalLink
        href="#"
        className="custom-class"
        data-testid="external-link"
      >
        Test
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    expect(link).toHaveClass('custom-class');
  });

  it('hides the external icon when showIcon is false', () => {
    render(
      <ExternalLink
        href="#"
        showIcon={false}
        data-testid="external-link"
      >
        No Icon
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    const icon = link.querySelector('svg');
    expect(icon).not.toBeInTheDocument();
  });

  it('forwards ref to the anchor element', () => {
    const ref = React.createRef<HTMLAnchorElement>();
    render(
      <ExternalLink href="#" ref={ref}>
        Test
      </ExternalLink>,
    );

    expect(ref.current).toBeInstanceOf(HTMLAnchorElement);
  });

  it('applies additional HTML attributes', () => {
    render(
      <ExternalLink
        href="#"
        data-testid="external-link"
        aria-label="External"
        data-custom="value"
      >
        Test
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    expect(link).toHaveAttribute('aria-label', 'External');
    expect(link).toHaveAttribute('data-custom', 'value');
  });

  it('renders children correctly', () => {
    render(
      <ExternalLink href="#" data-testid="external-link">
        <span data-testid="child">Child Element</span>
      </ExternalLink>,
    );

    const child = screen.getByTestId('child');
    expect(child).toBeInTheDocument();
    expect(child).toHaveTextContent('Child Element');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <ExternalLink href="https://example.com">
        Example Link
      </ExternalLink>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('matches snapshot without icon', () => {
    const { container } = render(
      <ExternalLink href="https://example.com" showIcon={false}>
        Example Link
      </ExternalLink>,
    );

    expect(container.firstChild).toMatchSnapshot('without-icon');
  });

  it('has proper accessibility attributes', () => {
    render(
      <ExternalLink
        href="https://example.com"
        data-testid="external-link"
        aria-label="External Example"
      >
        Example
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    expect(link).toHaveAttribute('aria-label', 'External Example');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
