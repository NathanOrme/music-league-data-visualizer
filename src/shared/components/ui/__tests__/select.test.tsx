import { fireEvent, render, screen } from '@testing-library/react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';

// Mock the Portal component since it&apos;s not available in the test environment
// and we don&apos;t need to test Radix UI's portal implementation
jest.mock('@radix-ui/react-select', () => {
  const original = jest.requireActual('@radix-ui/react-select');
  return {
    ...original,
    Portal: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

describe('Select', () => {
  it('renders a basic select with trigger and options', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    // Check if the trigger is rendered
    const trigger = screen.getByRole('combobox');
    expect(trigger).toBeInTheDocument();
    expect(trigger).toHaveTextContent('Select an option');

    // Check if the select content is not in the document by default
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('shows options when trigger is clicked', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
        </SelectContent>
      </Select>,
    );

    // Click the trigger to open the select
    const trigger = screen.getByRole('combobox');
    fireEvent.click(trigger);

    // Check if options are now visible
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('applies correct classes to SelectTrigger', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">
          <SelectValue placeholder="Trigger" />
        </SelectTrigger>
      </Select>,
    );

    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveClass('flex');
    expect(trigger).toHaveClass('h-10');
    expect(trigger).toHaveClass('w-full');
    expect(trigger).toHaveClass('items-center');
    expect(trigger).toHaveClass('justify-between');
    expect(trigger).toHaveClass('rounded-md');
    expect(trigger).toHaveClass('border');
    expect(trigger).toHaveClass('border-input');
    expect(trigger).toHaveClass('bg-background');
    expect(trigger).toHaveClass('px-3');
    expect(trigger).toHaveClass('py-2');
    expect(trigger).toHaveClass('text-sm');
    expect(trigger).toHaveClass('ring-offset-background');
    expect(trigger).toHaveClass('placeholder:text-muted-foreground');
    expect(trigger).toHaveClass('focus:outline-none');
    expect(trigger).toHaveClass('focus:ring-2');
    expect(trigger).toHaveClass('focus:ring-ring');
    expect(trigger).toHaveClass('focus:ring-offset-2');
    expect(trigger).toHaveClass('disabled:cursor-not-allowed');
    expect(trigger).toHaveClass('disabled:opacity-50');
    expect(trigger).toHaveClass('[&>span]:line-clamp-1');
    expect(trigger).toHaveClass('custom-trigger');
  });

  it('applies correct classes to SelectItem', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Trigger" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem className="custom-item" value="option1">
            Option 1
          </SelectItem>
        </SelectContent>
      </Select>,
    );

    // Click the trigger to make the content visible
    fireEvent.click(screen.getByRole('combobox'));

    const item = screen.getByText('Option 1').closest('div');
    expect(item).toHaveClass('relative');
    expect(item).toHaveClass('flex');
    expect(item).toHaveClass('w-full');
    expect(item).toHaveClass('cursor-default');
    expect(item).toHaveClass('select-none');
    expect(item).toHaveClass('items-center');
    expect(item).toHaveClass('rounded-sm');
    expect(item).toHaveClass('py-1.5');
    expect(item).toHaveClass('pl-8');
    expect(item).toHaveClass('pr-2');
    expect(item).toHaveClass('text-sm');
    expect(item).toHaveClass('outline-none');
    expect(item).toHaveClass('focus:bg-accent');
    expect(item).toHaveClass('focus:text-accent-foreground');
    expect(item).toHaveClass('data-[disabled]:pointer-events-none');
    expect(item).toHaveClass('data-[disabled]:opacity-50');
    expect(item).toHaveClass('custom-item');
  });
  it('renders SelectGroup with items', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Trigger" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );

    // Click the trigger to make the content visible
    fireEvent.click(screen.getByRole('combobox'));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });
});
