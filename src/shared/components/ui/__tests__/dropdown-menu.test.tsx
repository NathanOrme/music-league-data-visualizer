import { render, screen } from '@testing-library/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../dropdown-menu';

describe('DropdownMenu', () => {
  it('renders the dropdown menu with trigger and content', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    );

    // Check if trigger is rendered
    const trigger = screen.getByText('Open Menu');
    expect(trigger).toBeInTheDocument();

    // The menu content should not be visible initially
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
  });
});
