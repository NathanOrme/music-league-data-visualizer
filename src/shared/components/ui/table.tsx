import { type ComponentProps, type JSX } from 'react';

import { cn } from '@/shared/lib/utils';
import { uiStyles } from '@/styles/ui.styles';

/**
 * Table component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'table'>} props.Root - The root element of the table component.
 * @returns {JSX.Element}
 */
function Table({
  className,
  ...props
}: ComponentProps<'table'>): JSX.Element {
  return (
    <div
      data-slot="table-container"
      className={uiStyles.table.container}
    >
      <table
        data-slot="table"
        className={cn(uiStyles.table.table, className)}
        {...props}
      />
    </div>
  );
}

/**
 * TableHeader component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'thead'>} props.Root - The root element of the table header component.
 * @returns {JSX.Element}
 */
function TableHeader({
  className,
  ...props
}: ComponentProps<'thead'>): JSX.Element {
  return (
    <thead
      data-slot="table-header"
      className={cn(uiStyles.table.header, className)}
      {...props}
    />
  );
}

/**
 * TableBody component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'tbody'>} props.Root - The root element of the table body component.
 * @returns {JSX.Element}
 */
function TableBody({
  className,
  ...props
}: ComponentProps<'tbody'>): JSX.Element {
  return (
    <tbody
      data-slot="table-body"
      className={cn(uiStyles.table.body, className)}
      {...props}
    />
  );
}

/**
 * TableFooter component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'tfoot'>} props.Root - The root element of the table footer component.
 * @returns {JSX.Element}
 */
function TableFooter({
  className,
  ...props
}: ComponentProps<'tfoot'>): JSX.Element {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(uiStyles.table.footer, className)}
      {...props}
    />
  );
}

/**
 * TableRow component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'tr'>} props.Root - The root element of the table row component.
 * @returns {JSX.Element}
 */
function TableRow({
  className,
  ...props
}: ComponentProps<'tr'>): JSX.Element {
  return (
    <tr
      data-slot="table-row"
      className={cn(uiStyles.table.row, 'group', className)}
      {...props}
    />
  );
}

/**
 * TableHead component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'th'>} props.Root - The root element of the table head component.
 * @returns {JSX.Element}
 */
function TableHead({
  className,
  ...props
}: ComponentProps<'th'>): JSX.Element {
  return (
    <th
      data-slot="table-head"
      className={cn(uiStyles.table.head, className)}
      {...props}
    />
  );
}

/**
 * TableCell component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'td'>} props.Root - The root element of the table cell component.
 * @returns {JSX.Element}
 */
function TableCell({
  className,
  ...props
}: ComponentProps<'td'>): JSX.Element {
  return (
    <td
      data-slot="table-cell"
      className={cn(uiStyles.table.cell, className)}
      {...props}
    />
  );
}

/**
 * TableCaption component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<'caption'>} props.Root - The root element of the table caption component.
 * @returns {JSX.Element}
 */
function TableCaption({
  className,
  ...props
}: ComponentProps<'caption'>): JSX.Element {
  return (
    <caption
      data-slot="table-caption"
      className={cn(uiStyles.table.caption, className)}
      {...props}
    />
  );
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
