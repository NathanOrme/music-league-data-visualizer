import { cva, type VariantProps } from 'class-variance-authority';
import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  useEffect,
  useState,
} from 'react';

/**
 * fadeVariants function.
 *
 * @function
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the fade component.
 * @returns {JSX.Element}
 */
const fadeVariants = cva('transition-opacity duration-300', {
  variants: {
    in: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
  defaultVariants: {
    in: false,
  },
});

/**
 * FadeProps interface.
 *
 * @interface
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the fade component.
 * @returns {JSX.Element}
 */
export interface FadeProps
  extends
    HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof fadeVariants> {
  in: boolean;
  children: ReactNode;
  timeout?: {
    enter?: number;
    exit?: number;
  };
}

/**
 * Fade component.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the fade component.
 * @returns {JSX.Element}
 */
const Fade = forwardRef<HTMLDivElement, FadeProps>(
  (
    { className, in: inProp, children, timeout = {}, ...props },
    ref,
  ) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      if (inProp) {
        setMounted(true);
        const timer = setTimeout(() => setVisible(true), 0);
        return () => clearTimeout(timer);
      } else {
        setVisible(false);
        const timer = setTimeout(
          () => setMounted(false),
          timeout.exit || 300,
        );
        return () => clearTimeout(timer);
      }
    }, [inProp, timeout.exit]);

    if (!mounted) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={fadeVariants({ in: visible, className })}
        style={{
          transitionDuration: `${
            visible ? timeout.enter || 300 : timeout.exit || 300
          }ms`,
        }}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Fade.displayName = 'Fade';

/**
 * Fade export.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {HTMLAttributes<HTMLDivElement>} props.Root - The root element of the fade component.
 * @returns {JSX.Element}
 */
export { Fade };
