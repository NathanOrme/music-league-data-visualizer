import { fireEvent, render, screen } from '@testing-library/react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../collapsible';

// Mock Radix UI Collapsible
jest.mock('@radix-ui/react-collapsible', () => ({
  Root: ({ children, collapsible, ...props }: any) => (
    <div
      data-testid="radix-collapsible-root"
      {...(collapsible ? { 'data-collapsible': 'true' } : {})}
      {...props}
    >
      {children}
    </div>
  ),
  CollapsibleTrigger: ({ children, collapsible, ...props }: any) => (
    <button
      data-testid="radix-collapsible-trigger"
      type="button"
      {...(collapsible ? { 'data-collapsible': 'true' } : {})}
      {...props}
    >
      {children}
    </button>
  ),
  CollapsibleContent: ({ children, collapsible, ...props }: any) => (
    <div
      data-testid="radix-collapsible-content"
      {...(collapsible ? { 'data-collapsible': 'true' } : {})}
      {...props}
    >
      {children}
    </div>
  ),
}));

describe('Collapsible Components', () => {
  describe('Collapsible', () => {
    it('renders without crashing', () => {
      render(<Collapsible>Test content</Collapsible>);
      expect(
        screen.getByTestId('radix-collapsible-root'),
      ).toBeInTheDocument();
    });

    it('passes props to Radix UI Root component', () => {
      const mockProps = {
        'data-testvalue': 'test',
        className: 'custom-class',
      };

      render(<Collapsible {...mockProps}>Test content</Collapsible>);

      const rootElement = screen.getByTestId(
        'radix-collapsible-root',
      );
      expect(rootElement).toHaveAttribute('data-testvalue', 'test');
      expect(rootElement).toHaveClass('custom-class');
    });

    it('renders children correctly', () => {
      render(
        <Collapsible>
          <div>Child content</div>
        </Collapsible>,
      );

      expect(screen.getByText('Child content')).toBeInTheDocument();
    });

    it('applies data-slot attribute correctly', () => {
      render(<Collapsible>Test</Collapsible>);

      const rootElement = screen.getByTestId(
        'radix-collapsible-root',
      );
      expect(rootElement).toHaveAttribute('data-slot', 'collapsible');
    });
  });

  describe('CollapsibleTrigger', () => {
    it('renders without crashing', () => {
      render(<CollapsibleTrigger>Toggle</CollapsibleTrigger>);
      expect(
        screen.getByTestId('radix-collapsible-trigger'),
      ).toBeInTheDocument();
    });

    it('passes props to Radix UI Trigger component', () => {
      const mockProps = {
        'data-testvalue': 'trigger-test',
        className: 'trigger-class',
      };

      render(
        <CollapsibleTrigger {...mockProps}>
          Toggle
        </CollapsibleTrigger>,
      );

      const triggerElement = screen.getByTestId(
        'radix-collapsible-trigger',
      );
      expect(triggerElement).toHaveAttribute(
        'data-testvalue',
        'trigger-test',
      );
      expect(triggerElement).toHaveClass('trigger-class');
    });

    it('renders children correctly', () => {
      render(
        <CollapsibleTrigger>
          <span>Toggle Button</span>
        </CollapsibleTrigger>,
      );

      expect(screen.getByText('Toggle Button')).toBeInTheDocument();
    });

    it('applies data-slot attribute correctly', () => {
      render(<CollapsibleTrigger>Toggle</CollapsibleTrigger>);

      const triggerElement = screen.getByTestId(
        'radix-collapsible-trigger',
      );
      expect(triggerElement).toHaveAttribute(
        'data-slot',
        'collapsible-trigger',
      );
    });

    it('handles click events', () => {
      const onClick = jest.fn();

      render(
        <CollapsibleTrigger onClick={onClick}>
          Toggle
        </CollapsibleTrigger>,
      );

      const triggerElement = screen.getByTestId(
        'radix-collapsible-trigger',
      );
      fireEvent.click(triggerElement);

      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('CollapsibleContent', () => {
    it('renders without crashing', () => {
      render(<CollapsibleContent>Content</CollapsibleContent>);
      expect(
        screen.getByTestId('radix-collapsible-content'),
      ).toBeInTheDocument();
    });

    it('passes props to Radix UI Content component', () => {
      const mockProps = {
        'data-testvalue': 'content-test',
        className: 'content-class',
      };

      render(
        <CollapsibleContent {...mockProps}>
          Content
        </CollapsibleContent>,
      );

      const contentElement = screen.getByTestId(
        'radix-collapsible-content',
      );
      expect(contentElement).toHaveAttribute(
        'data-testvalue',
        'content-test',
      );
      expect(contentElement).toHaveClass('content-class');
    });

    it('renders children correctly', () => {
      render(
        <CollapsibleContent>
          <p>This is collapsible content</p>
        </CollapsibleContent>,
      );

      expect(
        screen.getByText('This is collapsible content'),
      ).toBeInTheDocument();
    });

    it('applies data-slot attribute correctly', () => {
      render(<CollapsibleContent>Content</CollapsibleContent>);

      const contentElement = screen.getByTestId(
        'radix-collapsible-content',
      );
      expect(contentElement).toHaveAttribute(
        'data-slot',
        'collapsible-content',
      );
    });
  });

  describe('Integration Tests', () => {
    it('works together as a complete collapsible system', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger>Show/Hide Content</CollapsibleTrigger>
          <CollapsibleContent>
            <p>This content can be toggled</p>
          </CollapsibleContent>
        </Collapsible>,
      );

      expect(
        screen.getByTestId('radix-collapsible-root'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('radix-collapsible-trigger'),
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('radix-collapsible-content'),
      ).toBeInTheDocument();

      expect(
        screen.getByText('Show/Hide Content'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('This content can be toggled'),
      ).toBeInTheDocument();
    });

    it('maintains proper data-slot attributes in integrated setup', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger>Toggle</CollapsibleTrigger>
          <CollapsibleContent>Content</CollapsibleContent>
        </Collapsible>,
      );

      expect(
        screen.getByTestId('radix-collapsible-root'),
      ).toHaveAttribute('data-slot', 'collapsible');
      expect(
        screen.getByTestId('radix-collapsible-trigger'),
      ).toHaveAttribute('data-slot', 'collapsible-trigger');
      expect(
        screen.getByTestId('radix-collapsible-content'),
      ).toHaveAttribute('data-slot', 'collapsible-content');
    });

    it('handles complex nested content', () => {
      render(
        <Collapsible>
          <CollapsibleTrigger>
            <div className="flex items-center">
              <span>Complex Trigger</span>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="space-y-4">
              <h3>Nested Header</h3>
              <ul>
                <li>Item 1</li>
                <li>Item 2</li>
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>,
      );

      expect(screen.getByText('Complex Trigger')).toBeInTheDocument();
      expect(screen.getByText('Nested Header')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
      expect(screen.getByText('Item 2')).toBeInTheDocument();
    });
  });
});
