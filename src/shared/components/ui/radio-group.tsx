import { cn } from '@/shared/lib/utils';
import {
  type ChangeEvent,
  createContext,
  forwardRef,
  type HTMLAttributes,
  type InputHTMLAttributes,
  useContext,
} from 'react';

/**
 * RadioGroupContextValue interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {string} props.value - The value of the radio group.
 * @param {string} props.name - The name of the radio group.
 * @param {function} props.onValueChange - Callback function to handle value changes.
 */
interface RadioGroupContextValue {
  value?: string;
  name?: string;
  onValueChange?: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

/**
 * RadioGroupProps interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {string} props.value - The value of the radio group.
 * @param {string} props.name - The name of the radio group.
 * @param {function} props.onValueChange - Callback function to handle value changes.
 */
interface RadioGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider
        value={{ value, onValueChange, name }}
      >
        <div
          ref={ref}
          className={cn('grid gap-2', className)}
          role="radiogroup"
          {...props}
        />
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

/**
 * RadioGroupItemProps interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {string} props.value - The value of the radio group item.
 */
interface RadioGroupItemProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  value: string;
}

const RadioGroupItem = forwardRef<
  HTMLInputElement,
  RadioGroupItemProps
>(({ className, value, ...props }, ref) => {
  const context = useContext(RadioGroupContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && context.onValueChange) {
      context.onValueChange(value);
    }
  };

  return (
    <input
      ref={ref}
      type="radio"
      name={context.name}
      value={value}
      checked={context.value === value}
      onChange={handleChange}
      className={cn(
        'aspect-square h-4 w-4 rounded-full border border-primary text-primary',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'cursor-pointer',
        className,
      )}
      {...props}
    />
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

/**
 * RadioGroup component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the radio group component.
 * @returns {JSX.Element}
 */
export { RadioGroup, RadioGroupItem };
