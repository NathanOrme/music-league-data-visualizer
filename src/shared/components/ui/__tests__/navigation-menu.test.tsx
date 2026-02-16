import { fireEvent, render, screen } from '@testing-library/react';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../navigation-menu';

describe('NavigationMenu', () => {
  it('renders a basic navigation menu', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
            >
              Item 1
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item 2</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div>Content 2</div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Check if the navigation items are rendered
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();

    // Content should be hidden by default
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Item</NavigationMenuTrigger>
            <NavigationMenuContent>Content</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    // Click the trigger to show content
    const trigger = screen.getByText('Item');
    fireEvent.click(trigger);

    // Content should be visible after click
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies correct classes to NavigationMenuList', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList className="custom-list">
          <NavigationMenuItem>
            <NavigationMenuLink>Item</NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const list = document.querySelector('ul');
    expect(list).toHaveClass('group');
    expect(list).toHaveClass('flex');
    expect(list).toHaveClass('flex-1');
    expect(list).toHaveClass('list-none');
    expect(list).toHaveClass('items-center');
    expect(list).toHaveClass('justify-center');
    expect(list).toHaveClass('space-x-1');
    expect(list).toHaveClass('custom-list');
  });

  it('applies correct classes to NavigationMenuTrigger', () => {
    render(
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="custom-trigger">
              Trigger
            </NavigationMenuTrigger>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>,
    );

    const trigger = screen.getByText('Trigger');
    expect(trigger).toHaveClass('group');
    expect(trigger).toHaveClass('inline-flex');
    expect(trigger).toHaveClass('h-10');
    expect(trigger).toHaveClass('w-max');
    expect(trigger).toHaveClass('items-center');
    expect(trigger).toHaveClass('justify-center');
    expect(trigger).toHaveClass('rounded-md');
    expect(trigger).toHaveClass('bg-background');
    expect(trigger).toHaveClass('px-4');
    expect(trigger).toHaveClass('py-2');
    expect(trigger).toHaveClass('text-sm');
    expect(trigger).toHaveClass('font-medium');
    expect(trigger).toHaveClass('transition-colors');
    expect(trigger).toHaveClass('hover:bg-accent');
    expect(trigger).toHaveClass('hover:text-accent-foreground');
    expect(trigger).toHaveClass('focus:bg-accent');
    expect(trigger).toHaveClass('focus:text-accent-foreground');
    expect(trigger).toHaveClass('focus:outline-none');
    expect(trigger).toHaveClass('disabled:pointer-events-none');
    expect(trigger).toHaveClass('disabled:opacity-50');
    expect(trigger).toHaveClass('data-[active]:bg-accent/50');
    expect(trigger).toHaveClass('data-[state=open]:bg-accent/50');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('applies navigationMenuTriggerStyle correctly', () => {
    const { container } = render(
      <a className={navigationMenuTriggerStyle()} href="#">
        Link with trigger style
      </a>,
    );

    const link = container.firstChild;
    expect(link).toHaveClass('group');
    expect(link).toHaveClass('inline-flex');
    expect(link).toHaveClass('h-10');
    expect(link).toHaveClass('w-max');
    expect(link).toHaveClass('items-center');
    expect(link).toHaveClass('justify-center');
    expect(link).toHaveClass('rounded-md');
    expect(link).toHaveClass('bg-background');
    expect(link).toHaveClass('px-4');
    expect(link).toHaveClass('py-2');
    expect(link).toHaveClass('text-sm');
    expect(link).toHaveClass('font-medium');
    expect(link).toHaveClass('transition-colors');
    expect(link).toHaveClass('hover:bg-accent');
    expect(link).toHaveClass('hover:text-accent-foreground');
    expect(link).toHaveClass('focus:bg-accent');
    expect(link).toHaveClass('focus:text-accent-foreground');
    expect(link).toHaveClass('focus:outline-none');
    expect(link).toHaveClass('disabled:pointer-events-none');
    expect(link).toHaveClass('disabled:opacity-50');
    expect(link).toHaveClass('data-[active]:bg-accent/50');
    expect(link).toHaveClass('data-[state=open]:bg-accent/50');
  });
});
