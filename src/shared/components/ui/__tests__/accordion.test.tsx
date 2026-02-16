import { fireEvent, render, screen } from '@testing-library/react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../accordion';

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ChevronDown: ({ className }: { className?: string }) => (
    <div data-testid="chevron-down-icon" className={className} />
  ),
}));

// Mock cn utility
jest.mock('@/shared/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('Accordion Components', () => {
  const renderAccordion = () => {
    return render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>
            This is the content for the first accordion item.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>
            This is the content for the second accordion item.
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
  };

  it('renders accordion with items', () => {
    renderAccordion();

    expect(screen.getByText('First Item')).toBeInTheDocument();
    expect(screen.getByText('Second Item')).toBeInTheDocument();
  });

  it('renders accordion triggers with chevron icons', () => {
    renderAccordion();

    const chevronIcons = screen.getAllByTestId('chevron-down-icon');
    expect(chevronIcons).toHaveLength(2);

    // Check that chevron icons have correct classes
    chevronIcons.forEach((icon) => {
      expect(icon).toHaveClass(
        'h-4',
        'w-4',
        'shrink-0',
        'transition-transform',
        'duration-200',
      );
    });
  });

  it('shows and hides accordion content when triggered', () => {
    renderAccordion();

    // Initially content should not be visible
    expect(
      screen.queryByText(
        'This is the content for the first accordion item.',
      ),
    ).not.toBeInTheDocument();

    // Click the trigger
    const firstTrigger = screen.getByText('First Item');
    fireEvent.click(firstTrigger);

    // Content should now be visible
    expect(
      screen.getByText(
        'This is the content for the first accordion item.',
      ),
    ).toBeInTheDocument();
  });

  it('only shows one item content at a time (single type)', () => {
    renderAccordion();

    // Open first item
    const firstTrigger = screen.getByText('First Item');
    fireEvent.click(firstTrigger);

    expect(
      screen.getByText(
        'This is the content for the first accordion item.',
      ),
    ).toBeInTheDocument();

    // Open second item
    const secondTrigger = screen.getByText('Second Item');
    fireEvent.click(secondTrigger);

    expect(
      screen.getByText(
        'This is the content for the second accordion item.',
      ),
    ).toBeInTheDocument();
    // First item should be closed
    expect(
      screen.queryByText(
        'This is the content for the first accordion item.',
      ),
    ).not.toBeInTheDocument();
  });

  it('applies correct CSS classes to AccordionTrigger', () => {
    renderAccordion();

    const trigger = screen.getByText('First Item');
    expect(trigger).toHaveClass(
      'flex',
      'flex-1',
      'items-center',
      'justify-between',
      'py-4',
      'font-medium',
      'transition-all',
      'hover:underline',
    );
  });

  it('applies custom className to AccordionTrigger', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="custom-trigger-class">
            Test Item
          </AccordionTrigger>
          <AccordionContent>Test Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText('Test Item');
    expect(trigger).toHaveClass('custom-trigger-class');
  });

  it('applies correct CSS classes to AccordionContent', () => {
    renderAccordion();

    // Open the accordion to make content visible
    const firstTrigger = screen.getByText('First Item');
    fireEvent.click(firstTrigger);

    const content = screen.getByText(
      'This is the content for the first accordion item.',
    );
    const contentContainer = content.closest('[data-state]');

    expect(contentContainer).toHaveClass(
      'overflow-hidden',
      'text-sm',
      'transition-all',
      'data-[state=closed]:animate-accordion-up',
      'data-[state=open]:animate-accordion-down',
    );
  });

  it('applies custom className to AccordionContent', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Test Item</AccordionTrigger>
          <AccordionContent className="custom-content-class">
            Test Content
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Open the accordion to make content visible
    const trigger = screen.getByText('Test Item');
    fireEvent.click(trigger);

    const contentWrapper = screen
      .getByText('Test Content')
      .closest('div');
    expect(contentWrapper).toHaveClass(
      'pb-4',
      'pt-0',
      'custom-content-class',
    );
  });

  it('supports multiple type accordion', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger>First Item</AccordionTrigger>
          <AccordionContent>First content</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Second Item</AccordionTrigger>
          <AccordionContent>Second content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    // Open both items
    fireEvent.click(screen.getByText('First Item'));
    fireEvent.click(screen.getByText('Second Item'));

    // Both should be open simultaneously
    expect(screen.getByText('First content')).toBeInTheDocument();
    expect(screen.getByText('Second content')).toBeInTheDocument();
  });

  it('maintains accessibility attributes', () => {
    renderAccordion();

    const trigger = screen.getByText('First Item');

    // Should have proper ARIA attributes
    expect(trigger).toHaveAttribute('data-state', 'closed');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');

    // Open the accordion
    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute('data-state', 'open');
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
  });

  it('handles disabled state', () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1" disabled>
          <AccordionTrigger>Disabled Item</AccordionTrigger>
          <AccordionContent>
            This should not be accessible
          </AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    const trigger = screen.getByText('Disabled Item');

    // Should be disabled
    expect(trigger).toHaveAttribute('data-disabled', '');

    // Clicking should not open the accordion
    fireEvent.click(trigger);
    expect(
      screen.queryByText('This should not be accessible'),
    ).not.toBeInTheDocument();
  });
});
