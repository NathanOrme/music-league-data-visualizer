import { fireEvent, render, screen } from '@testing-library/react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../dialog';

describe('Dialog', () => {
  it('renders the dialog with trigger and content', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
          <div>Dialog Content</div>
          <DialogFooter>
            <DialogClose>Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    // Check if trigger is rendered
    const trigger = screen.getByText('Open Dialog');
    expect(trigger).toBeInTheDocument();

    // The dialog content should not be visible initially
    expect(screen.queryByText('Test Dialog')).not.toBeInTheDocument();
  });

  it('shows dialog content when trigger is clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          Dialog Content
        </DialogContent>
      </Dialog>,
    );

    const trigger = screen.getByText('Open Dialog');
    fireEvent.click(trigger);

    // After clicking the trigger, the content should be in the document
    // Note: This test checks for the presence in the document, not visibility
    expect(screen.getByText('Dialog Content')).toBeInTheDocument();
  });

  it('applies correct classes to dialog content', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent className="custom-class">
          <DialogHeader>
            <DialogTitle>Content</DialogTitle>
          </DialogHeader>
          Content
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByText('Open'));
    const content = screen.getByRole('dialog');

    expect(content).toHaveClass('fixed');
    expect(content).toHaveClass('left-[50%]');
    expect(content).toHaveClass('top-[50%]');
    expect(content).toHaveClass('z-50');
    expect(content).toHaveClass('custom-class');
  });

  it('renders dialog header with title and description', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Title</DialogTitle>
            <DialogDescription>Test Description</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByText('Open'));

    const title = screen.getByText('Test Title');
    const description = screen.getByText('Test Description');

    expect(title).toHaveClass('text-lg');
    expect(title).toHaveClass('font-semibold');
    expect(description).toHaveClass('text-muted-foreground');
  });

  it('renders dialog footer with close button', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogFooter>
            <DialogClose>Cancel</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByText('Open'));

    const closeButton = screen.getByText('Cancel');
    expect(closeButton).toBeInTheDocument();
  });

  it('renders the close (X) button in the dialog', () => {
    render(
      <Dialog>
        <DialogTrigger>Open</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Content</DialogTitle>
          </DialogHeader>
          Content
        </DialogContent>
      </Dialog>,
    );

    fireEvent.click(screen.getByText('Open'));

    // The close button is rendered as an X icon with a screen reader label
    const closeButton = screen.getByRole('button', {
      name: /close/i,
    });
    expect(closeButton).toBeInTheDocument();
  });
});
