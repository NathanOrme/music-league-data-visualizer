import { render, screen } from '@testing-library/react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';

describe('Table', () => {
  it('renders a basic table with all components', () => {
    render(
      <Table>
        <TableCaption>Test Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Header 1</TableHead>
            <TableHead>Header 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer 1</TableCell>
            <TableCell>Footer 2</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    // Check table structure
    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();

    // Check caption
    expect(screen.getByText('Test Table')).toBeInTheDocument();

    // Check headers
    expect(screen.getByText('Header 1')).toBeInTheDocument();
    expect(screen.getByText('Header 2')).toBeInTheDocument();

    // Check body cells
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 2')).toBeInTheDocument();

    // Check footer
    expect(screen.getByText('Footer 1')).toBeInTheDocument();
    expect(screen.getByText('Footer 2')).toBeInTheDocument();
  });

  it('applies correct classes to Table container', () => {
    render(
      <Table className="custom-table">
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const container = document.querySelector(
      '[data-slot="table-container"]',
    );
    const table = screen.getByRole('table');

    expect(container).toHaveClass('relative');
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('overflow-x-auto');
    expect(container).toHaveClass('rounded-lg');
    expect(container).toHaveClass('backdrop-blur-sm');
    expect(container).toHaveClass('bg-background/50');
    expect(container).toHaveClass('border');
    expect(container).toHaveClass('border-border/50');
    expect(container).toHaveClass('shadow-lg');

    expect(table).toHaveClass('custom-table');
    expect(table).toHaveClass('w-full');
    expect(table).toHaveClass('caption-bottom');
    expect(table).toHaveClass('text-sm');
    expect(table).toHaveClass('border-collapse');
    expect(table).toHaveClass('bg-background/30');
    expect(table).toHaveClass('rounded-lg');
    expect(table).toHaveClass('overflow-hidden');
  });

  it('applies correct classes to TableHeader', () => {
    render(
      <Table>
        <TableHeader className="custom-header">
          <TableRow>
            <TableHead>Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const thead = document.querySelector('thead');
    expect(thead).toHaveClass('custom-header');
    expect(thead).toHaveClass('[&_tr]:border-b');
    expect(thead).toHaveClass('[&_tr]:border-border/50');
    expect(thead).toHaveClass('bg-background/20');
    expect(thead).toHaveClass('backdrop-blur-sm');
  });

  it('applies correct classes to TableBody', () => {
    render(
      <Table>
        <TableBody className="custom-body">
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const tbody = document.querySelector('tbody');
    expect(tbody).toHaveClass('custom-body');
    expect(tbody).toHaveClass('[&_tr:last-child]:border-0');
    expect(tbody).toHaveClass('divide-y');
    expect(tbody).toHaveClass('divide-border/30');
  });

  it('applies correct classes to TableFooter', () => {
    render(
      <Table>
        <TableFooter className="custom-footer">
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
      </Table>,
    );

    const tfoot = document.querySelector('tfoot');
    expect(tfoot).toHaveClass('custom-footer');
    expect(tfoot).toHaveClass('bg-muted/30');
    expect(tfoot).toHaveClass('border-t');
    expect(tfoot).toHaveClass('border-border/50');
    expect(tfoot).toHaveClass('font-medium');
    expect(tfoot).toHaveClass('[&>tr]:last:border-b-0');
    expect(tfoot).toHaveClass('backdrop-blur-sm');
  });

  it('applies correct classes to TableRow', () => {
    render(
      <Table>
        <TableBody>
          <TableRow className="custom-row" data-state="selected">
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const tr = document.querySelector('tr');
    expect(tr).toHaveClass('custom-row');
    expect(tr).toHaveClass('hover:bg-accent/30');
    expect(tr).toHaveClass('data-[state=selected]:bg-accent/50');
    expect(tr).toHaveClass('border-b');
    expect(tr).toHaveClass('border-border/30');
    expect(tr).toHaveClass('transition-colors');
    expect(tr).toHaveClass('group');
  });

  it('applies correct classes to TableHead', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="custom-head">Header</TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const th = document.querySelector('th');
    expect(th).toHaveClass('custom-head');
    expect(th).toHaveClass('text-foreground');
    expect(th).toHaveClass('h-12');
    expect(th).toHaveClass('px-4');
    expect(th).toHaveClass('text-left');
    expect(th).toHaveClass('align-middle');
    expect(th).toHaveClass('font-semibold');
    expect(th).toHaveClass('whitespace-nowrap');
    expect(th).toHaveClass('[&:has([role=checkbox])]:pr-0');
    expect(th).toHaveClass('[&>[role=checkbox]]:translate-y-[2px]');
    expect(th).toHaveClass('bg-background/50');
    expect(th).toHaveClass('backdrop-blur-sm');
    expect(th).toHaveClass('border-b');
    expect(th).toHaveClass('border-border/50');
    expect(th).toHaveClass('group-hover:bg-accent/20');
    expect(th).toHaveClass('transition-colors');
  });

  it('applies correct classes to TableCell', () => {
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="custom-cell">Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const td = document.querySelector('td');
    expect(td).toHaveClass('custom-cell');
    expect(td).toHaveClass('p-4');
    expect(td).toHaveClass('align-middle');
    expect(td).toHaveClass('whitespace-nowrap');
    expect(td).toHaveClass('[&:has([role=checkbox])]:pr-0');
    expect(td).toHaveClass('[&>[role=checkbox]]:translate-y-[2px]');
    expect(td).toHaveClass('border-b');
    expect(td).toHaveClass('border-border/20');
    expect(td).toHaveClass('last:border-r-0');
    expect(td).toHaveClass('group-hover:bg-accent/10');
    expect(td).toHaveClass('transition-colors');
  });

  it('applies correct classes to TableCaption', () => {
    render(
      <Table>
        <TableCaption className="custom-caption">
          Caption
        </TableCaption>
        <TableBody>
          <TableRow>
            <TableCell>Test</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    const caption = screen.getByText('Caption');
    expect(caption).toHaveClass('custom-caption');
    expect(caption).toHaveClass('text-muted-foreground/80');
    expect(caption).toHaveClass('mt-4');
    expect(caption).toHaveClass('text-sm');
    expect(caption).toHaveClass('px-4');
    expect(caption).toHaveClass('py-2');
    expect(caption).toHaveClass('bg-background/20');
    expect(caption).toHaveClass('backdrop-blur-sm');
    expect(caption).toHaveClass('rounded-b-lg');
  });
});
