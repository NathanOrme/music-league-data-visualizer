import { render, screen } from '@testing-library/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs';

describe('Tabs', () => {
  it('renders tabs with content', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>,
    );

    // Check if tabs are rendered
    expect(screen.getByText('Tab 1')).toBeInTheDocument();
    expect(screen.getByText('Tab 2')).toBeInTheDocument();

    // Only the active tab content should be visible
    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('applies correct classes to TabsList', () => {
    render(
      <Tabs>
        <TabsList className="custom-class">
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const tabsList = screen.getByRole('tablist');
    expect(tabsList).toHaveClass('inline-flex');
    expect(tabsList).toHaveClass('h-10');
    expect(tabsList).toHaveClass('items-center');
    expect(tabsList).toHaveClass('justify-center');
    expect(tabsList).toHaveClass('rounded-md');
    expect(tabsList).toHaveClass('bg-muted');
    expect(tabsList).toHaveClass('p-1');
    expect(tabsList).toHaveClass('text-muted-foreground');
    expect(tabsList).toHaveClass('custom-class');
  });

  it('applies correct classes to TabsTrigger', () => {
    render(
      <Tabs>
        <TabsList>
          <TabsTrigger value="tab1" className="custom-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
      </Tabs>,
    );

    const trigger = screen.getByRole('tab');
    expect(trigger).toHaveClass('inline-flex');
    expect(trigger).toHaveClass('items-center');
    expect(trigger).toHaveClass('justify-center');
    expect(trigger).toHaveClass('whitespace-nowrap');
    expect(trigger).toHaveClass('rounded-sm');
    expect(trigger).toHaveClass('px-3');
    expect(trigger).toHaveClass('py-1.5');
    expect(trigger).toHaveClass('text-sm');
    expect(trigger).toHaveClass('font-medium');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('applies correct classes to TabsContent', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">
          Content
        </TabsContent>
      </Tabs>,
    );

    const content = screen.getByRole('tabpanel');
    expect(content).toHaveClass('mt-2');
    expect(content).toHaveClass('ring-offset-background');
    expect(content).toHaveClass('focus-visible:outline-none');
    expect(content).toHaveClass('focus-visible:ring-2');
    expect(content).toHaveClass('focus-visible:ring-ring');
    expect(content).toHaveClass('focus-visible:ring-offset-2');
    expect(content).toHaveClass('custom-content');
  });

  it('renders with custom class names', () => {
    render(
      <Tabs defaultValue="tab1" className="custom-tabs">
        <TabsList className="custom-tabs-list">
          <TabsTrigger value="tab1" className="custom-trigger">
            Tab 1
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tab1" className="custom-content">
          Content
        </TabsContent>
      </Tabs>,
    );

    const tabsRoot = document.querySelector('.custom-tabs');
    const tabsList = screen.getByRole('tablist');
    const trigger = screen.getByRole('tab');
    const content = screen.getByRole('tabpanel');

    expect(tabsRoot).toBeInTheDocument();
    expect(tabsList).toHaveClass('custom-tabs-list');
    expect(trigger).toHaveClass('custom-trigger');
    expect(content).toHaveClass('custom-content');
  });
});
