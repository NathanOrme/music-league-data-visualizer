import { fireEvent, render, screen } from '@testing-library/react';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '../sheet';

// Mock the dialog portal for testing
jest.mock('@radix-ui/react-dialog', () => {
  const originalModule = jest.requireActual('@radix-ui/react-dialog');
  return {
    ...originalModule,
    Portal: ({ children }: { children: React.ReactNode }) => children,
  };
});

describe('Sheet', () => {
  it('renders a trigger button', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
      </Sheet>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toBeInTheDocument();
  });

  it('shows content when trigger is clicked', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
          <p>Sheet Content</p>
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);

    expect(screen.getByText('Sheet Content')).toBeInTheDocument();
  });

  it('renders with correct side variant', () => {
    const { rerender } = render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="left" data-testid="sheet-content">
          <SheetTitle>Sheet Title</SheetTitle>
          Content
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);

    const content = screen.getByTestId('sheet-content');
    expect(content).toHaveClass('left-0');
    expect(content).toHaveClass(
      'data-[state=open]:slide-in-from-left',
    );

    // Test another side variant
    rerender(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent side="top" data-testid="sheet-content-top">
          <SheetTitle>Sheet Title</SheetTitle>
          Content
        </SheetContent>
      </Sheet>,
    );

    const topContent = screen.getByTestId('sheet-content-top');
    expect(topContent).toHaveClass('top-0');
    expect(topContent).toHaveClass(
      'data-[state=open]:slide-in-from-top',
    );
  });

  it('closes when close button is clicked', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent data-testid="sheet-content">
          <SheetTitle>Sheet Title</SheetTitle>
          <p>Sheet Content</p>
        </SheetContent>
      </Sheet>,
    );

    // Open the sheet
    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);

    // Click the close button
    const closeButton = screen.getByRole('button', { name: 'Close' });
    fireEvent.click(closeButton);

    // The sheet should be closed (content not in document)
    expect(
      screen.queryByText('Sheet Content'),
    ).not.toBeInTheDocument();
  });

  it('applies custom className to SheetContent', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent
          className="custom-class"
          data-testid="sheet-content"
        >
          <SheetTitle>Sheet Title</SheetTitle>
          Content
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);

    const content = screen.getByTestId('sheet-content');
    expect(content).toHaveClass('custom-class');
  });

  it('can be closed programmatically with SheetClose', () => {
    render(
      <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
          <SheetTitle>Sheet Title</SheetTitle>
          <p>Sheet Content</p>
          <SheetClose data-testid="close-button">Close</SheetClose>
        </SheetContent>
      </Sheet>,
    );

    // Open the sheet
    const trigger = screen.getByRole('button', { name: 'Open' });
    fireEvent.click(trigger);

    // Click the custom close button
    const closeButton = screen.getByTestId('close-button');
    fireEvent.click(closeButton);

    // The sheet should be closed
    expect(
      screen.queryByText('Sheet Content'),
    ).not.toBeInTheDocument();
  });

  it('forwards additional props to the underlying elements', () => {
    render(
      <Sheet>
        <SheetTrigger
          data-testid="trigger"
          data-custom="trigger-value"
        >
          Open
        </SheetTrigger>
        <SheetContent
          data-testid="content"
          data-custom="content-value"
        >
          <SheetTitle>Sheet Title</SheetTitle>
          Content
        </SheetContent>
      </Sheet>,
    );

    const trigger = screen.getByTestId('trigger');
    expect(trigger).toHaveAttribute('data-custom', 'trigger-value');

    fireEvent.click(trigger);

    const content = screen.getByTestId('content');
    expect(content).toHaveAttribute('data-custom', 'content-value');
  });
});
