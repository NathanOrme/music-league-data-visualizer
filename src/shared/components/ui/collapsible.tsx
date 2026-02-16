import {
  CollapsibleContent as RadixCollapsibleContent,
  CollapsibleTrigger as RadixCollapsibleTrigger,
  Root,
} from '@radix-ui/react-collapsible';
import { type ComponentProps } from 'react';

/**
 * Collapsible component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<typeof Root>} props.Root - The root element of the collapsible component.
 * @returns {JSX.Element}
 */
const Collapsible = ({ ...props }: ComponentProps<typeof Root>) => (
  <Root data-slot="collapsible" {...props} />
);

/**
 * CollapsibleTrigger component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<typeof RadixCollapsibleTrigger>} props.Trigger - The trigger element of the collapsible component.
 * @returns {JSX.Element}
 */
const CollapsibleTrigger = ({
  ...props
}: ComponentProps<typeof RadixCollapsibleTrigger>) => (
  <RadixCollapsibleTrigger
    data-slot="collapsible-trigger"
    {...props}
  />
);

/**
 * CollapsibleContent component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ComponentProps<typeof RadixCollapsibleContent>} props.Content - The content element of the collapsible component.
 * @returns {JSX.Element}
 */
const CollapsibleContent = ({
  ...props
}: ComponentProps<typeof RadixCollapsibleContent>) => (
  <RadixCollapsibleContent
    data-slot="collapsible-content"
    {...props}
  />
);

export { Collapsible, CollapsibleContent, CollapsibleTrigger };
