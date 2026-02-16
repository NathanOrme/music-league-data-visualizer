import { render, screen } from '@testing-library/react';

import { Alert, AlertDescription, AlertTitle } from '../alert';

describe('Alert', () => {
  it('renders with default variant', () => {
    render(<Alert>Default Alert</Alert>);
    const alert = screen.getByRole('alert');

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass('bg-background');
    expect(alert).toHaveClass('text-foreground');
    expect(alert).toHaveClass('border');
    expect(alert).toHaveClass('rounded-lg');
    expect(alert).toHaveClass('p-4');
  });

  it('renders with destructive variant', () => {
    render(<Alert variant="destructive">Destructive Alert</Alert>);
    const alert = screen.getByRole('alert');

    expect(alert).toHaveClass('border-destructive/50');
    expect(alert).toHaveClass('text-destructive');
    expect(alert).toHaveClass('dark:border-destructive');
  });

  it('applies custom className', () => {
    render(<Alert className="custom-class">Alert</Alert>);
    const alert = screen.getByRole('alert');

    expect(alert).toHaveClass('custom-class');
  });

  it('renders with title and description', () => {
    render(
      <Alert>
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>,
    );

    const title = screen.getByText('Alert Title');
    const description = screen.getByText('Alert Description');

    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H5');
    expect(title).toHaveClass('mb-1');
    expect(title).toHaveClass('font-medium');

    expect(description).toBeInTheDocument();
    expect(description).toHaveClass('text-sm');
  });

  it('renders with custom title and description classes', () => {
    render(
      <Alert>
        <AlertTitle className="custom-title">Title</AlertTitle>
        <AlertDescription className="custom-desc">
          Description
        </AlertDescription>
      </Alert>,
    );

    expect(screen.getByText('Title')).toHaveClass('custom-title');
    expect(screen.getByText('Description')).toHaveClass(
      'custom-desc',
    );
  });
});
